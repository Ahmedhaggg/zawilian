let examScoreRepository = require("../repositories/examScore.repository");
let status = require("../errors/status");

exports.store = async (req, res, next) => {
    let { unitId = null, courseRevisionId = null, sectionId = null, score } = req.body;
    let studentId = req.student.id;

    // insert unit to examScore for student if not inserted because findStudentCourseExamScore depends on it to get lesson examScore because student pass unit exam after sections
    if (sectionId && unitId) {
        let UnitExamScoreInsertedForStudent = await examScoreRepository.checkStudentUnitExamScore(unitId, studentId)
        if (!UnitExamScoreInsertedForStudent)
            await examScoreRepository.create({
                unitId, courseRevisionId, sectionId : null, score : null, studentId
            });
        await examScoreRepository.create({
            unitId: null, courseRevisionId, sectionId, score, studentId
        }); 
    } else if (unitId && !sectionId) {
        await examScoreRepository.updateStudentUnitScore({ studentId, unitId, score }); 
    } else {
        await examScoreRepository.create({
            unitId, courseRevisionId, sectionId, score, studentId
        }); 
    }
    
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
