const { Unit, Exam, Section, db } = require("../models");
const FactoryRepository = require("./factory/index");
const { catchErrorOnCreate } = require("./errorHandlers");

exports.findById = async (id) => Section
    .findOne({ 
        where: { id, type: "revision" }, 
        attributes: {
            exclude: ["type", "examId"] 
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
        let newExam = await Exam.create(exam, { transaction });

        let newRevision = await Section.create({
            unitId,
            name, 
            video,
            description,
            examId: newExam.id,
            type: "revision",
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

        return { ...newRevision.dataValues, exam: newExam };

    } catch (err) {
        await transaction.rollback();
        catchErrorOnCreate(err)
    }
}

exports.updateById = FactoryRepository.updateById(Section);

exports.deleteById = async unitRevisionId => {
    let unitRevision = await Section
        .findOne({ where: { id: unitRevisionId, type: "revision" }, attributes: ["examId"], raw: true });
    
    if (!unitRevision)
        return false;
    
    let deleteUnitRevisionResult = await Section.destroy({
        where: { id: unitRevisionId }
    });
    
    if (!deleteUnitRevisionResult)
        return false;

    await Exam.destroy({ where: { id: unitRevision.examId }});
    
    return true
};

exports.findExamByRevisionId = async (revisionId) => await (
        await Section.findOne({ 
            where: { id: revisionId , type: "revision" },
            attributes: ["id"],
            include: [Exam]
        })
    ).exam;