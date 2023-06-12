const { ExamScore, Student, Section, CourseRevision, Unit } = require("../models");
const FactoryRepository = require("./factory/index");
const { Op } = require("sequelize");
const { transformExamsScores } = require("./helpers/transformExamsScores");

exports.create = FactoryRepository.create(ExamScore);

exports.findStudentsScoresInExam = async (query) => await ExamScore 
    .findAll({
        where: query,
        attributes: ["score"],
        include: [
            {
                model: Student,
                attributes: ["id", "name", "phoneNumber"]
            }
        ]
    });

exports.findStudentCourseExamsScore = async studentId => {
    let examsScores = await ExamScore
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
                            attributes: ['id', 'name', "arrangement", "type"]
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
            order: [
                [Unit, 'arrangement', 'ASC'], 
                [CourseRevision, 'arrangement', 'ASC'],
            ]
        });
        
    return transformExamsScores(examsScores)
}
