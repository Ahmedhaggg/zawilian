const request = require('supertest');
const app = require('../../src/index'); // Assuming your Express app is defined in 'app.js' or similar
const { Student, db, StudentCourse, Grade, Course } = require('../../src/models');
const testData  = require('../testData');
const { createJwtToken } = require('../../src/helpers/jwt');
const { cleanDatabase } = require('../testHelper');
describe('course endpoints', () => {
    let gradeId;
    let courseId;
    let teacherToken;
    beforeAll(async () => {
        await db.authenticate();
        let newGrade = await Grade.create({ ...testData.gradeData })
        gradeId = newGrade.id;
        teacherToken = await createJwtToken({ role: "teacher" }, "1h")
    });
    
    afterAll(async () => {
        await cleanDatabase()
    });

    describe('POST /api/v2/courses/', () => {
        test('should create course and return it', async () => {
            const { status, body } = await request(app)
                .post('/api/v2/courses')
                .send({
                    ...testData.courseData,
                    gradeId
                })
                .set("authorization", teacherToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            courseId = body.newCourse.id;
        });
    });

    describe('GET /api/v2/courses/', () => {
        test('should return array from courses main data', async () => {

            const { status, body } = await request(app)
                .get('/api/v2/courses')
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("courses");
        });
    });
    describe('GET /api/v2/courses/:courseId', () => {
        test('should return course with units and revisions arranged and with main data ', async () => {
            const { status, body } = await request(app)
                .get('/api/v2/courses/' + courseId)
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("course");
            expect(body.course).toHaveProperty("units");
            expect(body.course).toHaveProperty("courseRevisions");
        });
    });
    describe('Patch /api/v2/courses/:courseId', () => {
        test('should return course with units and revisions arranged and with main data ', async () => {
            const { status, body } = await request(app)
                .patch('/api/v2/courses/' + courseId)
                .send({
                    name: testData.courseData.name  + 2
                })
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
        });
    });
});
