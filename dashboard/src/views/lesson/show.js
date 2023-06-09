import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import ExamPreview from "../../components/exam/ExamPreview";
import PageLoading from "../../components/PageLoading";
import SectionHeader from "../../components/SectionHeader";
import { useGetLessonQuery } from "../../store/lessonSlice"

export default function Lesson() {
    let { unitId, lessonId } = useParams();
    let { data, isSuccess, isLoading } = useGetLessonQuery({ unitId, lessonId })
    useEffect(() => console.log(data), [data])
    return (
        isLoading ? <PageLoading />
            : !isSuccess ? <Navigate to="/404" />
                : (
                    <div className="dashboard-section px-4">
                        <SectionHeader text="lesson" />
                        <div className="row align-items-center">
                            <div className="col-12 col-xl-6 mb-5 text-start">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <div className="row py-2 ">
                                            <div className="col-3">name</div>
                                            <div className="col-9 text-center">{data.lesson.name}</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row py-2">
                                            <div className="col-3">arrangement</div>
                                            <div className="col-9 text-center">{data.lesson.arrangement}</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row py-2 align-items-center">
                                            <div className="col-3">description</div>
                                            <div className="col-9 text-center">{data.lesson.description} and we what is organic chemstry and number of lessons and who to study lessons</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-12 col-xl-6 mb-5">
                                <iframe
                                    src="https://www.youtube.com/embed/E7wJTI-1dvQ"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    title="video"
                                    className="video"
                                />
                            </div>
                        </div>
                        <div className="mb-5">
                            <p className="text-primary fs-3 mb-4">Exam</p>
                            <ExamPreview exam={data.lesson.exam} />
                        </div>
                    </div>
                )
    );
}
