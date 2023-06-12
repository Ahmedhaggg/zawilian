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
                                        <div className="col-9 text-center">{data.applyingStudent.name}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row py-2 ">
                                        <div className="col-3">email</div>
                                        <div className="col-9 text-center">{data.applyingStudent.email}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row py-2 ">
                                        <div className="col-3">phone</div>
                                        <div className="col-9 text-center">{data.applyingStudent.phoneNumber}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row py-2">
                                        <div className="col-3">grade</div>
                                        <div className="col-9 text-center">{data.applyingStudent.grade.name}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {
                            !showAcceptStudentForm ?  
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => setShowAcceptStudentForm(true)}>accept form </button>
                            :   
                                <AcceptStudentForm courseId={data.applyingStudent.grade.currentCourseId} />
                        }
                </div>
            )
    )
}
