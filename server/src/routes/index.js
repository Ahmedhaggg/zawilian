const authStudentRoutes = require('./auth.student.router');
const authTeacherRoutes = require('./auth.teacher.router');
const gradeRoutes = require('./grade.router');
const courseRoutes = require('./course.router');
const unitRoutes = require('./unit.router');
const courseRevisionRoutes = require('./courseRevision.router');
const lessonRoutes = require('./lesson.router');
const unitRevisionRoutes = require('./unitRevision.router')
const examScoreRoutes = require('./examScore.router');
const studentRoutes = require('./students.router');
const studentCourseProgressRoutes = require('./courseProgress.router');
const applyingStudentRoutes = require("./applyingStudent.router");

module.exports = (app) => {
    app.use('/api/v2/students/auth', authStudentRoutes);
    app.use('/api/v2/teacher/auth', authTeacherRoutes);
    app.use('/api/v2/grades', gradeRoutes);
    app.use('/api/v2/courses', courseRoutes);
    app.use('/api/v2/courses/:courseId/units', unitRoutes);
    app.use('/api/v2/courses/:courseId/revisions', courseRevisionRoutes);
    app.use('/api/v2/units/:unitId/lessons', lessonRoutes);
    app.use('/api/v2/units/:unitId/revisions', unitRevisionRoutes);
    app.use('/api/v2/exams-scores', examScoreRoutes);
    app.use('/api/v2/students', studentRoutes);
    app.use('/api/v2/applying-students', applyingStudentRoutes);
    app.use('/api/v2/course-progress', studentCourseProgressRoutes);
    
};
