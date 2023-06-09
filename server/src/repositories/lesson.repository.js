const { Unit, db, Exam, Section } = require("../models");
const FactoryRepository = require("./factory/index");
const { catchErrorOnCreate } = require("./errorHandlers");

exports.findById = async (id) => Section
    .findOne({ 
        where: { id, type: "lesson" }, 
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

        let newLesson = await Section.create({
            unitId,
            name, 
            video,
            description,
            examId: newExam.id,
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

        return { ...newLesson.dataValues, exam: newExam };

    } catch (err) {
        console.log("error before catchError on create", err);
        await transaction.rollback();
        catchErrorOnCreate(err)
    }
}

exports.updateById = FactoryRepository.updateById(Section);

exports.deleteById = async lessonId => {
    let lesson = await Section
        .findOne({ where: { id: lessonId, type: "lesson" }, attributes: ["examId"], raw: true });
    
    if (!lesson)
        return false;
    
    let deleteLessonResult = await Section.destroy({
        where: { id: lessonId },
    });
    
    if (!deleteLessonResult)
        return false;

    await Exam.destroy({ where: { id: lesson.examId }});
    
    return true
};



exports.findExamByLessonId = async (lessonId) => await (
    await Section.findOne({ 
        where: { id: lessonId, type: "lesson" },
        attributes: ["id"],
        include: [Exam]
    })
).exam;