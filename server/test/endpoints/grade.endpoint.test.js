const request = require('supertest');
const app = require('../../src/index'); // Assuming your Express app is defined in 'app.js' or similar
const { db, Grade, Course } = require('../../src/models');
const testData  = require('../testData');
const { createJwtToken } = require('../../src/helpers/jwt');
const { cleanDatabase } = require('../testHelper');
describe('course endpoints', () => {
    let gradeId;
    let courseId;
    let teacherToken;
    beforeAll(async () => {
        await db.authenticate();
        let newCourse = await Course.create({ ...testData.courseData })
        courseId = newCourse.id;
        teacherToken = await createJwtToken({ role: "teacher" }, "1h")
    });
    
    afterAll(async () => {
        await cleanDatabase()
    });

    describe('POST /api/v2/grades/', () => {
        test('should create grade and return it', async () => {
            const { status, body } = await request(app)
                .post('/api/v2/grades')
                .send({
                    ...testData.gradeData,
                    currentCourseId: courseId
                })
                .set("authorization", teacherToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            gradeId = body.newGrade.id;
        });
    });

    describe('GET /api/v2/grades/', () => {
        test('should return array from grades main data', async () => {

            const { status, body } = await request(app)
                .get('/api/v2/grades')
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("grades");
        });
    });
    describe('GET /api/v2/grades/:gradeId', () => {
        test('should return course with units and revisions arranged and with main data ', async () => {
            const { status, body } = await request(app)
                .get('/api/v2/grades/' + gradeId)
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("grade");
            expect(body.grade).toHaveProperty("currentCourse");
        });
    });
    describe('Patch /api/v2/grades/:gradeId', () => {
        test('should return course with units and revisions arranged and with main data ', async () => {
            let newCourse = await Course.create({
                ...testData.courseData,
                term: "second"
            });

            const { status, body } = await request(app)
                .patch('/api/v2/grades/' + gradeId)
                .send({
                    ...testData.gradeData,
                    currentCourseId: newCourse.id
                })
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
        });
    });
});
