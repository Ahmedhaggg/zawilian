const { Unit, Section, db } = require("../models");
const FactoryRepository = require("./factory/index");
const { catchErrorOnCreate } = require("./errorHandlers");

exports.findById = async (id) => Section
    .findOne({ 
        where: { id, type: "revision" }, 
        attributes: {
            exclude: ["type", "exam"] 
        }
    });
    
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

        let newRevision = await Section.create({
            unitId,
            name, 
            video,
            description,
            type: "revision",
            exam,
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

        return { ...newRevision.dataValues };

    } catch (err) {
        await transaction.rollback();
        catchErrorOnCreate(err)
    }
}

exports.updateById = FactoryRepository.updateById(Section);

exports.deleteById = FactoryRepository.deleteById(Section)

exports.findExamByRevisionId = async (revisionId) => await (
    await Section.findOne({ 
        where: { id: revisionId  },
        attributes: ["exam"],
    })
).exam;