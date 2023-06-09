const request = require('supertest');
const app = require('../../src/index'); // Assuming your Express app is defined in 'app.js' or similar
const { Student, db, StudentCourse, Grade } = require('../../src/models');
const testData  = require('../testData');
const { cleanDatabase } = require('../testHelper');
describe('auth student endpoints', () => {
    let gradeId;
    beforeAll(async () => {
        await db.authenticate();
        let newGrade = await Grade.create({ ...testData.gradeData })
        gradeId = newGrade.id;
    });
    
    afterAll(async () => {
        await cleanDatabase()
    });

    describe('POST /api/v2/students/auth/register', () => {
        test('should register new student with accepted false', async () => {
            const { status, body } = await request(app)
                .post('/api/v2/students/auth/register')
                .send({
                    ...testData.studentData,
                    confirmPassword: testData.studentData.password,
                    gradeId
                });

            expect(status).toBe(200);
            expect(body.success).toBe(true);

            let student = await Student.findOne({ 
                where: { email: testData.studentData.email }, 
                attributes: ["accepted"]
            })

            expect(student.accepted).toBe(false);
        });
    });

    describe('POST /api/v2/students/auth/login', () => {
        test('should login and return token', async () => {
            await Student.update(
                {
                    accepted: true,
                },
                { 
                    where: { email: testData.studentData.email }
                }
            );

            const { status, body } = await request(app)
                .post('/api/v2/students/auth/login')
                .send({
                    email: testData.studentData.email,
                    password: testData.studentData.password
                });

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("token");
        });
    });
});
