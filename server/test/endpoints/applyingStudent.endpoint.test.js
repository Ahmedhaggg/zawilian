const request = require('supertest');
const app = require('../../src/index'); // Assuming your Express app is defined in 'app.js' or similar
const { Student, db, StudentCourse, Grade, Course } = require('../../src/models');
const testData  = require('../testData');
const { createJwtToken } = require('../../src/helpers/jwt');
const { cleanDatabase } = require('../testHelper');

describe('applying student endpoints', () => {
    let gradeId;
    let firstapplyingStudentId;
    let secondApplyingStudentId;
    let teacherToken;
    let courseId;
    beforeAll(async () => {
        await db.authenticate();
        let course = await Course.create(testData.courseData);
        courseId = course.id;
        let newGrade = await Grade.create({ ...testData.gradeData, currentCourseId: course.id })
        gradeId = newGrade.id;
        let student1 = await Student.create({
            ...testData.studentData,
            gradeId
        })
        firstapplyingStudentId = student1.id;
        
        let student2 = await Student.create({
            ...testData.secondStudentData,
            gradeId
        })
        secondApplyingStudentId = student2.id;
        teacherToken = await createJwtToken({ role: "teacher" }, "1h")
    });
    
    afterAll(async () => {
        await cleanDatabase()
    });

    describe('GET /api/v2/applying-students/count', () => {
        test('should get the count of applying students', async () => {
            const response = await request(app)
                .get('/api/v2/applying-students/count')
                .set('authorization', teacherToken);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.numberOfApplyingStudents).toBe(2);
        });
        test('should get the count of applying students by gradeId', async () => {
            const response = await request(app)
                .get('/api/v2/applying-students/count?gradeId=' + gradeId)
                .set('authorization', teacherToken);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.numberOfApplyingStudents).toBe(2);
        });
    });

    describe('GET /api/v2/applying-students/', () => {
        test('should get a list of applying students', async () => {
            const response = await request(app)
                .get('/api/v2/applying-students')
                .set('authorization', teacherToken);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body).toHaveProperty("applyingStudents");
            expect(Array.isArray(response.body.applyingStudents)).toBe(true);
        });
    })

    describe('GET /api/v2/applying-students/:applyingStudentId', () => {
        test('should get a single applying student', async () => {
            const response = await request(app)
                .get('/api/v2/applying-students/' + firstapplyingStudentId)
                .set('authorization', teacherToken);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body).toHaveProperty("applyingStudent");
        }); 
    });

    describe('PATCH /api/v2/applying-students/:applyingStudentId', () => {
        test('should accept a student and return success true', async () => {
            const response = await request(app)
                .patch('/api/v2/applying-students/' + firstapplyingStudentId)
                .send({
                    startUnitArrangement: 1,
                    startSectionArrangement: 1
                })
                .set('authorization', teacherToken); 

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            let studentCourse = await StudentCourse.findOne({ where: { studentId: firstapplyingStudentId } } )
            expect(studentCourse.courseId).toBe(courseId)
        });
    })

    describe('GET /api/v2/applying-students/result/:email', () => {
        test('should get applying result for accepted student return success true', async () => {
            const response = await request(app)
                .get('/api/v2/applying-students/result/' + testData.studentData.email);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        }); 
        test('should get applying result for non accepted student return success false', async () => {
            const response = await request(app)
                .get('/api/v2/applying-students/result/' + testData.secondStudentData.email);
            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
        }); 
    });

    describe('DELETE /api/v1/applying-students/:applyingStudentId', () => {
        test('should delete an applying student and return success true', async () => {
            const response = await request(app)
                .delete('/api/v2/applying-students/' + secondApplyingStudentId)
                .set('authorization', teacherToken);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });
    })
});
