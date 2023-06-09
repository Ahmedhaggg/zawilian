import React from 'react'
import { Route, Routes} from "react-router-dom"
import Dashboard from "../views/dashboard";
import Layout from "../components/layouts/Layout"
import Login from "../views/auth/Login"
import Grades from "../views/grade";
import CreateGrade from "../views/grade/create";
import EditGrade from "../views/grade/edit";
import Courses from "../views/course";
import Course from "../views/course/show";
import CreateCourse from "../views/course/create";
import EditCourse from "../views/course/edit";
import CreateUnit from "../views/unit/create";
import Unit from "../views/unit/show";
import EditUnit from "../views/unit/edit";
import Lesson from "../views/lesson/show";
import CreateLesson from "../views/lesson/create";
import EditLesson from "../views/lesson/edit";
import UnitRevision from "../views/unitRevision/show";
import EditUnitRevision from "../views/unitRevision/edit";
import CreateUnitRevision from "../views/unitRevision/create";
import CreateCourseRevision from "../views/courseRevision/create";
import CourseRevision from "../views/courseRevision/show";
import EditCourseRevision from "../views/courseRevision/edit";
import Students from "../views/students";
import Student from '../views/students/show';
import ApplyingStudents from "../views/applyingStudents"
import ApplyingStudent from '../views/applyingStudents/show';
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" exact element={<Login />}/>
            <Route path="/*" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="grades/*">
                    <Route index element={<Grades />} />
                    <Route path="create" element={<CreateGrade />} />
                    <Route path=":id/edit" element={<EditGrade />} />
                </Route>
                <Route path="courses/*">
                    <Route index element={< Courses />} />
                    <Route path="create" element={< CreateCourse />} />
                    <Route path=":id" element={< Course />} />
                    <Route path=":id/edit" element={< EditCourse />} />
                    <Route path=":courseId/units/*">
                        <Route path="create" element={< CreateUnit />} />
                        <Route path=":unitId" element={< Unit />} />
                        <Route path=":unitId/edit" element={< EditUnit />} />
                        <Route path=":unitId/lessons/">
                            <Route path="create" element={< CreateLesson />} />
                            <Route path=":lessonId" element={< Lesson />} />
                            <Route path=":lessonId/edit" element={< EditLesson />} />
                        </Route>
                        <Route path=":unitId/revisions/">
                            <Route path="create" element={<CreateUnitRevision />} />
                            <Route path=":revisionId" element={<UnitRevision />} />
                            <Route path=":revisionId/edit" element={<EditUnitRevision />} />
                        </Route>
                        <Route path="*" element={<div>404</div>} />
                    </Route>
                <Route path=":courseId/revisions/*">
                    <Route path="create" element={< CreateCourseRevision />} />
                    <Route path=":revisionId" element={< CourseRevision />} />
                    <Route path=":revisionId/edit" element={< EditCourseRevision />} />
                </Route>
                <Route path="*" element={<div>404</div>} />
                </Route>
                <Route path="students/*">
                    <Route index element={< Students />} />
                    <Route path=":id" element={<Student />} />
                </Route>
                <Route path="applying-students/*">
                    <Route index element={<ApplyingStudents />} />
                    <Route path=":id" element={< ApplyingStudent/>} />
                </Route>
                <Route path="404" element={<>404</>} />
                <Route path="505" element={<>505</>} />
            </Route>
        </Routes>
    )
}
