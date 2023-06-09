import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import PageLoading from "../../components/PageLoading";
import SectionHeader from "../../components/SectionHeader";
import {  useCreateUnitMutation } from "../../store/unitSlice";

export default function CreateUnit() {
    let { courseId } = useParams();
    let [redirect, setRedirect] = useState(false);
    let [createUnit, createUnitResult] = useCreateUnitMutation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    let submitHandler = (newUnitData) => {
        createUnit({
            courseId,
            newUnitData
        })
    }

    useEffect(() => {
        let timeout;
        if (createUnitResult.isSuccess) {
            timeout = setTimeout(() => { setRedirect(true) }, 2000);
        }
        return () => clearTimeout(timeout);

    }, [createUnitResult]);

    return (
                <>
                    <div className="dashboard-section">
                        <SectionHeader text="addUnit to course " />
                        <div className="row">
                            <div className="col-12 col-md-8 offset-md-2">
                                <form onSubmit={handleSubmit(submitHandler)}>
                                    <input className={`form-control form-control-lg mb-3 ${errors.name ? 'border-danger' : ''}`} type="text"
                                        placeholder="name" aria-label="name"
                                        {...register("name", { required: true })}
                                    />

                                    {
                                        createUnitResult.error?.data?.error?.errors?.name ?
                                            <div className="alert alert-danger">{createUnitResult.error.data.error.errors.name}</div> : null
                                    }

                                    <div className="text-center">
                                        {
                                            createUnitResult.data ?
                                                <p className="alert alert-success">{createUnitResult.data.message}</p>
                                                : null
                                        }
                                        <button type="submit" className="btn btn-primary btn-lg">create unit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {redirect && <Navigate to={"/courses/" + courseId} />}
                </>
    )
}
