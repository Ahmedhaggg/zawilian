const { Grade, Course } = require("../models");
const FactoryRepository = require("./factory/index")

exports.findAll = FactoryRepository
    .findAll(Grade)


exports.create = FactoryRepository.create(Grade)

exports.findById = FactoryRepository
    .findById(Grade, null, [
        {
            model: Course,
            as: "currentCourse",
            attributes: ["name", "term"]
        }
    ]);

exports.updateById = FactoryRepository.updateById(Grade)