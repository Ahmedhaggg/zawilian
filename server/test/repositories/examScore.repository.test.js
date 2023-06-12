const { Course, Grade, CourseRevision, Section, Unit, Student, ExamScore, db } = require("../../src/models");
const exmScoreRepository = require("../../src/repositories/examScore.repository"); // Replace with the actual repository file
const { cleanDatabase } = require("../testHelper");

describe("exam score Repository Integration Tests", () => {
    let studentId;
    let unitId;
    let courseRevisionId;
    let lessonId;
    let unitRevisionId;
    let courseId;

    let examData = {
        points: 10,
        questions: [
            {
                question: "question 1",
                correctAnswer: "answer 1",
                answers: [
                    "answer 1",
                    "answer 2",
                    "answer 3",
                    "answer 4"
                ]
            }
        ]
    }

    beforeAll(async () => {    
        try {
        await db.authenticate();
        const newGrade = await Grade.create({ name: "grade 1" });

        const studentData = {
            name: "John Doe",
            email: "ahmed@gmail.com",
            accepted: true,
            gradeId: newGrade.id,
            password: "password",
            phoneNumber: "1234567890"
        };
        
        const newStudent = await Student.create(studentData);
        studentId = newStudent.id;
        

        const newCourse = await Course.create({ name: "course 1", term: "first", gradeId: newGrade.id  });
        courseId = newCourse.id;
        
        // Insert test data for unit
        const newUnit = await Unit.create({
            name: "revision 1",
            description: "description",
            courseId: newCourse.id,
            exam: examData,
            courseId: newCourse.id,
            arrangement: 1
        });
        unitId = newUnit.id;
    
        // Insert test data for course revision
        const newCourseRevision = await CourseRevision.create({
            name: "revision 1",
            video: "http://youtube.com/watch/1",
            description: "description",
            courseId: newCourse.id,
            exam: examData,
            courseId: newCourse.id,
            arrangement: 1
        });
        courseRevisionId = newCourseRevision.id;


        // Insert test data for course unit revision
        const newUnitRevision = await Section.create({
            name: "revision 1",
            video: "http://youtube.com/watch/1",
            description: "description",
            courseId: newCourse.id,
            exam: examData,
            type: "revision",
            unitId,
            arrangement: 3
        });
        unitRevisionId = newUnitRevision.id;

        // Insert test data for lesson
        const newLesson = await Section.create({
            name: "revision 1",
            video: "http://youtube.com/watch/1",
            description: "description",
            courseId: newCourse.id,
            exam: examData,
            type: "lesson",
            unitId,
            arrangement: 1
        });
        examData.id = newLessonExam.id;
        lessonId = newLesson.id;
        } catch (error) { 
            console.log(error)
        }
    });

    afterAll(async () => {
        await cleanDatabase()
    });

    describe("create", () => {
        it("should save student unit exam score and return object", async () => {
            let newExamScore = await exmScoreRepository.create({ studentId, unitId, score: 10 })
            expect(newExamScore).toHaveProperty("studentId")
            expect(newExamScore).toHaveProperty("score")
            expect(newExamScore).toHaveProperty("unitId")
        }); 

        it("should save student course revision exam score and return object", async () => {
            let newExamScore = await exmScoreRepository.create({ studentId, courseRevisionId, score:20 })
            expect(newExamScore).toHaveProperty("studentId")
            expect(newExamScore).toHaveProperty("score")
            expect(newExamScore).toHaveProperty("courseRevisionId")
        });

        it("should save student lesson exam score and return object", async () => {
            let newExamScore = await exmScoreRepository.create({ studentId, sectionId: lessonId, score: 15 })
            expect(newExamScore).toHaveProperty("studentId")
            expect(newExamScore).toHaveProperty("score")
            expect(newExamScore).toHaveProperty("sectionId")
        });

        it("should save student unit revision exam score and return object", async () => {
            let newExamScore = await exmScoreRepository.create({ studentId, sectionId: unitRevisionId , score: 12 })
            expect(newExamScore).toHaveProperty("studentId")
            expect(newExamScore).toHaveProperty("score")
            expect(newExamScore).toHaveProperty("sectionId")
        });
    });

    describe("findStudentsScoreByExamId", () => {
        it("should return array contains score and student", async () => {
            let result = await exmScoreRepository.findStudentsScoresInExam({ unitId });
            console.log("this is result of find specific exam students socre", result)

            expect(Array.isArray(result)).toBe(true)
            expect(result[0]).toHaveProperty("score")
            expect(result[0]).toHaveProperty("student")
            expect(result[0].student).toHaveProperty("id")
            expect(result[0].student).toHaveProperty("name")
            expect(result[0].student).toHaveProperty("phoneNumber")
        });
    });

    describe("findStudentCourseExamsScore", () => {
        it("should return students' exams scores to units and revisions arranged in succession", async () => {
            delete examData.id;
            let newUnitsData = [...Array(6)].map(x => 0).map((_, index) => {
                return {
                    name: "unit " + index + 2,
                    description: "description",
                    courseId: courseId,
                    arrangement: index + 2,
                    exam: examData
                }
            })
        
            // Insert test data for unit
            let newUnits = await Unit.bulkCreate(newUnitsData);
            let newUnitsScoreData =  newUnits.map((newUnit, index) => {
                return {
                    studentId,
                    unitId: newUnit.id,
                    score: 5 + index 
                }
            })
            await ExamScore.bulkCreate(newUnitsScoreData);

            let studentCourseScores = await exmScoreRepository.findStudentCourseExamsScore(studentId);
            expect(Array.isArray(studentCourseScores)).toBe(true)

            let originalSortedCourse = studentCourseScores.map(res => { return { 
                id: res.unit ? res.unit.id : res.courseRevision.id,
                arrangement: res.unit ? res.unit.arrangement : res.courseRevision.arrangement,
                type: res.unit ? "unit" : "courseRevision"
            }})

            let checkSortedCourse = [...originalSortedCourse].sort((a, b ) => a.arrangement - b.arrangement && a.type - b.type); 
            expect(checkSortedCourse).toEqual(originalSortedCourse)
        });
    });
});