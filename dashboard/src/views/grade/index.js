import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import PageLoading from "../../components/PageLoading";
import SectionHeader from "../../components/SectionHeader";
import { useGetAllGradesQuery } from "../../store/gradeSlice"
export default function Grades() {

    const { data, isLoading, isSuccess } = useGetAllGradesQuery();

    return <>
        {
            isLoading ? <PageLoading /> : <>
                {isSuccess ?
                    <div className="dashboard-section">
                        <SectionHeader text="grades" />
                        <table className="table bg-white">
                            <thead className="bg-second-color text-light">
                                <tr className="text-center">
                                    <th>name</th>
                                    <th>current course</th>
                                    <th>number of students</th>
                                    <th>update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.grades.map(grade => (
                                    <tr className="text-center" key={grade._id}>
                                        <td data-title="grade" className="fs-6">
                                            <Link className="text-black-color text-decoration-none" to={"/grades/" + grade._id}>{grade.name}</Link>
                                        </td>
                                        <td data-title="Last Name">
                                            <Link className="text-black-color text-decoration-none" to={"/courses/" + grade.currentCourse._id}>{grade.currentCourse.name}</Link>
                                        </td>
                                        <td data-title="Last Name">
                                            {grade.numberOfStudents || 0}
                                        </td>
                                        <td data-title="Last Name">
                                            <Link to={"/grades/" + grade._id + "/edit"} className="text-decoration-none">
                                                update
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Link className="btn btn-primary" to="/grades/create">go to add new Grade</Link>
                    </div>
                    : <Navigate to="505" />
                }
            </>
        }
    </>
}
