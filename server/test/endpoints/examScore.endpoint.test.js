const request = require('supertest');
const app = require('../../src/index'); // Assuming your Express app is defined in 'app.js' or similar
const { db, Grade, Course, CourseRevision, Unit, Section, Student, Exam } = require('../../src/models');
const testData  = require('../testData');
const { createJwtToken } = require('../../src/helpers/jwt');
const { cleanDatabase } = require('../testHelper');
describe('course endpoints', () => {
    let teacherToken;
    let studentToken;
    let unitExamId;
    let courseRevisionExamId;
    let lessonExamId;
    let unitRevisionExamId;
    let unitId;
    let courseRevisionId;
    let lessonId;
    let unitRevisionId;
    let studentId;
    beforeAll(async () => {
        await db.authenticate();
        let newCourse = await Course.create({ ...testData.courseData });
        courseId = newCourse.id;
        // insert unit and exam
        unitExamId = await (await Exam.create(testData.unitExamData)).id
        let newUnit = await Unit.create({ 
            ...testData.unitData, 
            courseId: newCourse.id, arrangement: 1, 
            examId: unitExamId
        });
        unitId = newUnit.id;
        // insert courseRevision and exam
        courseRevisionExamId = await (await Exam.create(testData.courseRevisionsData.exam)).id
        let newCourseRevision = await CourseRevision.create({ 
            video: testData.courseRevisionsData.video,
            name: testData.courseRevisionsData.name,
            description: testData.courseRevisionsData.description,
            courseId: newCourse.id,
            arrangement: 1, 
            examId: courseRevisionExamId
        });
        courseRevisionId = newCourseRevision.id;
        // insert lesson and exam
        lessonExamId = await (await Exam.create(testData.lessonData.exam)).id
        let newLesson = await Section.create({ 
            video: testData.courseRevisionsData.video,
            name: testData.courseRevisionsData.name,
            description: testData.courseRevisionsData.description,
            type: "lesson",
            unitId: newUnit.id,
            arrangement: 1, 
            examId: lessonExamId
        });
        lessonId = newLesson.id;
        // insert unit and exam
        unitRevisionExamId = await (await Exam.create(testData.unitRevisionData.exam)).id
        let newUnitRevision = await Section.create({ 
            video: testData.courseRevisionsData.video,
            name: testData.courseRevisionsData.name,
            description: testData.courseRevisionsData.description,
            unitId: newUnit.id,
            type: "revision",
            arrangement: 2, 
            examId: unitRevisionExamId
        });
        unitRevisionId = newUnitRevision.id;
        let student = await Student.create(testData.studentData);
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
                    examId: unitExamId,
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
                    examId: lessonExamId,
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
                    examId: unitRevisionExamId,
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
                    examId: courseRevisionExamId,
                    courseRevisionId,
                    score: 6
                })
                .set("authorization", studentToken);

            expect(status).toBe(200);
            expect(body.success).toBe(true);
        });
    });
    describe('GET /api/v2/exams-score/exams/:examId', () => {
        test('should return students scores in specific exam', async () => {
            const { status, body } = await request(app)
                .get(`/api/v2/exams-scores/exams/` + unitExamId)
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
