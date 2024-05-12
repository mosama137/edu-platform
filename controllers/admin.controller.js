const { User, Subject, Teacher, Student, Payment, PaymentHistory } = require('../models')
const createError = require('http-errors')


// getting data


// matches GET /api/v1/admin/students
const getStudents = async (req, res, next) => {
    try {
        const students = await Student.find({}).populate({
            path: '_id',  // Assuming _id is a reference to another collection
            select: 'full_name national_id  isActive'  // Fields to include from the populated document
        })
            .select('level _id')  // Fields to include from the main document, excluding its own _id
            .lean();
        // Remap the results to match your desired output structure
        const formattedStudents = students.map(student => ({
            student_id: student._id._id,
            full_name: student._id.full_name,
            national_id: student._id.national_id,
            isActive: student._id.isActive,
            level: student.level
        }));
        res.send(formattedStudents)
    } catch (error) {
        next(createError.BadRequest())
    }
}
// matches GET /api/v1/admin/teachers
const getTeachers = async (req, res, next) => {
    try {
        const teachers = await Teacher.find({}).populate({
            path: '_id',  // Assuming _id is a reference to another collection
            select: 'full_name email isActive'  // Fields to include from the populated document
        })
            .select('_id')  // Fields to include from the main document, excluding its own _id
            .lean();
        // Remap the results to match your desired output structure
        const formattedTeachers = teachers.map(teacher => ({
            _id: teacher._id._id,
            full_name: teacher._id.full_name,
            email: teacher._id.email,
            isActive: teacher._id.isActive,
        }));
        res.send(formattedTeachers)
    } catch (error) {
        next(createError.BadRequest())
    }
}
// ------------------------------------------------------------

// -----------------accounts activation------------------------
// matches /api/v1/admin/account-activate
const activeAccount = async (req, res, next) => {
    try {
        const { user_id, active_value } = req.body
        const user = await User.findByIdAndUpdate(user_id, {
            $set: {
                isActive: active_value
            }
        },
            { new: true }
        )
        res.status(201).send({ msg: "done!" })

    } catch (error) {
        next(createError.BadRequest())
    }
}
// ------------------------------------------------------------


// -----------------Payments-----------------------------------
// matches GET /api/v1/admin/payment
const getPaymentInfo = async (req, res, next) => {
    const payment = await Payment.find({})
    res.send(payment)
}
// matches POST /api/v1/admin/payment
const addPaymentInfo = async (req, res, next) => {
    // here we check first if exist then edit else add it 
    try {
        const { level, amount, vodafoneCash, instaPay } = req.body
        const updatedPayment = await Payment.findOneAndUpdate(
            { level: level }, // Search condition
            {
                $set: { // Update object
                    level: level,
                    amount: amount,
                    vodafoneCash: vodafoneCash,
                    instaPay: instaPay
                }
            },
            { new: true, upsert: true }
            // If not found upsert creates a new one
        );

        return res.send(updatedPayment)
    } catch (error) {
        next(createError.BadRequest('failed to add payment info'))
    }
}
// matches DEL /api/v1/admin/payment
const delPayment = async (req, res, next) => {
    const { level } = req.body
    const deletedPayment = await Payment.findOneAndDelete({ level: level })
    if (!deletedPayment) {
        next(createError.NotFound('Level not exist!'))
    }
    res.send(deletedPayment)
}
// ------------------------------------------------------------




//---------------------subjects--------------------------------
// matches GET /api/v1/admin/subject
const getSubjects = async (req, res, next) => {
    try {
        const subjects = await Subject.find({}).populate({
            path: 'teacher_id',
            select: '_id',
            populate: {
                path: '_id',
                select: "full_name"
            } // Include only the 'name' field from the Teacher model
        }).select('subject_name level teacher_id')

        const formattedSubjects = subjects.map(subject => ({
            subject_id: subject._id,
            subject_name: subject.subject_name,
            level: subject.level,
            // Check if teacher_id and its nested _id exist before accessing full_name
            teacher_name: subject.teacher_id && subject.teacher_id._id ? subject.teacher_id._id.full_name : null,
            teacher_id: subject.teacher_id ? subject.teacher_id._id._id : null

        }))
        res.send(formattedSubjects)
    } catch (error) {
        next(createError.BadRequest())
    }
}
// matches POST /api/v1/admin/subject
const addSubject = async (req, res, next) => {
    try {
        const { teacher_id } = req.body //get teacher user_id
        const subject = await Subject.create(req.body)
        if (teacher_id) {
            await Teacher.findOneAndUpdate({ teacher_id }, {
                $addToSet: {
                    subjects: subject.id
                }
            })
        }

        res.send(subject)

    } catch (error) {
        console.log(error)
        next(createError.BadRequest())
    }
}
// matches POST /api/v1/admin/subject-teacher
const updateSubjectTeacher = async (req, res, next) => {
    try {
        const { teacher_id, subject_id } = req.body
        const teacher = await Teacher.findByIdAndUpdate(teacher_id, {
            //we use add to set to compare and didn't duplicate 
            $addToSet: {
                subjects: subject_id
            }
        }, { new: true })
        if (teacher) {
            await Subject.findByIdAndUpdate(subject_id, {
                $set: {
                    teacher_id: teacher_id
                }
            }
            )
        }
        return res.send(teacher)
    } catch (error) {
        console.log(error);
        next(createError.BadRequest())
    }
}
// matches DELETE /api/v1/admin/subject
const delSubject = async (req, res, next) => {
    try {
        const subject_id = req.body
        const deletedSubject = await Subject.findByIdAndDelete({ subject_id })
        if (!deletedSubject) {
            next(createError.BadRequest('subject not found'))
        }
        // Remove the subject ID from all teacher documents
        await Teacher.updateMany(
            { subjects: subject_id }, // Find teachers with the subject ID
            { $pull: { subjects: subject_id } } // Remove the subject ID from the array
        );

    } catch (error) {
        next(createError.BadRequest())
    }
}
// ------------------------------------------------------------

//----------------------deleting-------------------------------
// matches /api/v1/admin/del-user
const delUser = async (req, res, next) => {
    try {
        const { user_id } = req.body
        const delUser = await User.findByIdAndDelete(user_id)
        if (!delUser) {
            next(createError.NotFound('user not Found'))
        }
        if (delUser.role === 'student') {
            await Student.findOneAndDelete({ _id: user_id });
        } else if (delUser.role === 'teacher') {
            await Teacher.findOneAndDelete({ _id: user_id });
        }
        res.send(delUser)
    } catch (error) {
        next(createError.BadRequest())
    }
}
// ------------------------------------------------------------







module.exports = {
    getSubjects,
    getStudents,
    getTeachers,
    getPaymentInfo,

    addSubject,
    updateSubjectTeacher,
    activeAccount,
    addPaymentInfo,

    delUser,
    delSubject,
    delPayment,

}