import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import PageLoading from "../../components/PageLoading";
import SectionHeader from "../../components/SectionHeader";
import { useGetAllCoursesQuery } from "../../store/courseSlice"

export default function Courses() {

    const { data, isLoading, isSuccess } = useGetAllCoursesQuery();
    
    return <>
        {
            isLoading ? <PageLoading /> : <>
                {isSuccess ?
                    <div className="dashboard-section">
                        <SectionHeader text="courses" />
                        <table className="table bg-white">
                            <thead className="bg-second-color text-light">
                                <tr className="text-center">
                                    <th>name</th>
                                    <th>term</th>
                                    <th>grade</th>
                                    <th>update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.courses.map(course => (
                                    <tr className="text-center" key={course.id}>
                                        <td data-title="course" className="fs-6">
                                            <Link className="text-black-color text-decoration-none" to={"/courses/" + course.id}>{course.name}</Link>
                                        </td>
                                        <td data-title="course" className="fs-6">
                                            {course.term}
                                        </td>
                                        <td data-title="update course">
                                            {
                                                course.grade? course.grade.name :   <>...</>
                                            }
                                        </td>
                                        <td data-title="update course">
                                            <Link to={"/courses/" + course.id + "/edit"} className="text-decoration-none">
                                                update
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        { 
                            !data.courses.length && <p className="alert">no added courses</p>
                        }
                        <Link className="btn btn-primary" to="/courses/create">go to add new course</Link>
                    </div>
                    : <Navigate to="505" />
                }
            </>
        }
    </>
}
