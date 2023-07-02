import React, { useEffect } from 'react'
import Questions from '../exam/Questions'
import { useForm } from "react-hook-form"
import { useAddExamToUnitMutation } from '../../store/unitSlice';
export default function UnitExamForm({ courseId, unitId, setExamIsAdded }) {
  let [addExamToUnit, addExamToUnitResult] = useAddExamToUnitMutation();
  let { register, handleSubmit, control, formState: { errors }, getValues } = useForm();
  
  const submitHandler = (values) => {
    addExamToUnit({ courseId, unitId, newExamData: values })
  }
  useEffect(() => {
    if (addExamToUnitResult.isSuccess)
      setExamIsAdded(getValues())
  }, [addExamToUnitResult]);

  return (
    <div className="exam">
      <p className="text-start fs-5 text-second-color">add Exam</p>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <Questions register={register} control={control} errors={errors} />
        </div>
        <button className='btn btn-primary' type='submit'>save exam</button>
      </form>
    </div>
  )
}
