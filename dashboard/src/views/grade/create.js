import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader";
import { useCreateGradeMutation } from "../../store/gradeSlice";
import { useGetAllCoursesQuery } from "../../store/courseSlice"
import PageLoading from "../../components/PageLoading";

export default function CreateGrade() {
    let [redirect, setRedirect] = useState(false);
    let getCourses = useGetAllCoursesQuery();
    let [createGrade, createGradeResult] = useCreateGradeMutation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    let submitHandler = (values) => {
        createGrade(values)
    }

    useEffect(() => {
        let timeout;
        if (createGradeResult.isSuccess) {
            timeout = setTimeout(() => { setRedirect(true) }, 2000);
        }
        return () => clearTimeout(timeout);

    }, [createGradeResult]);

    return (
        <>
            {redirect && <Navigate to="/grades" />}

            {
                getCourses.isLoading ? <PageLoading />
                    : <>
                        {!getCourses.isSuccess ?
                            <Navigate to="/505" /> : <>
                                {
                                    getCourses.data.courses.length > 0 ?
                                        <div className="dashboard-section">
                                            <SectionHeader text="create grade" />
                                            <div className="row">
                                                <div className="col-12 col-md-8 offset-md-2">
                                                    <form onSubmit={handleSubmit(submitHandler)}>
                                                        <input className={`form-control form-control-lg mb-3 ${errors.name ? 'border-danger' : ''}`} type="text"
                                                            placeholder="name" aria-label="name"
                                                            {...register("name", { required: true })}
                                                        />

                                                        {
                                                            createGradeResult.error?.data?.error?.errors?.name ?
                                                                <div className="alert alert-danger">{createGradeResult.error.data.error.errors.name}</div> : null
                                                        }

                                                        <select className={`form-select form-select-lg mb-3 ${errors.currentCourse ? 'border-danger' : ''}`} aria-label="select currentCourse"
                                                            {...register("currentCourse", { required: true })}
                                                        >
                                                            {getCourses.data.courses.map(course => <option value={course._id} key={course._id}>{course.name}</option>)}
                                                        </select>

                                                        {
                                                            createGradeResult.error?.data?.error?.errors?.currentCourse ?
                                                                <p className="alert alert-danger">{createGradeResult.error.data.error.errors.currentCourse}</p> : null
                                                        }

                                                        <div className="text-center">
                                                            {
                                                                createGradeResult.data ?
                                                                    <p className="alert alert-success">{createGradeResult.data.message}</p>
                                                                    : null
                                                            }
                                                            <button type="submit" className="btn btn-primary btn-lg">create grade</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div> :
                                        <div className="d-flex align-items-center justify-content-center min-vh-100">
                                            <div className="text-center">
                                                <p>There are no courses to set up for the class. To create a course, press the button below</p>
                                                <Link to="/courses/create" className="btn btn-primary shadow-none">create course</Link>
                                            </div>
                                        </div>
                                }
                            </>
                        }
                    </>
            }
        </>
    )
}