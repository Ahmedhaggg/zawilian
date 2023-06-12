let unitRepository = require("../repositories/unit.repository");
const APIError = require("../errors/api.error");
let messages = require("../helpers/messages");
let status = require("../errors/status");

exports.show = async (req, res, next) => {
    let { unitId } = req.params;

    let unit = await unitRepository.findById(unitId);

    if (!unit)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            unit: null
        });

    res.status(status.OK).json({
        success: true,
        unit
    });
}


exports.index = async (req, res, next) => {
    let courseId = req.student ? req.student.courseId : req.params.courseId;

    let units = await unitRepository.findAllByCourseId(courseId);

    res.status(status.OK).json({
        success: true,
        courseId,
        units
    })
}

exports.store = async (req, res, next) => {
    let { courseId } = req.params;
    let { name, description  } = req.body;

    let newUnit = await unitRepository.create({ name , description, courseId});

    res.status(status.OK).json({
        success: true,
        newUnit,
        message: messages.unit.success.create
    });
}

exports.update = async (req, res, next) => {
    let { unitId } = req.params;
    let { name } = req.body;

    await unitRepository.updateById(unitId, { name });

    res.status(status.OK).json({
        success: true,
        message: messages.unit.success.update
    });
}

exports.destroy = async (req, res, next) => {
    let { unitId } = req.params;
    
    await unitRepository.deleteById(unitId);

    res.status(status.OK).json({
        success: true,
        message: messages.unit.success.destroy
    });
}


exports.showExam = async (req, res, next) => {
    let { unitId } = req.params;

    let unitExam = await unitRepository.findExamByUnitId(unitId);

    if (!unitExam)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            unitExam
        });

    res.status(status.OK).json({
        success: true,
        exam: unitExam
    })
}

exports.storeExam = async (req, res, next) => {
    let { unitId } = req.params;
    let { questions } = req.body;
    let unitExam = await unitRepository.findExamByUnitId(unitId);

    if (unitExam)
        throw new APIError(status.NOT_FOUND, {
            message: messages.unitExam.faild.create,
            unitExam
        });

    await unitRepository.createExam(unitId, { questions });

    res.status(status.OK).json({
        success: true,
        unitExam: { questions },
        message: messages.unit.success.createExam
    });
}