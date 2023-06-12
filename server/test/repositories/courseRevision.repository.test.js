const { Course, CourseRevision, db } = require("../../src/models");
const courseRevisionRepository = require("../../src/repositories/courseRevision.repository"); // Replace with the actual repository file
const { cleanDatabase } = require("../testHelper");

describe("course revision Repository Integration Tests", () => {
    let courseData = {
        name: "Course 1",
        term: "first"
    }
    let examId;
    let courseRevisionId;
    beforeAll(async () => {
        await db.authenticate();
        let newCourse = await Course.create(courseData);
        courseData.id = newCourse.id;
    });

    afterAll(async () => {
        await cleanDatabase()
    });

    describe("create", () => {
        it("should return object contins main attributes and exam", async () => {
            const result = await courseRevisionRepository.create({
                name: "revision 1",
                video: "http://youtube.com/watch/1",
                description: "description",
                courseId: courseData.id,
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
            console.log("create course revision result", result)
            expect(result).toHaveProperty("id");
            expect(result).toHaveProperty("name");
            expect(result).toHaveProperty("video");
            expect(result).toHaveProperty("description");
            expect(result).toHaveProperty("courseId");
            expect(result).toHaveProperty("exam");
            examId = result.exam.id
            let course = await Course.findOne({ where: { id: courseData.id }, attributes: ["lastRevisionArrangement"] })
            
            
            expect(course.lastRevisionArrangement).toBeGreaterThan(0);
            courseRevisionId = result.id;
        });
    });

    describe("findById", () => {
        it("should return object", async () => {
        
            const result = await courseRevisionRepository.findById(courseRevisionId);

            expect(result).toHaveProperty("id");
            expect(result).toHaveProperty("name");
            expect(result).toHaveProperty("video");
            expect(result).toHaveProperty("description");
            expect(result).toHaveProperty("arrangement");
            expect(result).toHaveProperty("courseId");
            expect(result.examId).toBeUndefined();
        });
    });

    describe("updateById", () => {
        it("should return true", async () => {
            const result = await courseRevisionRepository.updateById(courseRevisionId, { name: "revision one"});

            expect(result).toBe(true);
        });
    });
    
    describe("findExamByRevisionId", () => {
        it("should update course by id and return true", async () => {
            const result = await courseRevisionRepository.findExamByRevisionId(courseRevisionId);
            expect(result).toHaveProperty("questions");
        });
    });

    describe("deleteById", () => {
        it("should return true", async () => {
            const result = await courseRevisionRepository.deleteById(courseRevisionId);

            expect(result).toBe(true);
        });
    });
});
