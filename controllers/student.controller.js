const { Student, Subject } = require('../models')
const createError = require('http-errors')




// matches /api/v1/student/courses
const getCourses = async (req, res, next) => {
    try {
        const { level } = req.body
        const courses = await Subject.find({ level: level })

        const formattedCourses = courses.map(subject => ({
            subject_id: subject._id,
            subject_name: subject.subject_name,
            level: subject.level,
            content: subject.content,
        }))
        res.send(formattedCourses)
    } catch (error) {
        next(createError.BadRequest('failed to fetch data.'))
    }


}

// matches /api/v1/student/courses
const getExams = async (req, res, next) => {
    // 
}
const getResults = async (req, res, next) => {
    // 
}


module.exports = {
    getCourses,
    getExams,
    getResults,

}