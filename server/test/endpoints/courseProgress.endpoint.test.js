const request = require('supertest');
const app = require('../../src/index'); // Assuming your Express app is defined in 'app.js' or similar
const { Student, db, Grade, Course } = require('../../src/models');
const testData  = require('../testData');
const { createJwtToken } = require('../../src/helpers/jwt');
const { cleanDatabase } = require('../testHelper');
describe('course endpoints', () => {
    let teacherToken;
    let studentToken;
    let studentId;
    beforeAll(async () => {
        await db.authenticate();
        teacherToken = await createJwtToken({ role: "teacher" }, "1h")
        let newGrade = await Grade.create({ ...testData.gradeData })
        let newCourse = await Course.create({ ...testData.courseData, gradeId: newGrade.id });
        await Grade.update({ currentCourseId: newCourse.id }, { where: {id : newGrade.id} });
        let student = await Student.create({ ...testData.studentData, gradeId: newGrade.id });
        studentToken = await createJwtToken({ role: 'student', id: student.id }, "1h");
        await request(app)
            .patch('/api/v2/applying-students/' + student.id)
            .send({
                startUnitArrangement: 1,
                startSectionArrangement: 1
            })
            .set('authorization', teacherToken);  
        studentId = student.id;
    });
    
    afterAll(async () => {
        await cleanDatabase()
    });

    describe('PATCH /api/v2/course-progress', () => {
        test('should update student course progress', async () => {
            const { status, body } = await request(app)
                .patch(`/api/v2/course-progress`)
                .send(testData.studentCourseProgressData)
                .set("authorization", studentToken);
            
            expect(status).toBe(200);
            expect(body.success).toBe(true);
        });
    });

    describe('GET /api/v2/course-progress', () => {
        test('should return array from courses main data', async () => {
            const { status, body } = await request(app)
                .get("/api/v2/course-progress")
                .set("authorization", studentToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty('courseProgress');
            expect(body.courseProgress.unitArrangement).toEqual(testData.studentCourseProgressData.unitArrangement);
            expect(body.courseProgress.sectionArrangement).toEqual(testData.studentCourseProgressData.sectionArrangement);
        });
    });
});
