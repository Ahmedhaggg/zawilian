const { db } = require("../config/database")
const Course = require("./course.model");
const Grade = require("./grade.model");
const ExamScore = require("./examScore.model")
const Exam = require("./exam.model")
const CourseRevision = require("./courseRevision.model")
const Unit = require("./unit.model")
const Section = require("./section.model")
const Student = require("./student.model")
const StudentCourse = require("./studentCourse.model")


/**
 * start relationship between models
*/

Grade.hasMany(Student, { foreignKey: "gradeId" })
Student.belongsTo(Grade);

Grade.hasMany(Course, { foreignKey: "gradeId" });
Course.belongsTo(Grade, { foreignKey: "gradeId" });

Course.hasOne(Grade, { foreignKey: "currentCourseId", as: "currentCourse" });
Grade.belongsTo(Course, { foreignKey: "currentCourseId", as: "currentCourse" });

Student.hasOne(StudentCourse, { foreignKey: "studentId", onUpdate: "cascade", onDelete: "cascade" });
StudentCourse.belongsTo(Student)

Course.hasMany(StudentCourse, { foreignKey: "courseId" })
StudentCourse.belongsTo(Course);

Course.hasMany(Unit, { foreignKey: "courseId", onUpdate: "cascade", onDelete: "cascade" });
Unit.belongsTo(Course);

Course.hasMany(CourseRevision, { foreignKey: "courseId", onUpdate: "cascade", onDelete: "cascade" });
CourseRevision.belongsTo(Course);

Unit.hasMany(Section, { foreignKey: "unitId", onUpdate: "cascade", onDelete: "cascade" })
Section.belongsTo(Unit);

Exam.hasOne(Unit, { foreignKey: "examId" });
Unit.belongsTo(Exam);

Exam.hasOne(CourseRevision, { foreignKey: "examId" });
CourseRevision.belongsTo(Exam);

Exam.hasOne(Section, { foreignKey: "examId" });
Section.belongsTo(Exam);


Student.hasMany(ExamScore, { foreignKey: "studentId" });
ExamScore.belongsTo(Student);


Unit.hasMany(ExamScore, { foreignKey: "unitId" });
ExamScore.belongsTo(Unit);

CourseRevision.hasMany(ExamScore, { foreignKey: "courseRevisionId" });
ExamScore.belongsTo(CourseRevision);

Section.hasMany(ExamScore, { foreignKey: "sectionId" });
ExamScore.belongsTo(Section, { foreignKey: "sectionId" });


/**
 * end relationship between models
*/

module.exports = {
    Course,
    Grade,
    ExamScore,
    Exam,
    CourseRevision,
    Unit,
    Section,
    Student,
    StudentCourse,
    db
}