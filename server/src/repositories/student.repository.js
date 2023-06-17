const { Student, Grade, db, StudentCourse } = require("../models");
const FactoryRepository = require("./factory/index");

exports.count = FactoryRepository.count(Student);

exports.findStudentById = async (studentId) => await Student.findOne({
    where: { id: studentId, accepted: true },
    attributes: { exclude: ["id", "password", "accepted", "gradeId"] }, 
    include:[
        { model: Grade, attributes: ["name"]},
        { model: StudentCourse, attributes: ["courseId", "unitArrangement", "sectionArrangement"]}
    ]
});

exports.findApplyinStudentById = async (studentId) => await Student.findOne({
    where: { id: studentId, accepted: false },
    attributes: { exclude: ["id", "password", "accepted"] }, 
    include: { model: Grade },
});
exports.findAll = async (query, offset = 0, limit = 10) => await Student
    .findAll({
        where: query,
        offset,
        limit,
        attributes: { exclude: ["password", "accepted", "gradeId" ]},
        include: !query.gradeId ? [ { model: Grade, attributes: ["name"]} ] : []
    })


exports.findApplyingStudentLoginData = async (id) => await Student
    .findOne({
        where: {
            id: id,
            accepted: false
        },
        attributes: ["accepted"],
        include: [{
            model: Grade,
            attributes: ["currentCourseId"]
        }] 
    });

exports.findLoginDataByEmail = async (email) => {
    let student = await Student
    .findOne({
        where: {
            email
        },
        attributes: ["id", "accepted", "email", "password"],
        include: [
            { model: StudentCourse, attributes: ["courseId"]}
        ]
    });

    if (!student)
        return null;
    return { 
        id: student.id,
        accepted: student.accepted,
        email: student.email,
        password: student.password,
        courseId: student.studentCourse.courseId
    }
}


exports.acceptStudent = async (studentId, studentCourseData) => {
    let transaction = await db.transaction();
    try {
        await Student.update(
            { accepted: true, acceptedAt: new Date() }, 
            { 
                where: { id: studentId }, 
                transaction 
            }
        );

        await StudentCourse.create({
            studentId: studentId,
            ...studentCourseData
        }) 
        
        await transaction.commit();
        return true;
    } catch (err) {
        console.log(err)
        await transaction.rollback();
        return false;
    }
}


exports.deleteOne = async (query) => {
    let isDeleted = await Student.destroy({ where: query });

    return isDeleted ? true : false;
}

exports.create = FactoryRepository.create(Student);

exports.findCourseProgress = async (studentId) => await StudentCourse
    .findOne({
        where: {
            studentId: studentId
        },
        attributes: ["unitArrangement", "sectionArrangement"]
    });

exports.updateCourseProgress = async (studentId, newCourseProgressData) => {
    let updateCourseProgressResult = await StudentCourse.update(newCourseProgressData, { where: { studentId }})
    return updateCourseProgressResult[0] == 1 ? true : false;
}