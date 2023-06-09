import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import PageLoading from "../../components/PageLoading";
import SectionHeader from "../../components/SectionHeader";
import { useGetLessonQuery, useUpdateLessonMutation } from "../../store/lessonSlice";
import { useForm } from "react-hook-form"

export default function EditLesson() {
    let [redirect, setRedirect] = useState(false);
    let { courseId, unitId, lessonId } = useParams();
    let getLesson = useGetLessonQuery({ unitId, lessonId });
    let [updateLesson, updateLessonResult] = useUpdateLessonMutation();

    let { register, handleSubmit, formState: { errors } } = useForm();

    let submitHandler = (newLessonData) => {
        updateLesson({ unitId, lessonId, newLessonData })
    }

    useEffect(() => {
        console.log(updateLessonResult)
        let timeout;
        if (updateLessonResult.isSuccess) {
            timeout = setTimeout(() => { setRedirect(true) }, 2000);
        }
        return () => clearTimeout(timeout);

    }, [updateLessonResult]);

    return (
        getLesson.isLoading ? <PageLoading />
            : !getLesson.isSuccess ? <Navigate to="/404" />
                : (
                    <div className="dashboard-section">
                        <SectionHeader text="update lesson" />
                        <div className="row">
                            <div className="col-12 col-md-8 offset-md-2">
                                <form onSubmit={handleSubmit(submitHandler)}>
                                    <input className={`form-control form-control-lg mb-3 ${errors.name ? 'border-danger' : ''}`} type="text"
                                        placeholder="name" aria-label="name"
                                        defaultValue={getLesson.data.lesson.name}
                                        {...register("name", { required: true })}
                                    />

                                    {
                                        updateLessonResult.error?.data?.error?.errors?.name ?
                                            <div className="alert alert-danger">{updateLessonResult.error.data.error.errors.name}</div> : null
                                    }

                                    <input className={`form-control form-control-lg mb-3 ${errors.description ? 'border-danger' : ''}`} type="text"
                                        placeholder="description" aria-label="description"
                                        defaultValue={getLesson.data.lesson.description}
                                        {...register("description", { required: true })}
                                    />

                                    {
                                        updateLessonResult.error?.data?.error?.errors?.video ?
                                            <div className="alert alert-danger">{updateLessonResult.error.data.error.errors.video}</div> : null
                                    }

                                    <input className={`form-control form-control-lg mb-3 ${errors.video ? 'border-danger' : ''}`} type="text"
                                        placeholder="video" aria-label="video"
                                        defaultValue={getLesson.data.lesson.video}
                                        {...register("video", { required: true })}
                                    />

                                    {
                                        updateLessonResult.error?.data?.error?.errors?.video ?
                                            <div className="alert alert-danger">{updateLessonResult.error.data.error.errors.video}</div> : null
                                    }

                                    <div className="text-center">
                                        {
                                            updateLessonResult.data ?
                                                <p className="alert alert-success">{updateLessonResult.data.message}</p>
                                                : updateLessonResult.error?.data?.error?.errorName === "updateError" ?
                                                    <p className="alert alert-danger">{updateLessonResult.error.data.error.message}</p>
                                                    : null
                                        }
                                        <button type="submit" className="btn btn-primary btn-lg">update lesson</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {redirect && <Navigate to={`/courses/${courseId}/units/${unitId}/lessons/${lessonId}`} />}
                    </div>
                )
    );
}
