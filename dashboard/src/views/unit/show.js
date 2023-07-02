import React, { useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import PageLoading from "../../components/PageLoading";
import SectionHeader from "../../components/SectionHeader";
import { useGetUnitQuery } from "../../store/unitSlice";
import UnitContentTable from "../../components/unit/UnitContentTable";
import UnitExamForm from "../../components/unit/UnitExamForm";
import ExamPreview from "../../components/exam/ExamPreview"
export default function Unit() {
    let { courseId, unitId } = useParams();
    let { data, isSuccess, isLoading } = useGetUnitQuery({ courseId, unitId });
    // add unit Exam
    let [showAddExamForm, setShowAddExamForm] = useState(false);
    let [examIsAdded, setExamIsAdded] = useState(false);
    let [exam, setExam] = useState(null);
    return (
        isLoading ? <PageLoading /> :
            !isSuccess ?
                <Navigate to="/404" />
                :
                <div className="dashboard-section">
                    <SectionHeader text={data.unit.name + " unit" } />
                    <div>
                    <div className="d-flex justify-content-center align-items-center mb-2">
                        <div className="col-3">
                            <p className="text-main-light-color fs-4 mt-3 ms-3 text-left">content</p>
                        </div>
                        <div className="col-9 d-flex justify-content-end">
                            <div>
                                <Link 
                                    to={`/courses/${courseId}/units/${unitId}/lessons/create`} 
                                    className="p-2 text-decoration-none rounded bg-second-color text-white"
                                >new lesson</Link>
                            </div>
                            <div className="ml-3">
                                <Link 
                                    to={`/courses/${courseId}/units/${unitId}/revisions/create`} 
                                    className="p-2 text-decoration-none rounded bg-second-light-color text-white"
                                >new revision</Link>
                            </div>
                        </div> 
                    </div>  
                        {
                            data.unit.sections.length ? 
                                <UnitContentTable data={data.unit.sections} />
                            : <p className="alert alert-info units or revisions">unit doesn't contains lessons or revisions</p>
                        }
                    </div>
                    <div className="mt-4">
                        {
                            data.unit.exam || examIsAdded ? 
                                <div>
                                    <h4 className="text-center text-second-color">exam</h4>
                                    <ExamPreview exam={data.unit.exam || exam} />
                                </div>
                            :
                                <>
                                    {

                                        !showAddExamForm ? 
                                            <button className="btn btn-primary" onClick={() => setShowAddExamForm(true)}>add the exam to unit</button>
                                        :
                                            <UnitExamForm 
                                                courseId={courseId} 
                                                unitId={unitId} 
                                                setExamIsAdded={(exam) => {
                                                    setExamIsAdded(true) 
                                                    setExam(exam)
                                                }}
                                            />
                                    }
                                </>
                        }
                    </div>
                </div>
    );
}
