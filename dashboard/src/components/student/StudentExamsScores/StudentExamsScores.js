import React from 'react'
import { useParams } from "react-router-dom"
import { useGetStudentExamsScoresQuery } from "../../../store/studentSlice"
import PageLoading  from "../../PageLoading"
import CourseRevisionScoreItem from './CourseRevisionScoreItem';
import UnitScoreItem from "./UnitScoreItem";

export default function StudentExamsScores() {
    let { id } = useParams();
    let { data: examsScores, isSuccess } = useGetStudentExamsScoresQuery(id);
    console.log(examsScores)
    return (
        isSuccess ? 
            <div className='my-5'>
                <h4 className='h4 mb-3'>student course score</h4>
                <div className="accordion" id="accordionExample">
                    {
                        examsScores.studentCourseExamScore.map((examScore, index) => (
                            examScore.unit ? <UnitScoreItem 
                                data={examScore}
                                key={index}
                                /> : 
                                <CourseRevisionScoreItem 
                                    data={examScore}
                                    key={index}
                                />
                        ))
                    }
                </div>
            </div>
        : <PageLoading />
    )
}
