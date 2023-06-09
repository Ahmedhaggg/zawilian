let studentRepository = require("../repositories/student.repository");
let messages = require("../helpers/messages");
let status = require("../errors/status");

exports.show = async (req, res, next) => {
    let studentId = req.student.id;
    
    let courseProgress = await studentRepository.findCourseProgress(studentId);

    res.status(status.OK).json({
        success: true,
        courseProgress
    });
}

exports.update = async (req, res, next) => {
    let studentId = req.student.id;
    let { unitArrangement, sectionArrangement } = req.body;

    await studentRepository.updateCourseProgress(studentId, { unitArrangement, sectionArrangement });

    res.status(status.OK).json({
        success: true,
        message: messages.student.courseProgress.success.openNewLesson
    });
}
