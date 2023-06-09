import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams, Link } from "react-router-dom";
import { useCountApplyingStudentsQuery, useGetApplyingStudentsQuery } from "../../store/applyingStudentSlice";
import { useGetAllGradesQuery } from "../../store/gradeSlice"
import PageLoading from "../../components/PageLoading"
import Pagination from "../../components/Pagination";
import SectionHeader from "../../components/SectionHeader";
 
export default function ApplyingStudents() {
    let [totalOfPages, setTotalPages] = useState(0);
    let [searchParams, setSearchParams] = useSearchParams();
    let [offset, setOffset] = useState(null);
    let [grade, setGrade] = useState(null);
    let countStudents = useCountApplyingStudentsQuery({ grade : grade === "all" ? null : grade });
    let getGrades = useGetAllGradesQuery();
    let { data, isLoading, isSuccess } = useGetApplyingStudentsQuery({ offset, grade : grade === "all" ? null : grade });

    useEffect(() => { setSearchParams({ grade: "all", page: searchParams.get("page") || 1 })}, [])
    
    useEffect(() => {
        setTotalPages(
            countStudents.data?.numberOfStudents > 10 ?
                Math.ceil(countStudents.data.numberOfStudents / 10) :
                countStudents.data?.numberOfStudents > 0 ? 1
                    : 0
        )}
    ,[countStudents.data])
    
    return (
        isLoading ? <PageLoading />
                : <div className="dashboard-section">
                    <SectionHeader text="Applying Students" />
                    {
                        getGrades.data && <select className="form-select form-select-lg mb-3" aria-label="select select grade"
                            onChange={(e) => {
                                setGrade(e.target.value === "all" ? "all" : e.target.value)
                                setSearchParams({ 
                                    grade: e.target.value === "all" ? "all" : getGrades.data.grades[e.target.selectedIndex - 1].name.replaceAll(" ", '_'),
                                    page: 1 
                                })
                            }}
                    >
                            <option value="all">all</option>
                        {
                            getGrades.data.grades.map(gradeData => {
                                return (
                                    <option value={gradeData._id} key={gradeData._id}>{gradeData.name}</option>
                                )
                            })
                        }
                    </select>}
                    <table className="table bg-white">
                        <thead className="bg-second-color text-light">
                            <tr className="text-center">
                                <th>name</th>
                                <th>phone</th>
                                <th>grade</th>
                            </tr>
                        </thead>
                         <tbody>
                            {
                                data.unAcceptedStudents.map(student => (
                                    <tr className="text-center" key={student._id}>
                                        <td data-title="student" className="fs-6">
                                            <Link className="text-black-color text-decoration-none" to={"/applying-students/" + student._id}>{student.name}</Link>
                                        </td>
                                        <td data-title="student" className="fs-6">{student.phoneNumber}</td>
                                        <td data-title="student" className="fs-6">{student.grade.name}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {
                            data.unAcceptedStudents.length === 0 ? 
                                <p className="alert alert-info pt-3 w-100">no students in this grade</p>
                            : null
                    }
                    <Pagination numberOfPages={totalOfPages} 
                        setOffset={(skip) => setOffset(skip)} 
                        setPage={  
                            (newPage) => {
                                setSearchParams({
                                    grade: searchParams.get("grade"),
                                    page: newPage
                                })
                            } 
                        } />
                </div>
    )

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
                                    <th>update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.courses.map(course => (
                                    <tr className="text-center" key={course._id}>
                                        <td data-title="course" className="fs-6">
                                            <Link className="text-black-color text-decoration-none" to={"/courses/" + course._id}>{course.name}</Link>
                                        </td>
                                        <td data-title="update course">
                                            <Link to={"/courses/" + course._id + "/edit"} className="text-decoration-none">
                                                update
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Link className="btn btn-primary" to="/courses/create">go to add new course</Link>
                    </div>
                    : <Navigate to="505" />
                }
            </>
        }
    </>
}
