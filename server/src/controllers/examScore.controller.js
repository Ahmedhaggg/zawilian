let examScoreRepository = require("../repositories/examScore.repository");
const APIError = require("../errors/api.error");
let messages = require("../helpers/messages");
let status = require("../errors/status");

exports.store = async (req, res, next) => {
    let { unitId = null, examId, courseRevisionId = null, sectionId = null, score } = req.body;
    let studentId = req.student.id;

    await examScoreRepository.create({
        unitId, examId, courseRevisionId, sectionId, score, studentId
    });

    res.status(status.OK).json({
        success: true
    })
}

exports.showStudentsScoresInExam = async (req, res, next) => {
    let { unitId = null, sectionId = null, courseRevisionId = null } = req.query;

    let studentsScore = await examScoreRepository.findStudentsScoresInExam({
        unitId, sectionId, courseRevisionId
    });
    
    res.status(status.OK).json({
        success: true,
        studentsScore
    })
}

exports.showStudentScore = async (req, res, next) => {
    let studentId = req.student ? req.student.id : req.params.studentId;
    
    let studentCourseExamScore = await examScoreRepository.findStudentCourseExamsScore(studentId);

    res.status(status.OK).json({
        success: true,
        studentCourseExamScore
    })
}

// exports.index = async (req, res, next) => {
//     if (req.teacher) 
//         return next(techerIndexScoreHandler);
//     else 
//         return next(studentIndexScoreHandler)
// }

// const techerIndexScoreHandler = async (req, res, next) => {
//     let { studentId, examId } = req.query;
//     let response = { };
//     if (studentId) 
//         resposne = { 
//             studentScore: await examScoreRepository.findStudentCourseScore(studentId)
//         };
//     else if (examId) 
//         response = { 
//             studentsExamScore: await examScoreRepository.findExamScore(examId) 
//         };
//     if (!Object.keys(response).length)
//         throw new APIError(status.NOT_FOUND, {
//             success: false,
//             message: messages.notFound
//         });

//     res.status(status.OK).json({
//         success: true,
//         ...response
//     });
// }

// const studentIndexScoreHandler = async (req, res, next) => {
//     let { unitId, revisionId, sectionId } = req.query;
//     let studentId = req.student.id; 
//     let response = { };

//     if (unitId)
//         resposne = { 
//             unitScore: await examScoreRepository.findStudentUnitExamScore({ studentId, unitId })
//         };
//     else if (revisionId)
//         resposne = { 
//             revisionScore: await examScoreRepository.findStudentRevisionExamScore({ studentId, revisionId })
//         };
//     else if (sectionId)
//         resposne = { 
//             sectionScore: await examScoreRepository.findStudentSectionExamScore({ studentId, sectionId })
//         };
//     else
//         response = {
//             courseScore: await examScoreRepository.findStudentCourseExamsScore(studentId)
//         }
// }



// exports.show = async (req, res, next) => {
//     let { exam } = req.params;
//     let studentId = req.student.id;

//     let examScore = await examScoreRepository.findById(examScoreId);

//     if (!examScore) {
//         throw new APIError(messages.NOT_FOUND, status.NOT_FOUND);
//     }

//     if (examScore.studentId!= studentId) {
//         throw new APIError(messages.UNAUTHORIZED, status.UNAUTHORIZED);
//     }

//     res.status(status.OK).json({
//         success: true,
//         examScore
//     })
// }