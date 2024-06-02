const { User, Subject, Teacher, Student, PaymentLevels, PaymentMethods, PaymentHistory } = require('../models')
const createError = require('http-errors')

/* status Code for:
    - created -> 201
    - updated -> 200
    - deleted -> 204
    - NtFound -> 404
*/



// -------------------------Members Page------------------------------------
// matches GET /api/v1/admin/students
const getStudents = async (req, res, next) => {
    try {
        const students = await Student.find({}, { _id: 1, level: 1 })
            .lean()
            .populate({
                path: '_id',
                select: 'full_name national_id isActive'
            });

        // Remap the results to match your desired output structure
        const formattedStudents = students.map(student => ({
            student_id: student._id._id,
            full_name: student._id.full_name,
            national_id: student._id.national_id,
            isActive: student._id.isActive,
            level: student.level
        }));

        return res.send(formattedStudents);
    } catch (error) {
        return next(createError.BadRequest());
    }
}
// matches GET /api/v1/admin/teachers
const getTeachers = async (req, res, next) => {
    try {
        const teachers = await Teacher.find({}).populate([
            {
                path: '_id',  // Assuming _id is a reference to another collection
                select: 'full_name national_id isActive '  // Fields to include from the populated document
            },
            {
                path: 'subjects',
                select: 'subject_name subject_id'
            }
        ]).lean()
        // Remap the results to match your desired output structure
        const formattedTeachers = teachers.map(teacher => ({
            _id: teacher._id._id,
            national_id: teacher._id.national_id,
            full_name: teacher._id.full_name,
            subjects: teacher.subjects,
            isActive: teacher._id.isActive,
        }));
        return res.send(formattedTeachers)
    } catch (error) {
        return next(createError.BadRequest())
    }
}
// matches POST /api/v1/admin/activation
const activeAccount = async (req, res, next) => {
    try {
        const { user, value } = req.body
        await User.findByIdAndUpdate(user, {
            $set: {
                isActive: value
            }
        },
            { new: true }
        )
        return res.status(201).send({ status: 201, msg: "done!" })

    } catch (error) {
        return next(createError.BadRequest('User not found'))
    }
}
// matches DEL /api/v1/admin/user
const delUser = async (req, res, next) => {
    try {
        const { user } = req.body
        const delUser = await User.findByIdAndDelete(user)
        if (!delUser) {
            throw createError.NotFound('user not Found')
        }
        // Delete associated documents based on the user's role
        switch (delUser.role) {
            case 'student':
                await Student.findOneAndDelete({ _id: user });
                break;
            case 'teacher':
                await Teacher.findOneAndDelete({ _id: user });
                await Subject.updateMany({ teacher_id: user }, { $unset: { teacher_id: 1 } });
                break;
            // Add more cases if there are other roles
        }
        return res.send(delUser)
    } catch (error) {
        next(error);
    }
}


//---------------------subjects Page--------------------------------
// matches GET /api/v1/admin/subject
const getCourses = async (req, res, next) => {
    try {
        const subjects = await Subject.find({})
            .populate({
                path: 'teacher_id',
                select: '_id',
                // match: { teacher_id: { $exists: true } }, // Only populate if teacher_id exists
                populate: {
                    path: '_id',
                    select: 'full_name _id',
                    // options: { retainNullValues: true } // Return null if _id doesn't exist
                }
            })
            .select('subject_name level teacher_id');

        const formattedSubjects = subjects.map(subject => ({
            subject_id: subject._id,
            teacher_id: subject.teacher_id && subject.teacher_id._id ? subject.teacher_id._id._id : null,
            subject_name: subject.subject_name,
            level: subject.level,
            // Check if teacher_id and its nested _id exist before accessing full_name
            teacher_name: subject.teacher_id && subject.teacher_id._id ? subject.teacher_id._id.full_name : null,

        }))
        return res.send(formattedSubjects)
    } catch (error) {
        console.log(error);
        next(createError.BadRequest())
    }
}
// matches POST /api/v1/admin/subject
const addOrUpdateCourse = async (req, res, next) => {
    try {
        const { teacher_id, subject_name, level } = req.body

        const subject = await Subject.findOneAndUpdate(
            { subject_name: subject_name },
            [
                {
                    $set: {
                        subject_name: subject_name,
                        level: level,
                        // will add teacher if have value
                        ...(teacher_id && { teacher_id }),

                    }
                },
                {
                    $set: {
                        teacher_id: {
                            $cond: {
                                if: { $eq: [teacher_id, null] },
                                then: null,
                                else: '$teacher_id'
                            }
                        }
                    }
                },

            ],
            { new: true, upsert: true } // Options: return the modified document, and if not found, create a new one
        )

        // Adding Subject to teacher or remove it
        if (teacher_id) {
            await Teacher.findByIdAndUpdate(teacher_id, {
                $addToSet: {
                    subjects: subject.id
                }
            })
        } else if (teacher_id === null) {
            await Teacher.updateMany({ subjects: subject.id }, {
                $pull: {
                    subjects: subject.id
                }
            });
        }

        return res.send(subject)

    } catch (error) {
        console.log(error)
        return next(createError.BadRequest())
    }
}

// matches DELETE /api/v1/admin/subject
const delCourse = async (req, res, next) => {
    try {
        const subject_id = req.body.subject_id
        const deletedSubject = await Subject.findByIdAndDelete(subject_id)
        if (!deletedSubject) {
            return next(createError.BadRequest('subject not found'))
        }
        // Remove the subject ID from all teacher documents
        await Teacher.updateMany(
            { subjects: subject_id }, // Find teachers with the subject ID
            { $pull: { subjects: subject_id } } // Remove the subject ID from the array
        );
        return res.status(204).send(
            {
                status: 204,
                msg: "done"
            }
        )

    } catch (error) {
        console.log(error);
        return next(createError.BadRequest())
    }
}
// ------------------------------------------------------------



// -----------------Payments Page---------------------
// ------matches GET /api/v1/admin/pay/level
const getPayLevels = async (req, res, next) => {
    try {
        const levels = await PaymentLevels.find({}).lean()
        const formattedLevels = levels.map(level => ({
            id: level._id,
            level: level.level,
            amount: level.amount
        }))
        return res.send(formattedLevels)
    }
    catch (error) {
        next(createError.BadRequest('Internal Server Error'))
    }
}
// -----matches POST /api/v1/admin/pay/level
const addOrUpdatePayLevel = async (req, res, next) => {
    try {
        const { level, amount } = req.body
        const addedLevel = await PaymentLevels.findOneAndUpdate(
            { level },
            {
                $set: {
                    level: level,
                    amount: amount
                }
            },
            { new: true, upsert: true })

        res.send(addedLevel)

    }
    catch (error) {
        console.log(error);
        return next(createError.BadRequest('failed to add payment info'))
    }
}
// matches DEL /api/v1/admin/pay/level
const delPayLevel = async (req, res, next) => {
    const { level } = req.body
    const deletedPaymentLevel = await PaymentLevels.findOneAndDelete({ level: level })
    if (!deletedPaymentLevel) {
        return next(createError.NotFound('Level not exist!'))
    }
    return res.send(deletedPaymentLevel)
}
// ------matches GET /api/v1/admin/pay/method
const getPayMethod = async (req, res, next) => {
    try {
        const methods = await PaymentMethods.find({}).lean()
        const formattedMethods = methods.map(method => ({
            id: method._id,
            name: method.name,
            account: method.account
        }))
        return res.send(formattedMethods)
    }
    catch (error) {
        next(createError.BadRequest('Internal Server Error'))
    }
}
// ------matches POST /api/v1/admin/pay/method
const addOrUpdatePayMethod = async (req, res, next) => {
    try {
        const { name, account } = req.body
        const addedMethod = await PaymentMethods.findOneAndUpdate(
            { name },
            {
                $set: {
                    name: name,
                    account: account
                }
            },
            { new: true, upsert: true })

        res.send(addedMethod)

    }
    catch (error) {
        return next(createError.BadRequest('failed to add payment method info'))
    }
}
// ------matches DEL /api/v1/admin/pay/method
const delPayMethod = async (req, res, next) => {
    try {
        const { name } = req.body
        const deletedPayMethod = await PaymentMethods.findOneAndDelete({ name: name })
        if (!deletedPayMethod) {
            return next(createError.NotFound('Level not exist!'))
        }
        return res.send(deletedPayMethod)
    } catch (error) {
        console.log(error);
    }
}





module.exports = {
    // member Page
    getStudents,
    getTeachers,
    activeAccount,
    delUser,
    // courses page
    getCourses,
    addOrUpdateCourse,
    delCourse,

    // payment page
    getPayLevels,
    addOrUpdatePayLevel,
    delPayLevel,
    getPayMethod,
    addOrUpdatePayMethod,
    delPayMethod,


}