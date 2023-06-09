const { Course, Unit, db, Exam } = require("../../src/models");
const unitRepository = require("../../src/repositories/unit.repository"); // Replace with the actual repository file
const { cleanDatabase } = require("../testHelper");

describe("Course Repository Integration Tests", () => {
    let courseId;
    beforeAll(async () => {
        await db.authenticate();
        let newCourse = await Course.create({ name: "course1", term: "first"});
        courseId = newCourse.id;
    });

    afterAll(async () => {
        await cleanDatabase()
    });

    describe("create", () => {
        it("should create a new unit for a course", async () => {
            const result = await unitRepository.create({
                name: "unit 1",
                description: "description",
                courseId: courseId
            });

            expect(result).toHaveProperty("id");
            expect(result).toHaveProperty("name");
            expect(result).toHaveProperty("description");
            expect(result).toHaveProperty("courseId");
            let course = await Course.findOne({ where: { id: courseId }, attributes: ["lastUnitArrangement"] })
            expect(course.lastUnitArrangement).toBe(1);
            unitId = result.id;
        });
    });

    describe("findById", () => {
        it("should return object", async () => {
            let result = await unitRepository.findById(unitId)
            expect(result).toHaveProperty("id")
            expect(result).toHaveProperty("name")
            expect(result).toHaveProperty("description")
            expect(result).toHaveProperty("sections")
            expect(Array.isArray(result.sections)).toBe(true)
        });
    });

    describe("updateById", () => {
        it("should update unit and return true", async () => {
            let result = await unitRepository.updateById(unitId, {
                description: "description 2",
            });
            expect(result).toBe(true);
        });
    });

    describe("createExam", () => {
        it("should create exam for a unit", async () => {
            let newExam = await unitRepository.createExam(unitId, {
                points: 10,
                questions: [
                    {
                        question: "question 1",
                        correctAnswer: "answer 1",
                        answers: [
                            "answer 1",
                            "answer 2",
                            "answer 3",
                            "answer 4"
                        ]
                    }
                ]
            })

            expect(newExam).toHaveProperty("id")
            expect(newExam).toHaveProperty("points")
            expect(newExam).toHaveProperty("questions");
            
            let unit = await Unit.findOne({ where: { id: unitId }, attributes: ["examId"], raw: true })
            expect(unit).toHaveProperty("examId");
            expect(unit.examId).toBe(newExam.id);
            examId = newExam.id;
        });
    });

    describe("findExamByUnitId", () => {
        it("should find an exam by unit ID and return object", async () => {
            let  result = await unitRepository.findExamByUnitId(unitId);
            expect(result).toHaveProperty("id");
            expect(result).toHaveProperty("points");
            expect(result).toHaveProperty("questions");
        });
    });

    describe("deleteById", () => {
        it("should delete a unit by ID and return true", async () => {
            let result = await unitRepository.deleteById(unitId);
            expect(result).toBe(true);
            const exam = await Exam.findOne({ where: { id: examId }});
            expect(exam).toBe(null);
        });
    });
});
