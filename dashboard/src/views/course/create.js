import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader";
import { useCreateCourseMutation } from "../../store/courseSlice"

export default function CreateCourse() {
    let [redirect, setRedirect] = useState(false);
    let [createCourse, createCourseResult] = useCreateCourseMutation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    let submitHandler = (values) => {
        createCourse(values)
    }

    useEffect(() => {
        let timeout;
        if (createCourseResult.isSuccess) {
            timeout = setTimeout(() => { setRedirect(true) }, 2000);
        }
        return () => clearTimeout(timeout);

    }, [createCourseResult]);

    return (
        <>
            <div className="dashboard-section">
                <SectionHeader text="create course" />
                <div className="row">
                    <div className="col-12 col-md-8 offset-md-2">
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <input className={`form-control form-control-lg mb-3 ${errors.name ? 'border-danger' : ''}`} type="text"
                                placeholder="name" aria-label="name"
                                {...register("name", { required: true })}
                            />

                            {
                                createCourseResult.error?.data?.error?.errors?.name ?
                                    <div className="alert alert-danger">{createCourseResult.error.data.error.errors.name}</div> : null
                            }

                            <div className="text-center">
                                {
                                    createCourseResult.data ?
                                        <p className="alert alert-success">{createCourseResult.data.message}</p>
                                        : null
                                }
                                <button type="submit" className="btn btn-primary btn-lg">create course</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {redirect && <Navigate to="/courses" />}
        </>
    )
}