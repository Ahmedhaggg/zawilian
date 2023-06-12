const { Course, Unit, db, Section } = require("../models");
const FactoryRepository = require("./factory/index");
const { catchErrorOnCreate } = require("./errorHandlers");

exports.findById = async (id) => await Unit.findOne({
    where: { id },
    include: {
        model: Section,
        attributes: ["id", "name", "type", "arrangement"],
    },
    order: [[Section, "arrangement", "ASC"]]
})
exports.create = async ({ name, video, description, courseId  }) => {
    let course = await Course.findOne({
        where: {
            id: courseId
        },
        attributes: ["lastUnitArrangement"]
    });

    if (!course)
        throw new Error()

    let transaction = await db.transaction();
    
    try {
        let newCourseUnit = await Unit.create({
            name,
            video,
            description,
            courseId,
            arrangement: course.lastUnitArrangement + 1
        }, { transaction });

        let [[_, updatedCourse]] = await Course.increment(
            { lastUnitArrangement: 1 }, 
            { 
                where: { id: courseId },
                transaction 
            }
        );

        if (!updatedCourse)
            throw new Error();
        
        await transaction.commit();

        return newCourseUnit;
    } catch (err) {
        await transaction.rollback();
        catchErrorOnCreate(err)
    }
}

exports.updateById = FactoryRepository.updateById(Unit);

exports.deleteById = FactoryRepository.deleteById(Unit);

exports.findExamByUnitId = async (unitId) => await (
    await Unit.findOne({ 
        where: { id: unitId },
        attributes: ["exam"],
    })
).exam;

exports.createExam = async (unitId, examData) => {
    let updateUnit = await Unit.update({ exam: examData }, { where: { id: unitId } })
    return updateUnit[0] ? true : false
}