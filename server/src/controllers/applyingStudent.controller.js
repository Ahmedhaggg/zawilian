let studentRepository = require("../repositories/student.repository");
let messages = require("../helpers/messages");
let status = require("../errors/status");
const APIError = require("../errors/api.error");
// let jwt = require("../helpers/jwt");
// const roles = require("../helpers/roles");
 
exports.show = async (req,res, next) => {
    let { studentId } = req.params;

    let applyingStudent = await studentRepository
        .findApplyinStudentById(studentId);

    if (!applyingStudent)
        throw new APIError(
            status.NOT_FOUND,
            {message: messages.notFound}
        );

    res.status(status.OK).json({
        success: true,
        applyingStudent
    })
}

exports.count = async (req, res, next) => {
    let { gradeId } = req.query;
    let query = { accepted: false };
    
    if (gradeId)
        query.gradeId = gradeId;
    
    let numberOfApplyingStudents = await studentRepository
        .count(query);
    
    res.status(status.OK).json({
        success: true,
        numberOfApplyingStudents
    })
}

exports.index = async (req, res, next) => {
    let { limit, offset, gradeId } = req.query;
    let query = { accepted:  false };

    if (gradeId)
        query.gradeId = gradeId;

    let applyingStudents = await studentRepository.findAll(query, limit, offset);
    
    res.status(status.OK).json({
        success: true,
        applyingStudents
    })
}

exports.getAcceptedResult = async (req, res, next) => {
    let { email } = req.params;
    console.log(email)
    let student = await studentRepository.findLoginDataByEmail(email);
    
    if (!student)
        throw new APIError(status.UNAUTHENTICATED, {
            message: messages.login.faild.unaccepted
        });
    
    if (student.accepted === false)
        throw new APIError(status.UNAUTHENTICATED, {
            message: messages.login.faild.waiting
        });

    res.status(status.OK).json({
        success: true,
        message: messages.applyingStudents.success.acceptingResult,
        accept: true
    });
}

exports.accept = async (req, res, next) => {
    let studentId = req.params.studentId;
    let { startUnitArrangement, startSectionArrangement } = req.body;

    let student = await studentRepository.findApplyingStudentLoginData(studentId);

    if (student.accepted === true)
        throw new APIError(status.CLIENT_ERROR, {
            message: messages.applyingStudents.faild.alreadyAccepted
        });

    let acceptStudent = await studentRepository.acceptStudent(studentId, { 
        unitArrangement: startUnitArrangement,  
        sectionArrangement: startSectionArrangement, 
        courseId: student.grade.currentCourseId 
    });

    if (!acceptStudent) 
        throw new APIError(status.CLIENT_ERROR, {
            message: messages.serverError
        });

    res.status(status.OK).json({
        success: true,
        message: messages.applyingStudents.success.accept
    });
}

exports.destroy = async (req, res, next) => {
    let { studentId } = req.params;

    let deletedUnAcceptedStudent = await studentRepository.deleteOne({id: studentId, accepted: false });

    if (deletedUnAcceptedStudent === false)
        throw new APIError(status.CLIENT_ERROR, {
            message: messages.applyingStudents.faild.delete
        });

    res.status(status.OK).json({
        success: true,
        message: messages.applyingStudents.success.delete
    });
}