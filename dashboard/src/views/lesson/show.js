import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ExamPreview from "../../components/exam/ExamPreview";
import PageLoading from "../../components/PageLoading";
import SectionHeader from "../../components/SectionHeader";
import { useGetLessonExamQuery, useGetLessonQuery } from "../../store/lessonSlice"

export default function Lesson() {
    let [showExam, setShowExam] = useState(false)
    let { unitId, lessonId } = useParams();
    let { data, isSuccess, isLoading } = useGetLessonQuery({ unitId, lessonId })
    let { data: exam, isSuccess: examIsLoadingSuccess } = useGetLessonExamQuery({ unitId, lessonId }, { skip: showExam ? false : true })
    return (
        isLoading ? <PageLoading />
            : !isSuccess ? <Navigate to="/404" />
                : (
                    <div className="dashboard-section px-4">
                        <SectionHeader text="lesson" />
                        <div>
                            <ul className="list-group">
                                <li className="list-group-item text-second-color">
                                    <div className="row py-2 ">
                                        <div className="col-3">name</div>
                                        <div className="col-9 text-center">{data.lesson.name}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row py-2 align-items-center">
                                        <div className="col-3">description</div>
                                        <div className="col-9 text-center">{data.lesson.description}</div>
                                    </div>
                                </li>
                            </ul>

                            <div className="mt-4">
                                <p className="h4 mb-3 text-main-light-color">lesson video</p>
                                <iframe
                                    src={data.lesson.video}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    title="video"
                                    className="video"
                                />
                            </div>
                        </div>
                        {
                            !showExam &&
                            <div className="mt-5">
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => setShowExam(true)}
                                >show the Exam</button>
                            </div>
                        }
                        {
                            examIsLoadingSuccess && 
                                <div className="mb-5">
                                    <p className="text-primary h5 my-4">Exam</p>
                                    <ExamPreview exam={exam.exam} />
                                </div>
                        }
                    </div>
                )
    );
}
