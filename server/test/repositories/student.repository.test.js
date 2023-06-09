const { Student, Grade,  StudentCourse, db } = require("../../src/models");
const studentRepository = require("../../src/repositories/student.repository"); // Replace with the actual repository file
const { cleanDatabase } = require("../testHelper");

describe("Student Repository Integration Tests", () => {
    let gradeId;
    let studentId;
    beforeAll(async () => {
        await db.authenticate();
        let newGrade = await Grade.create({ name: "first high school"})
        gradeId = newGrade.id;
    });
    
    afterAll(async () => {
        await cleanDatabase()
    });

    describe("create", () => {
        it("should create a new student and return object with unaccepted property equel false", async () => {

            let newStudent = await studentRepository.create({
                name: "John Doe",
                email: "ahmed@gmail.com",
                accepted: false,
                gradeId: gradeId,
                password: "password",
                phoneNumber: "1234567890"
            })

            expect(newStudent).toHaveProperty("id")
            expect(newStudent).toHaveProperty("accepted")
            expect(newStudent.accepted).toBe(false)

            studentId = newStudent.id
        });
    });

    describe("count", () => {
        it("should return the count of applying students which equel 1", async () => {
            let numberOfStudents = await studentRepository.count({ gradeId, accepted: false });
            expect(numberOfStudents).toBe(1);
        });
    });

    describe("findApplyinStudentById", () => {
        it("should find a student with associated grade data", async () => {
            let student = await studentRepository.findApplyinStudentById(studentId);
            expect(student).toHaveProperty("id");
            expect(student).toHaveProperty("name");
            expect(student).toHaveProperty("email");
            expect(student).toHaveProperty("phoneNumber");
            expect(student).toHaveProperty("grade");
        });
    });

    describe("findAll for applying students", () => {
        it("should find all applying students", async () => {
            let students = await studentRepository.findAll({ accepted: false });
            expect(students.length).toBe(1)
            expect(students[0]).toHaveProperty("grade")
        });
        it("should find all students with associated grade data", async () => {
            let students = await studentRepository.findAll({ accepted: false });
            expect(students.length).toBe(1)
            expect(students[0]).toHaveProperty("grade")
        });
        it("should find all students with associated grade data", async () => {
            let students = await studentRepository.findAll({ accepted: true, gradeId });
            expect(students.length).toBe(0)
        });
        it("should find all students with associated incorrect gradeId ", async () => {
            let students = await studentRepository.findAll({ accepted: true, gradeId: 1000 });
            expect(students.length).toBe(0)
        });
    });

    describe("findApplyingStudentLoginData", () => {
        it("should find login data for an applying student by ID", async () => {
            let student = await studentRepository.findApplyingStudentLoginData(studentId);
            expect(student).toHaveProperty("id");
            expect(student).toHaveProperty("accepted");
            expect(student).toHaveProperty("grade");
            expect(student.grade).toHaveProperty("currentCourseId");
        });
    });

    describe("findLoginDataByEmail", () => {
        it("should find login data for a student by email", async () => {
            let student = await studentRepository.findLoginDataByEmail("ahmed@gmail.com")
            expect(student).toHaveProperty("id");
            expect(student).toHaveProperty("email");
            expect(student).toHaveProperty("accepted");
            expect(student).toHaveProperty("password");
            expect(student).toHaveProperty("courseId");
        });
    });

    describe("acceptStudent", () => {
        it("should accept a student, create a student course and return true", async () => {
            let result = await studentRepository
                .acceptStudent(studentId, { unitArrangement: 1, sectionArrangement: 2 })
            expect(result).toBeTruthy();
        });
    });

    describe("findStudentById", () => {
        it("should find student data  and return object contains main info and grade and courseId", async () => {
            let student = await studentRepository.findStudentById(studentId)
            expect(student).toHaveProperty("id");
            expect(student).toHaveProperty("email");
            expect(student).toHaveProperty("accepted");
            expect(student).toHaveProperty("grade");
            expect(student).toHaveProperty("studentCourse");
        });
    });

    describe("findCourseProgress", () => {
        it("should find the course progress for a student and return object", async () => {
            let result = await studentRepository.findCourseProgress(studentId);

            expect(result).toHaveProperty("unitArrangement")
            expect(result).toHaveProperty("sectionArrangement")
        });
    });

    describe("updateCourseProgress", () => {
        it("should update the course progress for a student and return true", async () => {
            let result = await studentRepository.updateCourseProgress(studentId, { unitArrangement: 2, sectionArrangement: 3 });
            expect(result).toBeTruthy();
        });
    });
    
    describe("deleteOne", () => {
        it("should return true when accepted true", async () => {
            let result = await studentRepository.deleteOne({ id: studentId , accepted: true })
            expect(result).toBeTruthy();
        });
        it("should return false when accepted false", async () => {
            let result = await studentRepository.deleteOne({ id: studentId, accepted: true })
            expect(result).toBe(false);
        });
    });
});
