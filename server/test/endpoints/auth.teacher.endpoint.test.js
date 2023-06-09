const request = require('supertest');
const app = require('../../src/index');
const { ADMIN_EMAIL, ADMIN_PASSWORD } = require('../../src/config');
const { db } = require('../../src/models');

describe('auth student endpoints', () => {
    beforeAll(async () => {
        await db.authenticate();
    });

    describe('POST /api/v2/students/auth/login', () => {
        test('should login and return token', async () => {
            
            const { status, body } = await request(app)
                .post('/api/v2/teacher/auth/login')
                .send({
                    email: ADMIN_EMAIL,
                    password: ADMIN_PASSWORD
                });

            expect(status).toBe(200);
            expect(body.success).toBe(true);
            expect(body).toHaveProperty("token");
        });
    });
});