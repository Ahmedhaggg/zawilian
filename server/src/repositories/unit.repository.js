const { Course, Unit, db, Exam, Section } = require("../models");
const FactoryRepository = require("./factory/index");
const { catchErrorOnCreate } = require("./errorHandlers");

exports.findById = FactoryRepository.findById(Unit, { exclude: "courseId" }, {
    model: Section,
    sort: [["arrangement", "ASC"]]
});

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

exports.deleteById = async unitId => {
    let unit = await Unit
        .findOne({ where: { id: unitId }, attributes: ["examId"], raw: true });
    
    if (!unit)
        return false;
    
    let deleteUnitResult = await Unit.destroy({
        where: { id: unitId },
    });
    
    if (!deleteUnitResult)
        return false;

    await Exam.destroy({ where: { id: unit.examId }});
    
    return true
};

exports.findExamByUnitId = async (unitId) => await (
    await Unit.findOne({ 
        where: { id: unitId },
        attributes: ["id"],
        include: [Exam]
    })
).exam;

exports.createExam = async (unitId, examData) => {
    let transaction = await db.transaction();

    try {
        let newExam = await Exam.create(examData, { transaction });
        let updatedUnit = await Unit.update(
            { examId: newExam.id }, 
            { 
                where: { id: unitId },
                transaction
            }
        );
        
        if (!updatedUnit[0])
            throw new Error()
        
        await transaction.commit();
        return newExam;
    } catch (err) {
        console.log("error happed in create exam", err)
        await transaction.rollback();
        catchErrorOnCreate(err)
    }
}