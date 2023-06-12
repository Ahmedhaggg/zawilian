import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { useCreateUnitRevisionMutation } from "../../store/unitRevisionSlice";
import SectionHeader from "../../components/SectionHeader";
import Questions from "../../components/exam/Questions";

export default function CreateUnitRevision() {
    let [redirect, setRedirect] = useState(false);
    let { courseId, unitId } = useParams();
    let [createUnitRevision, createUnitRevisionResult] = useCreateUnitRevisionMutation();
    let { register, handleSubmit, control, formState: { errors } } = useForm();

    useEffect(() => {
        let timeout;
        if (createUnitRevisionResult.isSuccess) {
            timeout = setTimeout(() => { setRedirect(true) }, 2000);
        }
        return () => clearTimeout(timeout);

    }, [createUnitRevisionResult]);

    let submitHandler = (newUnitRevisionData) => {
        createUnitRevision({
            courseId,
            unitId,
            newUnitRevisionData: {
                name: newUnitRevisionData.name,
                description: newUnitRevisionData.description,
                video: newUnitRevisionData.video,
                exam: {
                    questions: newUnitRevisionData.questions
                }
            }
        })
    }

    return (
        <div className="dashboard-section">
            <SectionHeader text="add revision to unit " />
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2">
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <input className={`form-control form-control-lg mb-3 ${errors.name ? 'border-danger' : ''}`} type="text"
                            placeholder="name" aria-label="name"
                            {...register("name", { required: true })}
                        />

                        {
                            createUnitRevisionResult.error?.data?.error?.errors?.name ?
                                <div className="alert alert-danger">{createUnitRevisionResult.error.data.error.errors.name}</div> : null
                        }

                        <textarea
                            className={`form-control form-control-lg mb-3 ${errors.description ? 'border-danger' : ''}`}
                            placeholder="description" aria-label="description"
                            {...register("description", { required: true })}
                        />

                        {
                            createUnitRevisionResult.error?.data?.error?.errors?.description ?
                                <div className="alert alert-danger">{createUnitRevisionResult.error.data.error.errors.description}</div> : null
                        }

                        <input className={`form-control form-control-lg mb-3 ${errors.video ? 'border-danger' : ''}`} type="text"
                            placeholder="video" aria-label="video"
                            {...register("video", { required: true })}
                        />

                        {
                            createUnitRevisionResult.error?.data?.error?.errors?.name ?
                                <div className="alert alert-danger">{createUnitRevisionResult.error.data.error.errors.name}</div> : null
                        }

                        <div className="exam">
                            <p className="text-start fs-5 text-second-color">exam</p>
                            <Questions register={register} control={control} errors={errors} />

                        </div>

                        <div className="text-center">
                            {
                                createUnitRevisionResult.data ?
                                    <p className="alert alert-success">{createUnitRevisionResult.data.message}</p>
                                    : null
                            }
                            <button type="submit" className="btn btn-primary btn-lg">create revision</button>
                        </div>
                    </form>
                </div>
            </div>
            {redirect && <Navigate to={"/courses/" + courseId + "/units/" + unitId} />}
        </div>
    )
}
