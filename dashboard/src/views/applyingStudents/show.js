import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import PageLoading from '../../components/PageLoading';
import SectionHeader from '../../components/SectionHeader';
import { useGetApplyingStudentQuery } from '../../store/applyingStudentSlice';
import { useGetCourseQuery } from '../../store/courseSlice';
import AcceptStudentForm from '../../components/acceptingStudents/AcceptingStudentForm';

export default function ApplyingStudent() {
    let { id } = useParams();
    let {data, isLoading, isSuccess} = useGetApplyingStudentQuery(id);
    let [showAcceptStudentForm, setShowAcceptStudentForm] = useState(false);
    let course = useGetCourseQuery( isSuccess ?  data.unAcceptedStudent.currentCourse._id : null , { skip: !showAcceptStudentForm });

    
    return (
        isLoading ? <PageLoading />
            : !isSuccess ? <Navigate to="/404"/>
            : (
                <div className="dashboard-section px-4">
                        <SectionHeader text="applying student" />
                        <div className="mb-3">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <div className="row py-2 ">
                                        <div className="col-3">name</div>
                                        <div className="col-9 text-center">{data.unAcceptedStudent.name}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row py-2">
                                        <div className="col-3">grade</div>
                                        <div className="col-9 text-center">{data.unAcceptedStudent.grade.name}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row py-2 align-items-center">
                                        <div className="col-3">phone</div>
                                        <div className="col-9 text-center">{data.unAcceptedStudent.phoneNumber}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {
                            !showAcceptStudentForm ?  
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => setShowAcceptStudentForm(true)}>Accept</button>
                            :   (
                                course.isLoading ? <PageLoading /> :
                                    course.isSuccess ?
                                        <AcceptStudentForm course={course.data.course} />
                                    : <Navigate to={"/404"}/>
                            )
                        }
                </div>
            )
    )
}
