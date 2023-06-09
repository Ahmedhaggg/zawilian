const { Grade, Course, db } = require("../../src/models");
const gradeRepository = require("../../src/repositories/grade.repository"); // Replace with the actual repository file
const { cleanDatabase } = require("../testHelper");

describe("Course Repository Integration Tests", () => {
    let courseId;
    let gradeId;

    beforeAll(async () => {
        await db.authenticate();
        let newCourse = await Course.create({
            name: "Course 1",
            term: "first"
        });

        courseId = newCourse.id;
    });

    afterAll(async () => {
        await cleanDatabase()
    });

    describe("create", () => {
        it("should create object", async () => {
            const result = await gradeRepository.create({ name: "second high school", currentCourseId: courseId });

            expect(result).toHaveProperty("id");
            expect(result).toHaveProperty("name");
            expect(result).toHaveProperty("currentCourseId");

            gradeId = result.id;
        });
    });


    describe("findAll", () => {
        it("should return array", async () => {
            const result = await gradeRepository.findAll();

            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toHaveProperty('id');
            expect(result[0]).toHaveProperty('name');
            expect(result[0]).toHaveProperty('currentCourseId');
        });
    });

    describe("findById", () => {
        it("should return array contains name and current course data", async () => {
            const result = await gradeRepository.findById(gradeId);

            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('name');
            expect(result).toHaveProperty('currentCourse');
        });
    });

    describe("updateById", () => {
        it("should return true", async () => {
            let newCourse = await Course.create({ name: "course 2", term: "second"})
            console.log("newCourseId", newCourse.id)
            const result = await gradeRepository.updateById(gradeId, { currentCourseId: newCourse.id });

            expect(result).toBe(true);
        });
    });
});
