const { Grade, Course, db } = require("../../src/models");
const courseRepository = require("../../src/repositories/course.repository"); // Replace with the actual repository file
const { cleanDatabase } = require("../testHelper");
describe("course Repository Integration Tests", () => {
    let courseId;
    let gradeId;
    let firstCoursesData = {
        name: "Course 1",
        term: "first"
    }

    beforeAll(async () => {
        await db.authenticate();
        let newGrade = await Grade.create({ name: "first grade secondary" });
        gradeId = newGrade.id;
    });

    afterAll(async () => {
        await cleanDatabase()
    });

    describe("create", () => {
        it("should return object", async () => {
            jest.setTimeout(5000);
            const result = await courseRepository.create({...firstCoursesData, gradeId});

            expect(result).toHaveProperty("id");
            expect(result).toHaveProperty("name");
            expect(result).toHaveProperty("term");
            expect(result).toHaveProperty("gradeId");
            expect(result).toHaveProperty("lastUnitArrangement");
            expect(result).toHaveProperty("lastRevisionArrangement");
            expect(result.lastRevisionArrangement).toBe(0);
            expect(result).toHaveProperty("gradeId");

            courseId = result.id;
        });
    });


    describe("findAll", () => {
        it("should return array with length 1", async () => {
            jest.setTimeout(5000);
            const courses = await courseRepository.findAll();

            expect(courses.length).toBe(1);
            expect(courses[0]).toHaveProperty('grade');
        });
    });

    describe("findById", () => {
        it("should return object ", async () => {
            jest.setTimeout(5000);
            const result = await courseRepository.findById(courseId);

            expect(result).toHaveProperty("id");
            expect(result).toHaveProperty("name");
            expect(result).toHaveProperty("term");
            expect(result).toHaveProperty("gradeId");
        });
    });

    describe("updateById", () => {
        it("should return true", async () => {
            jest.setTimeout(5000);
            const result = await courseRepository.updateById(courseId, { term: "second"});

            expect(result).toBe(true);
        });
    });
});
