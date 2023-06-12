import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { useCreateCourseRevisionMutation } from "../../store/courseRevisionSlice";
import SectionHeader from "../../components/SectionHeader";
import Questions from "../../components/exam/Questions";

export default function CreateCourseRevision() {
    let [redirect, setRedirect] = useState(false);
    let { courseId } = useParams();
    let [createCourseRevision, createCourseRevisionResult] = useCreateCourseRevisionMutation();
    let { register, handleSubmit, control, formState: { errors } } = useForm();

    useEffect(() => {
        let timeout;
        if (createCourseRevisionResult.isSuccess) {
            timeout = setTimeout(() => { setRedirect(true) }, 2000);
        }
        return () => clearTimeout(timeout);

    }, [createCourseRevisionResult]);

    let submitHandler = (newCourseRevisionData) => {
        createCourseRevision({
            courseId,
            newCourseRevisionData: {
                name: newCourseRevisionData.name,
                description: newCourseRevisionData.description,
                video: newCourseRevisionData.video,
                exam: {
                    questions: newCourseRevisionData.questions
                }
            }
        })
    }

    return (
                <>
                    <div className="dashboard-section">
                        <SectionHeader text="add revision to Course " />
                        <div className="row">
                            <div className="col-12 col-md-8 offset-md-2">
                                <form onSubmit={handleSubmit(submitHandler)}>
                                    <input className={`form-control form-control-lg mb-3 ${errors.name ? 'border-danger' : ''}`} type="text"
                                        placeholder="name" aria-label="name"
                                        {...register("name", { required: true })}
                                    />

                                    {
                                        createCourseRevisionResult.error?.data?.error?.errors?.name ?
                                            <div className="alert alert-danger">{createCourseRevisionResult.error.data.error.errors.name}</div> : null
                                    }

                                    <textarea
                                        className={`form-control form-control-lg mb-3 ${errors.description ? 'border-danger' : ''}`}
                                        placeholder="description" aria-label="description"
                                        {...register("description", { required: true })}
                                    />

                                    {
                                        createCourseRevisionResult.error?.data?.error?.errors?.description ?
                                            <div className="alert alert-danger">{createCourseRevisionResult.error.data.error.errors.description}</div> : null
                                    }

                                    <input className={`form-control form-control-lg mb-3 ${errors.video ? 'border-danger' : ''}`} type="text"
                                        placeholder="video" aria-label="video"
                                        {...register("video", { required: true })}
                                    />

                                    {
                                        createCourseRevisionResult.error?.data?.error?.errors?.name ?
                                            <div className="alert alert-danger">{createCourseRevisionResult.error.data.error.errors.name}</div> : null
                                    }

                                    <div className="exam">
                                        <p className="text-start fs-5 text-second-color">exam</p>
                                        <Questions register={register} control={control} errors={errors} />
                                    </div>

                                    <div className="text-center">
                                        {
                                            createCourseRevisionResult.data ?
                                                <p className="alert alert-success">{createCourseRevisionResult.data.message}</p>
                                                : null
                                        }
                                        <button type="submit" className="btn btn-primary btn-lg">create course revision</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {redirect && <Navigate to={"/courses/" + courseId} />}
                </>
    )
}
