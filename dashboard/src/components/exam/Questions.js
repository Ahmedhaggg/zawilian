import React, { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function Questions({ register, control, errors }) {
    // const { register, control, handleSubmit } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions"
    });
    useEffect(() => append(), [])
    return (
        <>
            <div>
                {fields.map((item, index) => (
                    <div key={item.id} className="mb-3">
                        <textarea
                            className={`form-control form-control-lg mb-3 ${errors[index]?.question ? 'border-danger' : ''}`} type="text"
                            placeholder="question" aria-label="question"
                            {...register(`questions[${index}][question]`, { required: true })}
                        ></textarea>
                        <input
                            className={`form-control form-control-lg mb-3 ${errors[index]?.question ? 'border-danger' : ''}`} type="text"
                            placeholder="question" aria-label="question"
                            {...register(`questions[${index}][question]`, { required: true })}
                        />
                        <div>
                            {
                                Array.from(Array(4), (element, i) => (
                                    <input
                                        key={i}
                                        className={`form-control form-control-lg mb-3 ps-4 ${errors[index]?.answers[i] ? 'border-danger' : ''}`} type="text"
                                        placeholder="question" aria-label="question"
                                        {...register(`questions[${index}][answers][${i}]`, { required: true })}
                                    />
                                ))
                            }
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <select 
                                    className={`form-select form-control-lg mb-3 ${errors.question ? 'border-danger' : ''}`} type="text"
                                    placeholder="correct answer" aria-label="correct answer"
                                    {...register(`questions[${index}][correctAnswer]`, { required: true })}
                                >
                                    {
                                        Array.from(Array(4), (element, i) => (
                                            <option value={i}>answer {i + 1}</option>
                                        ))
                                    }
                                </select>
                                {/* <input
                                    className={`form-control form-control-lg mb-3 ${errors.question ? 'border-danger' : ''}`} type="text"
                                    placeholder="correct answer" aria-label="correct answer"
                                    {...register(`questions[${index}][correctAnswer]`, { required: true })}
                                /> */}
                            </div>
                            <div className="col-4">
                                <div className="text-center">
                                    <button className="btn btn-danger" type="button" onClick={() => remove(index)}>delete question</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={() => append()}
                className="btn btn-primary mb-3"
            >
                add new question
            </button>
        </>
    );
}