import React, { useState } from "react";
import PageLoading from "../../components/PageLoading";
import { Navigate, useParams } from "react-router-dom"
import SectionHeader from "../../components/SectionHeader";
import ExamPreview from "../../components/exam/ExamPreview";
import { useGetCourseRevisionQuery, useGetCourseRevisionExamQuery } from "../../store/courseRevisionSlice";

export default function CourseRevision() {
    let { courseId, revisionId } = useParams();
    let { data, isSuccess, isLoading } = useGetCourseRevisionQuery({ courseId, revisionId })
    let [showExam, setShowExam] = useState(false)
    let { data: exam, isSuccess : examIsLoadingSuccess } = useGetCourseRevisionExamQuery({ courseId, revisionId }, { skip: showExam ? false : true });
    
    return (
        isLoading ? <PageLoading />
            : !isSuccess ? <Navigate to="/404" />
                : (
                    <div className="dashboard-section px-4">
                        <SectionHeader text="course revision" />
                        <div>
                            <ul className="list-group">
                                <li className="list-group-item text-second-color">
                                    <div className="row py-2 ">
                                        <div className="col-3">name</div>
                                        <div className="col-9 text-center">{data.revision.name}</div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row py-2 align-items-center">
                                        <div className="col-3">description</div>
                                        <div className="col-9 text-center">{data.revision.description}</div>
                                    </div>
                                </li>
                            </ul>

                            <div className="mt-4">
                                <p className="h4 mb-3 text-main-light-color">revision video</p>
                                <iframe
                                    src={data.revision.video}
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
