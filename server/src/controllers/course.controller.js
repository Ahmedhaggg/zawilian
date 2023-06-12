let status = require("../errors/status");
const APIError = require("../errors/api.error");
const messages = require("../helpers/messages");
let courseRepository = require("../repositories/course.repository");

exports.index = async (req, res, next) => {
    let courses = await courseRepository.findAll();
    res.status(status.OK).json({
        success: true,
        courses
    })
}

exports.store = async (req, res, next) => {
    let { name, gradeId } = req.body;

    let newCourse = await courseRepository.create({ name, gradeId });

    res.status(status.OK).json({
        success: true,
        newCourse,
        message: messages.course.success.create
    });
}

exports.show = async (req, res, next) => {
    let courseId = req.student ? req.student.courseId : req.params.courseId;

    let course = await courseRepository.findById(courseId);
    
    if (!course)
        throw new APIError(
            status.NOT_FOUND,
            {
                message: messages.notFound
            }
        );

    res.status(status.OK).json({
        success: true,
        course
    });
}

exports.update = async (req, res, next) => {
    let { courseId } = req.params;
    let { name, gradeId } = req.body;

    let updateCourse = await courseRepository.updateById(courseId, { name , gradeId });

    if (updateCourse === false)
        throw new APIError(status.INTERNAL_SERVER_ERROR, {
            message: messages.course.faild.update
        });

    res.status(status.OK).json({
        success: true,
        message: messages.course.success.update
    });
}

