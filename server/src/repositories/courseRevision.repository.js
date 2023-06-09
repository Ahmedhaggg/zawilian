const { Course, CourseRevision, db, Exam } = require("../models");
const FactoryRepository = require("./factory/index");
const { catchErrorOnCreate } = require("./errorHandlers");

exports.findById = FactoryRepository.findById(CourseRevision, { exclude: "examId"});

exports.create = async ({ name, video, exam, description, courseId }) => {
    let course = await Course.findOne({
        where: {
            id: courseId
        },
        attributes: ["lastRevisionArrangement"],
        raw: true
    });

    if (!course)
        throw new Error()

    let transaction = await db.transaction();
    
    try {
        let newExam = await Exam.create(exam, { transaction });

        let newCourseRevision = await CourseRevision.create({
            courseId: courseId,
            name, 
            video,
            description,
            examId: newExam.id,
            arrangement: course.lastRevisionArrangement + 1
        }, { transaction });

        let [[_, updatedCourse]] = await Course.increment(
            { lastRevisionArrangement: 1 }, 
            { 
                where: { id: courseId },
                transaction 
            }
        );

        if (!updatedCourse)
            throw new Error();
        
        await transaction.commit();

        return { ...newCourseRevision.dataValues, exam: newExam };

    } catch (err) {
        await transaction.rollback();
        catchErrorOnCreate(err)
    }
}

exports.updateById = FactoryRepository.updateById(CourseRevision);

exports.deleteById = async revisionId => {
    let courseRevision = await CourseRevision
        .findOne({ where: { id: revisionId }, attributes: ["examId"], raw: true });
    
    if (!courseRevision)
        return false;
    
    let deleteRevisionResult = await CourseRevision.destroy({
        where: { id: revisionId },
    });
    
    if (!deleteRevisionResult)
        return false;

    await Exam.destroy({ where: { id: courseRevision.examId }});
    
    return true
};

exports.findExamByRevisionId = async (revisionId) => await (
    await CourseRevision.findOne({ 
        where: { id: revisionId },
        attributes: ["id"],
        include: [Exam]
    })
).exam;