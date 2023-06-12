import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, Navigate } from "react-router-dom";
import { useCreateLessonMutation } from "../../store/lessonSlice";
import SectionHeader from "../../components/SectionHeader";
import Questions from "../../components/exam/Questions";

export default function CreateLesson() {
    let [redirect, setRedirect] = useState(false);
    let { courseId, unitId } = useParams()
    let [createLesson, createLessonResult] = useCreateLessonMutation();
    let { register, handleSubmit, control, formState: { errors } } = useForm();

    useEffect(() => {
        let timeout;
        if (createLessonResult.isSuccess) {
            timeout = setTimeout(() => { setRedirect(true) }, 2000);
        }
        return () => clearTimeout(timeout);

    }, [createLessonResult]);

    let submitHandler = (newLessonData) => {
        createLesson({
            courseId,
            unitId,
            newLessonData: {
                name: newLessonData.name,
                description: newLessonData.description,
                video: newLessonData.video,
                exam: {
                    questions: newLessonData.questions
                }
            }
        })
    }

    return (
        <div className="dashboard-section">
            <SectionHeader text="add lesson to unit " />
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2">
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <input className={`form-control form-control-lg mb-3 ${errors.name ? 'border-danger' : ''}`} type="text"
                            placeholder="name" aria-label="name"
                            {...register("name", { required: true })}
                        />

                        {
                            createLessonResult.error?.data?.error?.errors?.name ?
                                <div className="alert alert-danger">{createLessonResult.error.data.error.errors.name}</div> : null
                        }

                        <textarea
                            className={`form-control form-control-lg mb-3 ${errors.description ? 'border-danger' : ''}`}
                            placeholder="description" aria-label="description"
                            {...register("description", { required: true })}
                        />

                        {
                            createLessonResult.error?.data?.error?.errors?.description ?
                                <div className="alert alert-danger">{createLessonResult.error.data.error.errors.description}</div> : null
                        }

                        <input className={`form-control form-control-lg mb-3 ${errors.video ? 'border-danger' : ''}`} type="text"
                            placeholder="video" aria-label="video"
                            {...register("video", { required: true })}
                        />

                        {
                            createLessonResult.error?.data?.error?.errors?.name ?
                                <div className="alert alert-danger">{createLessonResult.error.data.error.errors.name}</div> : null
                        }

                        <div className="exam">
                            <p className="text-start fs-5 text-second-color">exam</p>
                            <Questions register={register} control={control} errors={errors} />
                        </div>

                        <div className="text-center">
                            {
                                createLessonResult.data ?
                                    <p className="alert alert-success">{createLessonResult.data.message}</p>
                                    : null
                            }
                            <button type="submit" className="btn btn-primary btn-lg">create lesson</button>
                        </div>
                    </form>
                </div>
            </div>
            {redirect && <Navigate to={`/courses/${courseId}/units/${unitId}`} />}
        </div>
    )
}
