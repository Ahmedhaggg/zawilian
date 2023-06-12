const { Unit, Section , Course, db } = require("../../src/models");
const unitRevisionRepository = require("../../src/repositories/unitRevision.repository"); // Replace with the actual repository file
const { cleanDatabase } = require("../testHelper");

describe("unitRevision Repository Integration Tests", () => {
    let unitId;
    let unitRevisionId;
    let examId;
    beforeAll(async () => {
        await db.authenticate();
        let newCourse = await Course.create({ name: "course1", term: "first"});
        let newUnit = await Unit.create({
            name: "unitRevision 1",
            video: "http://youtube.com/watch/1",
            description: "description",
            arrangement: 1,
            courseId: newCourse.id
        });
        unitId = newUnit.id;
    });

    afterAll(async () => {
        await cleanDatabase()
    });

    describe("create", () => {
        it("should return object contains main attributes and exam", async () => {
            const result = await unitRevisionRepository.create({
                name: "unitRevision 1",
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
            expect(result.type).toBe("revision");
            expect(result).toHaveProperty("video");
            expect(result).toHaveProperty("arrangement");
            expect(result).toHaveProperty("description");
            expect(result).toHaveProperty("unitId");
            expect(result).toHaveProperty("exam");
            let unit = await Unit.findOne({ where: { id: unitId }, attributes: ["lastSectionArrangement"]})
            expect(unit.lastSectionArrangement).toBeGreaterThan(0)
            unitRevisionId = result.id;
            examId = result.examId;
        });
    });

    describe("findById", () => {
        it("should return object without exam", async () => {
            const result = await unitRevisionRepository.findById(unitRevisionId);

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
            const result = await unitRevisionRepository.updateById(unitRevisionId, { name: "unitRevision one"}  );

            expect(result).toBe(true);
        });
    });
    
    describe("findExamByRevisionId", () => {
        it("should return object contains revision id and exam", async () => {
            const result = await unitRevisionRepository.findExamByRevisionId(unitRevisionId);
            expect(result).toHaveProperty("questions");
        });
    });

    describe("deleteById", () => {
        it("should return true", async () => {
            const result = await unitRevisionRepository.deleteById(unitRevisionId);

            expect(result).toBe(true);
        });
    });
});
