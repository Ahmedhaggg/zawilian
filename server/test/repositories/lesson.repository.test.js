const { Exam, Unit, Section, db , Course} = require("../../src/models");
const lessonRepository = require("../../src/repositories/lesson.repository"); // Replace with the actual repository file
const { cleanDatabase } = require("../testHelper");

describe("lesson Repository Integration Tests", () => {
    let unitId;
    let lessonId;
    let examId;
    beforeAll(async () => {
        await db.authenticate();
        try {
            let newCourse = await Course.create({ name: "course 1" });
            let newUnit = await Unit.create({
                name: "unit 1",
                description: "description",
                arrangement: 1,
                courseId: newCourse.id
            });
            console.log("newUnit", newUnit)
            unitId = newUnit.id;
        } catch (err) {
            console.log(err)
        }
    });

    afterAll(async () => {
        await cleanDatabase()
    });

    describe("create", () => {
        it("should return object contains main attributes and exam", async () => {
            const result = await lessonRepository.create({
                name: "lesson 1",
                video: "http://youtube.com/watch/1",
                description: "description",
                unitId,
                exam: {
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
                }
            });

            expect(result).toHaveProperty("id");
            expect(result).toHaveProperty("name");
            expect(result).toHaveProperty("type");
            expect(result.type).toBe("lesson");
            expect(result).toHaveProperty("video");
            expect(result).toHaveProperty("arrangement");
            expect(result).toHaveProperty("description");
            expect(result).toHaveProperty("unitId");
            expect(result).toHaveProperty("examId");
            expect(result).toHaveProperty("exam");
            let unit = await Unit.findOne({ where: { id: unitId }, attributes: ["lastSectionArrangement"]})
            expect(unit.lastSectionArrangement).toBe(1)
            lessonId = result.id;
            examId = result.exam.id
        });
    });

    describe("findById", () => {
        it("should return object without exam", async () => {
        
            const result = await lessonRepository.findById(lessonId);
            console.log(result)
            expect(result).toHaveProperty("id");
            expect(result).toHaveProperty("name");
            expect(result).toHaveProperty("video");
            expect(result).toHaveProperty("description");
            expect(result).toHaveProperty("unitId");
            expect(result.examId).toBeUndefined();
        });
    });

    describe("updateById", () => {
        it("should return true", async () => {
            const result = await lessonRepository.updateById(lessonId, { name: "lesson one"} );

            expect(result).toBe(true);
        });
    });
    
    describe("findExamByLessonId", () => {
        it("should return object contains lesson id and exam", async () => {
            const result = await lessonRepository.findExamByLessonId(lessonId);

            expect(result).toHaveProperty("id");
            expect(result).toHaveProperty("points");
            expect(result).toHaveProperty("questions");
        });
    });

    describe("deleteById", () => {
        it("should return true", async () => {
            const result = await lessonRepository.deleteById(lessonId);

            expect(result).toBe(true);

            const exam = await Exam.findOne({ where: { id: examId }});
            expect(exam).toBe(null);
        });
    });
});
