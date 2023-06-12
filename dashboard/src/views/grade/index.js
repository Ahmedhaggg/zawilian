import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import PageLoading from "../../components/PageLoading";
import SectionHeader from "../../components/SectionHeader";
import { useGetAllGradesQuery } from "../../store/gradeSlice"
export default function Grades() {

    const { data, isLoading, isSuccess } = useGetAllGradesQuery();
    console.log(data)
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
                                    <th>update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.grades.map(grade => (
                                    <tr className="text-center" key={grade.id}>
                                        <td data-title="grade" className="fs-6">
                                            {grade.name}
                                        </td>
                                        <td data-title="grade">
                                            <Link to={"/grades/" + grade.id + "/edit"} className="text-decoration-none">
                                                update
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        { 
                            !data.grades.length && <p className="alert">no added grades</p>
                        }
                        <Link className="btn btn-primary" to="/grades/create">go to add new Grade</Link>
                    </div>
                    : <Navigate to="505" />
                }
            </>
        }
    </>
}
