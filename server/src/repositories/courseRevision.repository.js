const { Course, CourseRevision, db } = require("../models");
const FactoryRepository = require("./factory/index");
const { catchErrorOnCreate } = require("./errorHandlers");

exports.findById = FactoryRepository.findById(CourseRevision, { exclude: "exam"});

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

        let newCourseRevision = await CourseRevision.create({
            courseId: courseId,
            name, 
            video,
            description,
            arrangement: course.lastRevisionArrangement + 1,
            exam
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

        return { ...newCourseRevision.dataValues };

    } catch (err) {
        await transaction.rollback();
        catchErrorOnCreate(err)
    }
}

exports.updateById = FactoryRepository.updateById(CourseRevision);

exports.deleteById = FactoryRepository.deleteById(CourseRevision)

exports.findExamByRevisionId = async (revisionId) => await (
    await CourseRevision.findOne({ 
        where: { id: revisionId },
        attributes: ["exam"],
    })
).exam;