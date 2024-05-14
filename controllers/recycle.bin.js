// in admin 
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