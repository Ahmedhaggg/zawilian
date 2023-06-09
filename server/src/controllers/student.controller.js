let studentRepository = require('../repositories/student.repository');
const APIError = require("../errors/api.error");
let messages = require("../helpers/messages");
let status = require("../errors/status");

exports.count = async (req, res, next) => {
    let { gradeId } = req.query;
    
    let numberOfStudents = await studentRepository.count(gradeId ? { gradeId, accepted: true } : {});
    
    res.status(status.OK).json({
        success: true,
        numberOfStudents
    })
}

exports.index = async (req, res, next) => {
    let {
        limit,
        offset,
        gradeId
    } = req.query;

    let students = await studentRepository.findAll(gradeId ? { gradeId, accepted: true } : {}, offset, limit);

    res.status(status.OK).json({
        success: true,
        students
    });
}
exports.show = async (req, res, next) => {
    let studentId = req.student ? req.student.id : req.params.studentId;

    let student = await studentRepository.findStudentById(studentId);

    if (!student)
        throw new APIError(
            status.NOT_FOUND,
           {message: messages.notFound}
        );

    res.status(status.OK).json({
        success: true,
        student
    })
}
