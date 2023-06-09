const request = require('supertest');
const app = require('../../src/index'); // Assuming your Express app is defined in 'app.js' or similar
const { db, Grade, Unit, Course } = require('../../src/models');
const testData  = require('../testData');
const { createJwtToken } = require('../../src/helpers/jwt');
const { cleanDatabase } = require('../testHelper');
describe('course endpoints', () => {
    let courseId;
    let teacherToken;
    let studentToken;
    let unitId;

    beforeAll(async () => {
        await db.authenticate();
        let newGrade = await Grade.create({ ...testData.gradeData })
        let newCourse = await Course.create({ ...testData.courseData, gradeId: newGrade.id });
        courseId = newCourse.id;
        teacherToken = await createJwtToken({ role: "teacher" }, "1h")
        studentToken = await createJwtToken({ role: "student" }, "1h")
    });
    
    afterAll(async () => {
        await cleanDatabase();
    });

    describe('POST /api/v2/courses/:courseId/units', () => {
        test('should create unit and return unit in body', async () => {
            const { status, body } = await request(app)
                .post(`/api/v2/courses/${courseId}/units`)
                .send({
                    ...testData.unitData,
                    courseId
                })
                .set("authorization", teacherToken);
            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("newUnit");
            unitId = body.newUnit.id
        });
    });
    describe('GET /api/v2/courses/:courseId/units/:unitId', () => {
        test('should return course unit for teacher', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/courses/${courseId}/units/${unitId}`)
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("unit");
        });
        test('should return course unit for student', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/courses/${courseId}/units/${unitId}`)
                .set("authorization", studentToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("unit");
        });
    });
    describe('PATCH /api/v2/courses/:courseId/units/:unitId', () => {
        test('should update course unit', async () => {
            const { status, body } = await request(app)
                .patch(`/api/v2/courses/${courseId}/units/${unitId}`)
                .send({
                    ...testData.unitData,
                    name: testData.unitData.name  + "unit",
                })
                .set("authorization", teacherToken)
                
            expect(status).toBe(200);
            expect(body.success).toBe(true);
        });
    });
    describe('POST /api/v2/courses/:courseId/units/:unitId/exam', () => {
        test('should find course unit', async () => {
            const { status, body } = await request(app)
                .post(`/api/v2/courses/${courseId}/units/${unitId}/exam`)
                .send(testData.unitExamData)
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
        });
    });
    describe('GET /api/v2/courses/:courseId/units/:unitId/exam', () => {
        test('should find course unit', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/courses/${courseId}/units/${unitId}/exam`)
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("exam");
        });
        test('should update course unit', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/courses/${courseId}/units/${unitId}/exam`)
                .set("authorization", studentToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("exam");
        });
    });

    describe('DELETE /api/v2/courses/:courseId/units/:unitId', () => {
        test('should delete course unit', async () => {
            const { status, body } = await request(app)
                .delete(`/api/v2/courses/${courseId}/units/${unitId}`)
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
        });
    });
});
