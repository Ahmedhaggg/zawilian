const request = require('supertest');
const app = require('../../src/index'); // Assuming your Express app is defined in 'app.js' or similar
const { db, Grade, Course, Unit, Section } = require('../../src/models');
const testData  = require('../testData');
const { createJwtToken } = require('../../src/helpers/jwt');
const { cleanDatabase } = require('../testHelper');
describe('course endpoints', () => {
    let teacherToken;
    let studentToken;
    let unitId;
    let unitRevisionId;
    beforeAll(async () => {
        await db.authenticate();
        let newCourse = await Course.create({ ...testData.courseData });
        let newUnit = await Unit.create({ ...testData.unitData, courseId: newCourse.id, arrangement: 1 })
        unitId = newUnit.id;
        teacherToken = await createJwtToken({ role: "teacher" }, "1h")
        studentToken = await createJwtToken({ role: "student" }, "1h")
    });
    
    afterAll(async () => {
        await cleanDatabase()
    });

    describe('POST /api/v2/units/:unitId/revisions', () => {
        test('should create unitRevision and return newRevision in body', async () => {
            const { status, body } = await request(app)
                .post(`/api/v2/units/${unitId}/revisions`)
                .send(testData.unitRevisionData)
                .set("authorization", teacherToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("newRevision");
            unitRevisionId = body.newRevision.id
        });
    });
    describe('GET /api/v2/units/:unitId/revisions/:unitRevisionId', () => {
        test('should return unitRevision for teacher', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/units/${unitId}/revisions/${unitRevisionId}`)
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("revision");
        });
        test('should return unitRevision for student', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/units/${unitId}/revisions/${unitRevisionId}`)
                .set("authorization", studentToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("revision");
        });
    });
    describe('PATCH /api/v2/units/:unitId/revisions/:unitRevisionId', () => {
        test('should update unitRevision', async () => {
            const { status, body } = await request(app)
                .patch(`/api/v2/units/${unitId}/revisions/${unitRevisionId}`)
                .send({
                    name: testData.unitRevisionData.name  + " unitRevision",
                    description: testData.unitRevisionData.description,
                    video: testData.unitRevisionData.video
                })
                .set("authorization", teacherToken)
                console.log(body)
            expect(status).toBe(200);
            expect(body.success).toBe(true);
        });
    });

    describe('GET /api/v2/units/:unitId/revisions/:unitRevisionId/exam', () => {
        test('should return unitRevision exam', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/units/${unitId}/revisions/${unitRevisionId}/exam`)
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("exam");
        });
        test('should return unitRevision exam', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/units/${unitId}/revisions/${unitRevisionId}/exam`)
                .set("authorization", studentToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("exam");
        });
    });
    describe('DELETE /api/v2/units/:unitId/revisions/:unitRevisionId', () => {
        test('should delete unitRevision', async () => {
            const { status, body } = await request(app)
                .delete(`/api/v2/units/${unitId}/revisions/${unitRevisionId}`)
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
        });
    });
});
