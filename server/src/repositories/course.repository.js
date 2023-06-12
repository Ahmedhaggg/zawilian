const { Course, Grade, Unit, CourseRevision } = require("../models");
const FactoryRepository = require("./factory/index")
 
exports.findAll = FactoryRepository
    .findAll(Course, null, [
        {
            model: Grade,
            attributes: ["id", "name"]
        }
    ])

exports.create = FactoryRepository.create(Course)

exports.findById = async (id) => await Course.findOne({ 
    where: { id },
    include: [
        {
            model: Grade,
            attributes: ["id", "name"]
        },
        {
            model: Unit,
            order: [["arrangement", "ASC"]],
            attributes: ["id", "name", "arrangement"]
        },
        {
            model: CourseRevision,
            order: [["arrangement", "ASC"]],
            attributes: ["id", "name", "arrangement"]
        }
    ],
    order: [[Unit, "arrangement", "ASC"], [CourseRevision, "arrangement", "ASC"]]
})
exports.updateById = FactoryRepository.updateById(Course)