import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import PageLoading from "../../components/PageLoading";
import SectionHeader from "../../components/SectionHeader";
import { useGetUnitRevisionQuery, useUpdateUnitRevisionMutation } from "../../store/unitRevisionSlice";
import { useForm } from "react-hook-form"

export default function EditUnitRevision() {
    let [redirect, setRedirect] = useState(false);
    let { courseId, unitId, revisionId } = useParams();
    let getRevision = useGetUnitRevisionQuery({ unitId, revisionId });
    let [updateRevision, updateRevisionResult] = useUpdateUnitRevisionMutation();

    let { register, handleSubmit, formState: { errors } } = useForm();

    let submitHandler = (newRevisionData) => {
        updateRevision({ courseId, unitId, revisionId, newRevisionData })
    }

    useEffect(() => {
        let timeout;
        if (updateRevisionResult.isSuccess) {
            timeout = setTimeout(() => { setRedirect(true) }, 2000);
        }
        return () => clearTimeout(timeout);

    }, [updateRevisionResult]);

    return (
        getRevision.isLoading ? <PageLoading />
            : !getRevision.isSuccess ? <Navigate to="/404" />
                : (
                    <div className="dashboard-section">
                        <SectionHeader text="update Revision" />
                        <div className="row">
                            <div className="col-12 col-md-8 offset-md-2">
                                <form onSubmit={handleSubmit(submitHandler)}>
                                    <input className={`form-control form-control-lg mb-3 ${errors.name ? 'border-danger' : ''}`} type="text"
                                        placeholder="name" aria-label="name"
                                        defaultValue={getRevision.data.revision.name}
                                        {...register("name", { required: true })}
                                    />

                                    {
                                        updateRevisionResult.error?.data?.error?.errors?.name ?
                                            <div className="alert alert-danger">{updateRevisionResult.error.data.error.errors.name}</div> : null
                                    }

                                    <input className={`form-control form-control-lg mb-3 ${errors.description ? 'border-danger' : ''}`} type="text"
                                        placeholder="description" aria-label="description"
                                        defaultValue={getRevision.data.revision.description}
                                        {...register("description", { required: true })}
                                    />

                                    {
                                        updateRevisionResult.error?.data?.error?.errors?.video ?
                                            <div className="alert alert-danger">{updateRevisionResult.error.data.error.errors.video}</div> : null
                                    }

                                    <input className={`form-control form-control-lg mb-3 ${errors.video ? 'border-danger' : ''}`} type="text"
                                        placeholder="video" aria-label="video"
                                        defaultValue={getRevision.data.revision.video}
                                        {...register("video", { required: true })}
                                    />

                                    {
                                        updateRevisionResult.error?.data?.error?.errors?.video ?
                                            <div className="alert alert-danger">{updateRevisionResult.error.data.error.errors.video}</div> : null
                                    }

                                    <div className="text-center">
                                        {
                                            updateRevisionResult.data ?
                                                <p className="alert alert-success">{updateRevisionResult.data.message}</p>
                                                : updateRevisionResult.error?.data?.error?.errorName === "updateError" ?
                                                    <p className="alert alert-danger">{updateRevisionResult.error.data.error.message}</p>
                                                    : null
                                        }
                                        <button type="submit" className="btn btn-primary btn-lg">update Revision</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {redirect && <Navigate to={`/courses/${courseId}/units/${unitId}`} />}
                    </div>
                )
    );
}
