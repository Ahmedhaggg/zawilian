const request = require('supertest');
const app = require('../../src/index'); // Assuming your Express app is defined in 'app.js' or similar
const { db, Grade, Course, CourseRevision } = require('../../src/models');
const testData  = require('../testData');
const { createJwtToken } = require('../../src/helpers/jwt');
const { cleanDatabase } = require('../testHelper');
describe('course endpoints', () => {
    let courseId;
    let teacherToken;
    let studentToken;
    let revisionId;
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

    describe('POST /api/v2/courses/:courseId/revisions', () => {
        test('should create revision and return revision in body', async () => {
            const { status, body } = await request(app)
                .post(`/api/v2/courses/${courseId}/revisions`)
                .send(testData.courseRevisionsData)
                .set("authorization", teacherToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("newRevision");
            revisionId = body.newRevision.id
        });
    });
    describe('GET /api/v2/courses/:courseId/revisions/:revisionId', () => {
        test('should return course revision for teacher', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/courses/${courseId}/revisions/${revisionId}`)
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("revision");
        });
        test('should return course revision for student', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/courses/${courseId}/revisions/${revisionId}`)
                .set("authorization", studentToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("revision");
        });
    });
    describe('PATCH /api/v2/courses/:courseId/revisions/:revisionId', () => {
        test('should update course revision', async () => {
            const { status, body } = await request(app)
                .patch(`/api/v2/courses/${courseId}/revisions/${revisionId}`)
                .send({
                    name: testData.courseRevisionsData.name  + "revision",
                    description: testData.courseRevisionsData.description,
                    video: testData.courseRevisionsData.video
                })
                .set("authorization", teacherToken)
                
            expect(status).toBe(200);
            expect(body.success).toBe(true);
        });
    });

    describe('GET /api/v2/courses/:courseId/revisions/:revisionId/exam', () => {
        test('should return course revision exam', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/courses/${courseId}/revisions/${revisionId}/exam`)
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("exam");
        });
        test('should return course revision exam', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/courses/${courseId}/revisions/${revisionId}/exam`)
                .set("authorization", studentToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("exam");
        });
    });
    describe('DELETE /api/v2/courses/:courseId/revisions/:revisionId', () => {
        test('should delete course revision', async () => {
            const { status, body } = await request(app)
                .delete(`/api/v2/courses/${courseId}/revisions/${revisionId}`)
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
        });
    });
});
