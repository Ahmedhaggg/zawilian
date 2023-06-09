const { ExamScore, Student, Section, CourseRevision, Unit } = require("../models");
const FactoryRepository = require("./factory/index");
const { catchErrorOnCreate } = require("./errorHandlers");
const { Op } = require("sequelize");

exports.create = FactoryRepository.create(ExamScore);

exports.findStudentsScoreByExamId = async (examId) => await ExamScore 
    .findAll({
        where: {
            examId
        },
        attributes: ["score"],
        include: [
            {
                model: Student,
                attributes: ["id", "name", "phoneNumber"]
            }
        ]
    })


exports.findStudentCourseExamsScore = async studentId => await ExamScore
    .findAll({
        where: { 
            studentId,
            [Op.or]: [
                { unitId: { [Op.not]: null } },
                { courseRevisionId: { [Op.not]: null } }
            ],
        },
        include: [
            {
                required: false,
                model: Unit,
                include: [
                    {
                        model: Section,
                        include: [
                            {
                                model: ExamScore,
                                attributes: ['score'],
                                where: { studentId }
                            }
                        ],
                        attributes: ['id', 'name', "arrangement", "type"],
                        order: [Section, 'arrangement', 'ASC']
                    }
                ],
                attributes: ['id', 'name', "arrangement"],
            },
            {
                required: false,
                model: CourseRevision,
                attributes: ['id', 'name', "arrangement"]
            }
        ],
        attributes: ["score"],
        order: [[Unit, 'arrangement', 'ASC'], [CourseRevision, 'arrangement', 'ASC']]
    })
