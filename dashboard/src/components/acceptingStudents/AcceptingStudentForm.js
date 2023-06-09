import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useGetUnitQuery } from "../../store/unitSlice"
import { useCreateApplyingStudentMutation } from "../../store/applyingStudentSlice"
import { useParams } from 'react-router-dom';
import { capitalizeFirstLetter } from "../../services/helper"
export default function AcceptStudentForm({ course }) {
  let { id } = useParams()
  let { register, handleSubmit, getValues, watch , setValue, reset , formState: { errors } } = useForm({
    defaultValues: {
      nextUnit: "",
      nextLesson: "",
      nextUnitRevision: "",
      nextRevision: ""
    }
  });

  let selectedUnit =  watch("nextUnit");
  let selectedLesson = watch("nextLesson");
  let selectedUnitRevision = watch("nextUnitRevision");
  let selectedCourseRevision = watch("nextRevision");
  let fetchedUnit = useGetUnitQuery({ courseId: course._id, unitId: selectedUnit }, { skip: selectedUnit ? false : true })
  let [applyStudent, applyingStudentResult] = useCreateApplyingStudentMutation() 
  
  let submitHandler = (values) => {
    let applyingStudentData = {};

    console.log(values)
  }
  console.log(course)

  let handleChangeSelect = (event, field) => {
    let fieldName = capitalizeFirstLetter(field);
    let data = {};
    if (field == "unit")
      data = course.units.find(unit => unit._id === event.target.value);
    else if (field === "lesson")
      data = fetchedUnit.data.unit.lessons.find(lesson => lesson._id === event.target.value);
    else if (field === "unitRevisions")
      data = fetchedUnit.data.unit.revisions.find(revision => revision._id === event.target.value);
    else if (field === "revision")
      data = course.revisions.find(revision => revision._id === event.target.value);
    
    let fieldValue = {};
    fieldValue[`${field}Id`] = data._id;
    fieldValue[`arrangement`] = data.arrangement;
    console.log("this is field value", fieldValue)
    setValue(`next${fieldName}`, fieldValue);
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="text-start">
      <select 
        className={`form-select form-select-lg mb-3`}
        aria-label="select unit"
        {...register("nextUnit", { required: selectedCourseRevision ? false : true})}
        onChange={(e) => {
          reset({
            nextUnit: "",
            nextLesson: "",
            nextUnitRevision: "",
            nextRevision: ""
          })
          setValue("nextUnit", e.target.value)
        }}
        disabled={selectedCourseRevision ? true : false}
      >
        <option value="">Please select unit progress</option>
        {
          course.units.map(
            unit => (
              <option 
                value={unit._id} 
                key={unit._id}
              >{unit.name}</option>)
          )
        }
      </select>
        {
          fetchedUnit.isSuccess && (
            <>
              <select 
                className={`form-select form-select-lg mb-3`} 
                aria-label="select unit"
                {...register("nextLesson", { required: selectedUnit ? true : false })}
                onChange={(e) => setValue("nextLesson", e.target.value)}
                disabled={selectedUnitRevision || fetchedUnit.data.unit.lessons.length == 0 ? true : false}
              >
                <option value="">Please select lesson progress</option>
                {
                  fetchedUnit.data.unit.lessons.map(lesson => (
                    <option 
                      value={lesson._id} 
                      key={lesson._id}
                    >{lesson.name}</option>
                  ))
                }
              </select>
              <select 
                className={`form-select form-select-lg mb-3`} 
                aria-label="select unit"
                {...register("nextUnitRevision", { required: selectedUnit ? true : false })}
                onChange={(e) => setValue("nextUnitRevision", e.target.value)}
                disabled={selectedLesson || fetchedUnit.data.unit.revisions.length == 0? true : false}
              >
                <option value="">Please select unit revision progress</option>
                {
                  fetchedUnit.data.unit.revisions.map(revision => 
                    (
                      <option 
                        value={revision._id} 
                        key={revision._id}
                      >{revision.name}</option>
                    )
                  )
                }
              </select>
            </>
          )
        }
      <select 
        className={`form-select form-select-lg mb-3`} 
        aria-label="select unit"
        {...register("nextRevision", { required: selectedUnit ? false : true})}
        onChange={(e) => setValue("nextRevision", e.target.value)}
        disabled={selectedUnit ? true : false}
      >
        <option value="">Please select course revision progress</option>
        {
          course.revisions.map(revision => (
            <option 
              value={revision._id} 
              key={revision._id}
            >{revision.name}</option>
          ))
        }
      </select>
      <div className="text-center">
        {/* {
            createGradeResult.data ?
                <p className="alert alert-success">{createGradeResult.data.message}</p>
                : null
        } */}
        <button 
          type="submit" 
          className="btn btn-primary btn-lg" 
          disabled={
            selectedUnit && selectedLesson ? false 
              : selectedUnit && selectedUnitRevision ? false 
              : selectedCourseRevision ? false : true   
          }
        >apply student</button>
      </div>
        {/* {
          createGradeResult.error?.data?.error?.errors?.currentCourse ?
              <p className="alert alert-danger">{createGradeResult.error.data.error.errors.currentCourse}</p> : null
        } */}
    </form>
  )
}
