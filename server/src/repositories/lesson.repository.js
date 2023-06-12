const { Unit, db, Section } = require("../models");
const FactoryRepository = require("./factory/index");
const { catchErrorOnCreate } = require("./errorHandlers");

exports.findById = async (id) => Section
    .findOne({ 
        where: { id, type: "lesson" }, 
        attributes: {
            exclude: ["type", "exam"] 
        }
    })

exports.create = async ({ name, video, exam, description, unitId }) => {
    let unit = await Unit.findOne({
        where: {
            id: unitId
        },
        attributes: ["lastSectionArrangement"],
        raw: true
    });

    if (!unit)
        throw new Error()

    let transaction = await db.transaction();
    
    try {
        let newLesson = await Section.create({
            unitId,
            name, 
            video,
            description,
            exam,
            type: "lesson",
            arrangement: unit.lastSectionArrangement + 1
        }, { transaction });

        let [[_, updatedUnit]] = await Unit.increment(
            { lastSectionArrangement: 1 }, 
            { 
                where: { id: unitId },
                transaction 
            }
        );
        if (!updatedUnit)
            throw new Error();
        
        await transaction.commit();

        return { ...newLesson.dataValues };

    } catch (err) {
        await transaction.rollback();
        catchErrorOnCreate(err)
    }
}

exports.updateById = FactoryRepository.updateById(Section);

exports.deleteById = FactoryRepository.deleteById(Section)

exports.findExamByLessonId = async (lessonId) => await (
    await Section.findOne({ 
        where: { id: lessonId },
        attributes: ["exam"],
    })
).exam;