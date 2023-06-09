import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import PageLoading from "../../components/PageLoading";
import SectionHeader from "../../components/SectionHeader";
import { useGetCourseRevisionQuery, useUpdateCourseRevisionMutation } from "../../store/courseRevisionSlice";
import { useForm } from "react-hook-form"

export default function EditCourseRevision() {
    let [redirect, setRedirect] = useState(false);
    let { courseId, revisionId } = useParams();
    let getCourseRevision = useGetCourseRevisionQuery({ courseId, revisionId });
    let [updateCourseRevision, updateCourseRevisionResult] = useUpdateCourseRevisionMutation();

    let { register, handleSubmit, formState: { errors } } = useForm();

    let submitHandler = (newRevisionData) => {
        updateCourseRevision({ courseId, revisionId, newRevisionData })
    }

    useEffect(() => {
        console.log(updateCourseRevisionResult)
        let timeout;
        if (updateCourseRevisionResult.isSuccess) {
            timeout = setTimeout(() => { setRedirect(true) }, 2000);
        }
        return () => clearTimeout(timeout);

    }, [updateCourseRevisionResult]);

    return (
        getCourseRevision.isLoading ? <PageLoading />
            : !getCourseRevision.isSuccess ? <Navigate to="/404" />
                : (
                    <div className="dashboard-section">
                        <SectionHeader text="update Revision" />
                        <div className="row">
                            <div className="col-12 col-md-8 offset-md-2">
                                <form onSubmit={handleSubmit(submitHandler)}>
                                    <input className={`form-control form-control-lg mb-3 ${errors.name ? 'border-danger' : ''}`} type="text"
                                        placeholder="name" aria-label="name"
                                        defaultValue={getCourseRevision.data.revision.name}
                                        {...register("name", { required: true })}
                                    />

                                    {
                                        updateCourseRevisionResult.error?.data?.error?.errors?.name ?
                                            <div className="alert alert-danger">{updateCourseRevisionResult.error.data.error.errors.name}</div> : null
                                    }

                                    <input className={`form-control form-control-lg mb-3 ${errors.description ? 'border-danger' : ''}`} type="text"
                                        placeholder="description" aria-label="description"
                                        defaultValue={getCourseRevision.data.revision.description}
                                        {...register("description", { required: true })}
                                    />

                                    {
                                        updateCourseRevisionResult.error?.data?.error?.errors?.video ?
                                            <div className="alert alert-danger">{updateCourseRevisionResult.error.data.error.errors.video}</div> : null
                                    }

                                    <input className={`form-control form-control-lg mb-3 ${errors.video ? 'border-danger' : ''}`} type="text"
                                        placeholder="video" aria-label="video"
                                        defaultValue={getCourseRevision.data.revision.video}
                                        {...register("video", { required: true })}
                                    />

                                    {
                                        updateCourseRevisionResult.error?.data?.error?.errors?.video ?
                                            <div className="alert alert-danger">{updateCourseRevisionResult.error.data.error.errors.video}</div> : null
                                    }

                                    <div className="text-center">
                                        {
                                            updateCourseRevisionResult.data ?
                                                <p className="alert alert-success">{updateCourseRevisionResult.data.message}</p>
                                                : updateCourseRevisionResult.error?.data?.error?.errorName === "updateError" ?
                                                    <p className="alert alert-danger">{updateCourseRevisionResult.error.data.error.message}</p>
                                                    : null
                                        }
                                        <button type="submit" className="btn btn-primary btn-lg">update Revision</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {redirect && <Navigate to={`/courses/${courseId}`} />}
                    </div>
                )
    );
}
