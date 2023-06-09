import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader";
import { useGetGradeQuery, useUpdateGradeMutation } from "../../store/gradeSlice";
import { useGetAllCoursesQuery } from "../../store/courseSlice"
import PageLoading from "../../components/PageLoading";

export default function EditCourse() {
    let { id } = useParams();
    let [redirect, setRedirect] = useState(false);
    let getGrade = useGetGradeQuery(id)
    let getCourses = useGetAllCoursesQuery();
    let [updateGrade, updateGradeResult] = useUpdateGradeMutation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    let submitHandler = (newGradeData) => {
        updateGrade({ gradeId: id, newGradeData })
    }

    useEffect(() => {
        let timeout;
        if (updateGradeResult.isSuccess) {
            timeout = setTimeout(() => { setRedirect(true) }, 2000);
        }
        return () => clearTimeout(timeout);

    }, [updateGradeResult]);

    return (
        <>
            {redirect && <Navigate to="/grades" />}

            {
                getGrade.isLoading ? <PageLoading />
                    : <>
                        {!getGrade.isSuccess || !getCourses.isSuccess ?
                            <Navigate to="/404" /> : <>
                                {
                                    <div className="dashboard-section">
                                        <SectionHeader text={"update grade"} />
                                        <div className="row">
                                            <div className="col-12 col-md-8 offset-md-2">
                                                <form onSubmit={handleSubmit(submitHandler)}>
                                                    <input className={`form-control form-control-lg mb-3 ${errors.name ? 'border-danger' : ''}`} type="text"
                                                        placeholder="name" aria-label="name"
                                                        defaultValue={getGrade.data.grade.name}
                                                        {...register("name", { required: true })}
                                                    />

                                                    {
                                                        updateGradeResult.error?.data?.error?.errors?.name ?
                                                            <div className="alert alert-danger">{updateGradeResult.error.data.error.errors.name}</div> : null
                                                    }

                                                    <select className={`form-select form-select-lg mb-3 ${errors.currentCourse ? 'border-danger' : ''}`} aria-label="select currentCourse"
                                                        defaultValue={getGrade.data.grade.currentCourse._id}
                                                        {...register("currentCourse", { required: true })}
                                                    >
                                                        {getCourses.data.courses.map(course => <option value={course._id} key={course._id} >{course.name}</option>)}

                                                    </select>

                                                    {
                                                        updateGradeResult.error?.data?.error?.errors?.currentCourse ?
                                                            <p className="alert alert-danger">{updateGradeResult.error.data.error.errors.currentCourse}</p> : null
                                                    }


                                                    <div className="text-center">
                                                        {
                                                            updateGradeResult.error?.data?.error?.errorName === "updateError" ?
                                                                <p className="alert alert-danger">{updateGradeResult.error.data.error.message}</p>
                                                                : null
                                                        }
                                                        {
                                                            updateGradeResult.data ?
                                                                <p className="alert alert-success">{updateGradeResult.data.message}</p>
                                                                : null
                                                        }
                                                        <button type="submit" className="btn btn-primary btn-lg">update grade</button>
                                                    </div>
                                                </form>
                                            </div>
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