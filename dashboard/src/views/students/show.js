import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetStudentQuery } from "../../store/studentSlice";
import SectionHeader from "../../components/SectionHeader";
import StudentInfo from "../../components/student/StudentInfo";
import PageLoading from "../../components/PageLoading";
import StudentExamsScores from "../../components/student/StudentExamsScores/StudentExamsScores";
import { Navigate } from 'react-router-dom'

export default function Student() {
    let { id : studentId} = useParams(); 
    let [showExamsScores, setShowExamsScores] = useState(false)
    let { data, isLoading, isSuccess } = useGetStudentQuery(studentId);

    
    return (
        isLoading ? <PageLoading /> :
        !isSuccess ?  <Navigate to="/404"/> : 
        <div className="dashboard-section px-4">
            <SectionHeader text="student" />
            <div className="mb-3">
                <StudentInfo info={data.student}/>
            </div>

            {
                !showExamsScores ? 
                    <button className="btn btn-primary" onClick={() => setShowExamsScores(true)}>
                        show exam scores
                    </button>
                :
                <div className="my-4">
                    <StudentExamsScores studentId={studentId}/>
                </div>
            }
        </div>
        
    )
}
