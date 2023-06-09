let lessonRepository = require("../repositories/lesson.repository");
let messages = require("../helpers/messages");
let status = require("../errors/status");
const APIError = require("../errors/api.error");
 
exports.show = async (req, res, next) => {
    let { lessonId } = req.params;

    let lesson = await lessonRepository.findById(lessonId);

    if (!lesson)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            lesson
        });
        

    res.status(status.OK).json({
        success: true,
        lesson
    })
}


exports.store = async (req, res, next) => {
    let { unitId } = req.params;
    let { name, video, description, exam: { points, questions } } = req.body;


    let newLesson = await lessonRepository.create(
        {
            name,
            video,
            exam: {
                points,
                questions
            },
            description,
            unitId
        }, 
    );

    res.status(status.OK).json({
        success: true,
        message: messages.lesson.success.create,
        newLesson
    });
}

exports.update = async (req, res, next) => {
    let { lessonId } = req.params;
    let { name, video, description } = req.body;

    await lessonRepository.updateById(lessonId, {
        name,
        video,
        description
    });

    res.status(status.OK).json({
        success: true,
        message: messages.lesson.success.update
    });
}

exports.destroy = async (req, res, next) => {
    let { lessonId } = req.params;

    let deletedLesson = await lessonRepository.deleteById(lessonId);

    if (deletedLesson === false)
        throw new APIError(status.CLIENT_ERROR, {
            message: messages.lesson.faild.delete
        });

    res.status(status.OK).json({
        success: true,
        message: messages.lesson.success.delete
    });
}

exports.showExam = async (req, res, next) => {
    let { lessonId } = req.params;

    let lessonExam = await lessonRepository.findExamByLessonId(lessonId);

    if (!lessonExam)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            lessonExam
        });

    res.status(status.OK).json({
        success: true,
        exam: lessonExam
    })
}