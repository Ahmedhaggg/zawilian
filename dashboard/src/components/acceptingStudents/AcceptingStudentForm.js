import React from 'react'
import { useForm } from 'react-hook-form'
import { useGetUnitQuery } from "../../store/unitSlice"
import { useAcceptApplyingStudentMutation } from "../../store/applyingStudentSlice"
import { useParams } from 'react-router-dom';
import { useGetCourseQuery } from '../../store/courseSlice';
import PageLoading from '../PageLoading';
import { Navigate } from "react-router-dom"
export default function AcceptStudentForm({ courseId }) {
  let { id } = useParams();

  let { data: courseData, isSuccess: courseIsSuccessLoading }  = useGetCourseQuery(courseId)
  
  let { register, handleSubmit, watch , setValue, reset , formState: { errors } } = useForm({
    defaultValues: {
      startUnitId: "",
      startSectionId: "",
    }
  });
  let startUnitId = watch("startUnitId");
  let startSectionId = watch("startSectionId");

  let { data: selectedUnitData } = useGetUnitQuery({ courseId: courseId, unitId: startUnitId }, { skip: startUnitId ? false : true })
  
  
  let [acceptApplyingStudent, acceptApplyingStudentResult] = useAcceptApplyingStudentMutation() 
  
  const submitHandler = (values) => {
    let selectedSectionArrangement = values.startSectionId ? selectedUnitData.unit.sections
      .find(section => section.id ===  parseInt(values.startSectionId)).arrangement : 1

    acceptApplyingStudent({ 
      studentId: id, 
      acceptingStudentData: {
        startUnitArrangement: selectedUnitData?.unit.arrangement  || 1,
        startSectionArrangement: selectedSectionArrangement
      }
    })
  }

  return (
    courseIsSuccessLoading ? 
      <div>
        <h4 className='h4 mb-3'>course starting</h4>
        <form onSubmit={handleSubmit(submitHandler)} className="text-start">
          <select 
            className={`form-control form-control-lg mb-3`}
            aria-label="select unit"
            {...register("startUnitId", { required: courseData.course.units.length ? true : false})}
            onChange={(e) => {
              reset({
                startUnitId: "",
                startSectionId: "",
              })
              setValue("startUnitId", e.target.value)
              setValue("startUnitId", e.target.value)
            }}
          >
            <option value="">please select unit which student study from it</option>
            {
              courseData.course.units.map(
                unit => (
                  <option 
                    value={unit.id} 
                    key={unit.id}
                  >{unit.name}</option>)
              )
            }
          </select>
          <select 
            className={`form-control form-control-lg mb-3`} 
            aria-label="select start section"
            {...register("startSectionId", { required: selectedUnitData?.unit?.sections.length  ? true : false })}
            onChange={(e) => setValue("startSectionId", e.target.value)}
            disabled={ startUnitId && selectedUnitData?.unit?.sections.length ? false : true}
          >
            <option value="">Please select start section in unit</option>
            {
              selectedUnitData?.unit.sections.map(section => (
                <option 
                  value={section.id} 
                  key={section.id}
                >{section.name} {section.type}</option>
              ))
            }
          </select>
          <div className="text-center">
            <button 
              type="submit"
              className="btn btn-primary btn-lg" 
              disabled={
                !courseData.course.units.length ? false : 
                startUnitId && !selectedUnitData?.unit?.sections.length ?  false :
                startUnitId && startSectionId ? false : true  
              }
            >accept</button>
          </div>
        </form>
        { acceptApplyingStudentResult.isSuccess &&  <Navigate to={"/students/" + id }/> }
      </div>
    : <PageLoading />
  )
}
