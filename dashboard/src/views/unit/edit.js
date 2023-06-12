import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import PageLoading from "../../components/PageLoading";
import SectionHeader from "../../components/SectionHeader";
import { useGetUnitQuery, useUpdateUnitMutation } from "../../store/unitSlice";

export default function EditUnit() {
    let { courseId, unitId } = useParams();
    let getUnit = useGetUnitQuery({ courseId, unitId });
    let [redirect, setRedirect] = useState(false);
    let [UpdateUnit, UpdateUnitResult] = useUpdateUnitMutation();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    let submitHandler = (newUnitData) => {
        UpdateUnit({
            courseId,
            unitId,
            newUnitData
        })
    }

    useEffect(() => {
        let timeout;
        if (UpdateUnitResult.isSuccess) {
            timeout = setTimeout(() => { setRedirect(true) }, 2000);
        }
        return () => clearTimeout(timeout);

    }, [UpdateUnitResult]);

    return (
        getUnit.isLoading ? <PageLoading />
            : !getUnit.isSuccess ? <Navigate to="/404" />
                :
                <>
                    <div className="dashboard-section">
                        <SectionHeader text="update course unit" />
                        <div className="row">
                            <div className="col-12 col-md-8 offset-md-2">
                                <form onSubmit={handleSubmit(submitHandler)}>
                                    <input className={`form-control form-control-lg mb-3 ${errors.name ? 'border-danger' : ''}`} type="text"
                                        placeholder="name" aria-label="name"
                                        {...register("name", { required: true })}
                                        defaultValue={getUnit.data.unit.name}
                                    />
                                    {
                                        UpdateUnitResult.error?.data?.error?.errors?.name ?
                                            <div className="alert alert-danger">{UpdateUnitResult.error.data.error.errors.name}</div> : null
                                    }

                                    <textarea className={`form-control form-control-lg mb-3 ${errors.name ? 'border-danger' : ''}`}
                                        placeholder="description" aria-label="description"
                                        {...register("description", { required: true })}
                                        defaultValue={getUnit.data.unit.description}
                                    ></textarea>
                                    {
                                        UpdateUnitResult.error?.data?.error?.errors?.description ?
                                            <div className="alert alert-danger">{UpdateUnitResult.error.data.error.errors.description}</div> : null
                                    }

                                    <div className="text-center">
                                        {
                                            UpdateUnitResult.error?.data?.error?.message ? <p className="alert alert-danger">{UpdateUnitResult.error.data.error.message}</p> : null
                                        }
                                        {
                                            UpdateUnitResult.data ?
                                                <p className="alert alert-success">{UpdateUnitResult.data.message}</p>
                                                : null
                                        }
                                        <button type="submit" className="btn btn-primary btn-lg">update unit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {redirect && <Navigate to={"/courses/" + courseId} />}
                </>
    )
}
