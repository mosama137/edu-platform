const { User, Subject, Teacher, Student } = require('../models')
const createError = require('http-errors')


// getting data
const getStudents = async (req, res, next) => {
    try {
        const students = await Student.find({}).populate({
            path: '_id',  // Assuming _id is a reference to another collection
            select: 'full_name email  isActive'  // Fields to include from the populated document
        })
            .select('level _id')  // Fields to include from the main document, excluding its own _id
            .lean();
        // Remap the results to match your desired output structure
        const formattedStudents = students.map(student => ({
            _id: student._id._id,
            full_name: student._id.full_name,
            email: student._id.email,
            isActive: student._id.isActive,
            level: student.level
        }));
        res.send(formattedStudents)
    } catch (error) {
        next(createError.BadRequest())
    }
}
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
            _id: subject._id,
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

//  control accounts activation
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
        res.send(user)

    } catch (error) {
        next(createError.BadRequest())
    }
}


// Subjects control
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
// update subject's teacher
const updateSubjectTeacher = async (req, res, next) => {
    try {
        const { teacher_id, subject_id } = req.body
        const subject = await Subject.findByIdAndUpdate(subject_id, {
            $set: {
                teacher_id: teacher_id
            }
        },
            { new: true }
        )
        await Teacher.findByIdAndUpdate(teacher_id, {
            //we use add to set to compare and didn't duplicate 
            $addToSet: {
                subjects: subject_id
            }
        })
        return res.send(subject)
    } catch (error) {
        console.log(error);
        next(createError.BadRequest())
    }
}


// deleting
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







module.exports = {
    addSubject,
    updateSubjectTeacher,
    delSubject,
    activeAccount,
    getSubjects,
    getStudents,
    getTeachers,
    delUser,
}