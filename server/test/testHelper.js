const { 
    Section, Unit, ExamScore, CourseRevision, Grade, Course, StudentCourse, Student, Exam 
} = require("../src/models")

exports.cleanDatabase = async () => {
    await Promise.all([
        ExamScore.destroy({ where: {} }),
        Section.destroy({ where: {} }),
        Unit.destroy({ where: {} }),
        CourseRevision.destroy({ where: {} }),
        Exam.destroy({ where: {} }),
        Course.destroy({ where: {} }),
        Grade.destroy({ where: {} }),
        StudentCourse.destroy({ where: {} }),
        Student.destroy({ where: {} }),
    ])
}