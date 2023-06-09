const { Course, Grade, Unit, CourseRevision } = require("../models");
const FactoryRepository = require("./factory/index")
 
exports.findAll = FactoryRepository
    .findAll(Course, null, [
        {
            model: Grade,
            attributes: ["name"]
        }
    ])


exports.create = FactoryRepository.create(Course)

exports.findById = FactoryRepository
    .findById(Course, null, [
        {
            model: Grade,
            attributes: ["name"]
        },
        {
            model: Unit,
            order: [["arrangement", "ASC"]]
        },
        {
            model: CourseRevision,
            order: [["arrangement", "ASC"]]
        }
    ]);

exports.updateById = FactoryRepository.updateById(Course)