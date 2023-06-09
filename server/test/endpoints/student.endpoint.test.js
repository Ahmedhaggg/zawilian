const request = require('supertest');
const app = require('../../src/index'); // Assuming your Express app is defined in 'app.js' or similar
const { db, Student, Grade, Course  } = require('../../src/models');
const testData  = require('../testData');
const { createJwtToken } = require('../../src/helpers/jwt');
const { cleanDatabase } = require('../testHelper');
describe('course endpoints', () => {
    let teacherToken;
    let studentToken;
    let studentId;
    let gradeId;
    beforeAll(async () => {
        await db.authenticate();
        teacherToken = await createJwtToken({ role: "teacher" }, "1h")
        let newGrade = await Grade.create({ ...testData.gradeData })
        gradeId = newGrade.id;
        let newCourse = await Course.create({ ...testData.courseData, gradeId: newGrade.id });
        await Grade.update({ currentCourseId: newCourse.id }, { where: {id : newGrade.id} });
        let student = await Student.create({ ...testData.studentData, gradeId: newGrade.id });
        studentId = student.id;
        await request(app)
            .patch('/api/v2/applying-students/' + student.id)
            .send({
                startUnitArrangement: 1,
                startSectionArrangement: 1
            })
            .set('authorization', teacherToken);  
        studentToken = await createJwtToken({ role: 'student', id: student.id }, "1h");
    });
    
    afterAll(async () => {
        await cleanDatabase();
    });

    describe('GET /api/v2/students', () => {
        test('should return array from students', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/students/`)
                .set("authorization", teacherToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("students");
            expect(Array.isArray(body.students)).toBe(true);
        });
    });

    describe('GET /api/v2/students/count', () => {
        test('should return number of students', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/students/count`)
                .set("authorization", teacherToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("numberOfStudents");
            expect(typeof body.numberOfStudents).toBe("number");
        });
        test('should return number of students in specific grade', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/students/count`)
                .query({ gradeId })
                .set("authorization", teacherToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("numberOfStudents");
            expect(typeof body.numberOfStudents).toBe("number");
        });
    });

    describe('GET /api/v2/students/profile', () => {
        test('should return number of students', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/students/profile`)
                .set("authorization", studentToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("student");
            expect(body.student).toHaveProperty("grade");
            expect(body.student).toHaveProperty("studentCourse");
        });
    });

    describe('GET /api/v2/students/:studentId', () => {
        test('should return number of students', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/students/${studentId}`)
                .set("authorization", teacherToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("student");
            expect(body.student).toHaveProperty("grade");
            expect(body.student).toHaveProperty("studentCourse");
        });
    });
});