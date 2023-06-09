const request = require('supertest');
const app = require('../../src/index'); // Assuming your Express app is defined in 'app.js' or similar
const { db, Grade, Course, CourseRevision, Unit, Section } = require('../../src/models');
const testData  = require('../testData');
const { createJwtToken } = require('../../src/helpers/jwt');
const { cleanDatabase } = require('../testHelper');
describe('course endpoints', () => {
    let teacherToken;
    let studentToken;
    let unitId;
    let lessonId;
    beforeAll(async () => {
        await db.authenticate();
        let newCourse = await Course.create({ ...testData.courseData });
        let newUnit = await Unit.create({ ...testData.unitData, courseId: newCourse.id, arrangement: 1 })
        unitId = newUnit.id;
        teacherToken = await createJwtToken({ role: "teacher" }, "1h")
        studentToken = await createJwtToken({ role: "student" }, "1h")
    });
    
    afterAll(async () => {
        await cleanDatabase();
    });

    describe('POST /api/v2/units/:unitId/lessons', () => {
        test('should create lesson and return newLesson in body', async () => {
            const { status, body } = await request(app)
                .post(`/api/v2/units/${unitId}/lessons`)
                .send(testData.lessonData)
                .set("authorization", teacherToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("newLesson");
            lessonId = body.newLesson.id
        });
    });
    describe('GET /api/v2/units/:unitId/lessons/:lessonId', () => {
        test('should return lesson for teacher', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/units/${unitId}/lessons/${lessonId}`)
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("lesson");
        });
        test('should return lesson for student', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/units/${unitId}/lessons/${lessonId}`)
                .set("authorization", studentToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("lesson");
        });
    });
    describe('PATCH /api/v2/units/:unitId/lessons/:lessonId', () => {
        test('should update lesson', async () => {
            const { status, body } = await request(app)
                .patch(`/api/v2/units/${unitId}/lessons/${lessonId}`)
                .send({
                    name: testData.lessonData.name  + " lesson",
                    description: testData.lessonData.description,
                    video: testData.lessonData.video
                })
                .set("authorization", teacherToken)
                console.log(body)
            expect(status).toBe(200);
            expect(body.success).toBe(true);
        });
    });

    describe('GET /api/v2/units/:unitId/lessons/:lessonId/exam', () => {
        test('should return lesson exam', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/units/${unitId}/lessons/${lessonId}/exam`)
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("exam");
        });
        test('should return lesson exam', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/units/${unitId}/lessons/${lessonId}/exam`)
                .set("authorization", studentToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("exam");
        });
    });
    describe('DELETE /api/v2/units/:unitId/lessons/:lessonId', () => {
        test('should delete lesson', async () => {
            const { status, body } = await request(app)
                .delete(`/api/v2/units/${unitId}/lessons/${lessonId}`)
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
        });
    });
});
