const request = require('supertest');
const app = require('../../src/index'); // Assuming your Express app is defined in 'app.js' or similar
const { db, Grade, Course, CourseRevision, Unit, Section, Student, Exam } = require('../../src/models');
const testData  = require('../testData');
const { createJwtToken } = require('../../src/helpers/jwt');
const { cleanDatabase } = require('../testHelper');
describe('course endpoints', () => {
    let teacherToken;
    let studentToken;
    let unitId;
    let courseRevisionId;
    let lessonId;
    let unitRevisionId;
    let studentId;
    beforeAll(async () => {
        await db.authenticate();
        let newCourse = await Course.create({ ...testData.courseData });
        courseId = newCourse.id;

        let newGrade = await Grade.create({ ...testData.gradeData, gradeId: newCourse.id })

        // insert unit and exam
        let newUnit = await Unit.create({ 
            ...testData.unitData, 
            courseId: newCourse.id, arrangement: 1, 
            exam: testData.unitExamData
        });
        unitId = newUnit.id;

        // insert courseRevision and exam
        let newCourseRevision = await CourseRevision.create({ 
            ...testData.courseRevisionsData,
            courseId: newCourse.id, 
            arrangement: 1, 
        });
        courseRevisionId = newCourseRevision.id;

        // insert lesson and exam
        let newLesson = await Section.create({ 
            ...testData.lessonData,
            unitId: newUnit.id,
            type: "lesson",
            arrangement: 1, 
        });
        lessonId = newLesson.id;

        // insert unit and exam
        let newUnitRevision = await Section.create({ 
            ...testData.unitRevisionData,
            unitId: newUnit.id,
            type: "revision",
            arrangement: 2, 
        });
        unitRevisionId = newUnitRevision.id;

        let student = await Student.create({gradeId: newGrade.id ,...testData.studentData});
        studentId = student.id;
        teacherToken = await createJwtToken({ role: "teacher", }, "1h")
        studentToken = await createJwtToken({ role: "student", id: student.id  }, "1h")
    });
    
    afterAll(async () => {
        await cleanDatabase()
    });

    describe('POST /api/v2/exams-scores', () => {
        test('should save student score in unit exam', async () => {
            const { status, body } = await request(app)
                .post(`/api/v2/exams-scores`)
                .send({
                    unitId: unitId,
                    score: 9
                })
                .set("authorization", studentToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
        });

        test('should save student score in lesson exam', async () => {
            const { status, body } = await request(app)
                .post(`/api/v2/exams-scores`)
                .send({
                    sectionId: lessonId,
                    score: 8
                })
                .set("authorization", studentToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
        });

        test('should save student score in unit revision exam', async () => {
            const { status, body } = await request(app)
                .post(`/api/v2/exams-scores`)
                .send({
                    sectionId: unitRevisionId,
                    score: 7
                })
                .set("authorization", studentToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
        });

        test('should save student score in course revision exam', async () => {
            const { status, body } = await request(app)
                .post(`/api/v2/exams-scores`)
                .send({
                    courseRevisionId,
                    score: 6
                })
                .set("authorization", studentToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
        });
    });
    describe('GET /api/v2/exams-score/exams/:examId', () => {
        test('should return students scores in specific unit', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/exams-scores/exam`)
                .query({
                    unitId
                })
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("studentsScore");
        });
        test('should return students scores in specific lesson', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/exams-scores/exam`)
                .query({
                    sectionId: lessonId
                })
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("studentsScore");
        });
        test('should return students scores in unit revision', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/exams-scores/exam`)
                .query({
                    sectionId: unitRevisionId
                })
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("studentsScore");
        });
        test('should return students scores in course revision', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/exams-scores/exam`)
                .query({
                    courseRevisionId
                })
                .set("authorization", teacherToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("studentsScore");
        });
    });

    describe('GET /api/v2/exams-score/students/:studentId?', () => {
        test('should return student course exams scores for user without send id and get studentId from token', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/exams-scores/students/`)
                .set("authorization", studentToken)

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("studentCourseExamScore");
        });

        test('should return student course exams scores for admin', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/exams-scores/students/` + studentId)
                .set("authorization", teacherToken)
            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("studentCourseExamScore");
        });
    });

    
});
