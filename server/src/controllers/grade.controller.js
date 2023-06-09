let gradeRepository = require("../repositories/grade.repository");
const status = require("../errors/status")
const messages = require("../helpers/messages");
const APIError = require("../errors/api.error");
exports.index = async (req, res, next) => {
    let grades = await gradeRepository.findAll();

    res.status(status.OK).json({
        success: true,
        grades
    })
}

exports.store = async (req, res, next) => {
    let { name, currentCourseId } = req.body;

    let newGrade = await gradeRepository.create({ name, currentCourseId });

    res.status(status.OK).json({
        success: true,
        newGrade,
        message: messages.grade.success.create
    });
}

exports.show = async (req, res, next) => {
    let { gradeId } = req.params;

    let grade = await gradeRepository.findById(gradeId);
    console.log(grade)
    if (!grade)
        throw new APIError(
            status.NOT_FOUND,
            { message: messages.notFound }
        );

    res.status(status.OK).json({
        success: true,
        grade
    });
}

exports.update = async (req, res, next) => {
    let { gradeId } = req.params;
    let { name, currentCourseId } = req.body;

    let updateGrade = await gradeRepository.updateById(gradeId, { name, currentCourseId });

    if (updateGrade === false)
        throw new APIError(status.INTERNAL_SERVER_ERROR, {
            message: messages.grade.faild.update
        });

    res.status(status.OK).json({
        success: true,
        message: messages.grade.success.update
    });
}