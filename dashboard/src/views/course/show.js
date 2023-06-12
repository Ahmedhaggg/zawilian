import React from "react";
import { Navigate, useParams } from "react-router-dom";
import PageLoading from "../../components/PageLoading";
import SectionHeader from "../../components/SectionHeader";
import { useGetCourseQuery } from "../../store/courseSlice";
import { Link } from "react-router-dom";
import CourseContentTable from "../../components/course/CourseContentTable";

export default function Course() {
    let { id } = useParams();
    let { data, isSuccess, isLoading } = useGetCourseQuery(id);
    console.log(data);
    return (
        isLoading ? <PageLoading /> :
            !isSuccess ?
                <Navigate to="/505" />
                :
                <div className="dashboard-section">
                    <SectionHeader text={"Course " + data.course.name} />
                    <div>
                    <div className="d-flex justify-content-center align-items-center mb-2">
                        <div className="col-3">
                            <p className="text-main-light-color fs-4 mt-3 ms-3 text-left">content</p>
                        </div>
                        <div className="col-9 d-flex justify-content-end">
                            <div>
                                <Link 
                                    to={"/courses/" + id + "/units/create"} 
                                    className="p-2 text-decoration-none rounded bg-second-color text-white"
                                >new unit</Link>
                            </div>
                            <div className="ml-3">
                                <Link 
                                    to={"/courses/" + id + "/revisions/create"} 
                                    className="p-2 text-decoration-none rounded bg-second-light-color text-white"
                                >new revision</Link>
                            </div>
                        </div> 
                    </div>
                        {
                            data.course.units.length || data.course.courseRevisions.length ? 
                                <CourseContentTable 
                                    data={[
                                        ...data.course.units.map(unit => ({ ...unit, type: "unit" }))
                                        , 
                                        ...data.course.courseRevisions.map(revision => ({ ...revision, type: "revision" }))
                                    ]} 
                                />
                            : <p className="alert alert-info units or revisions">course doesn't contains units or revisions</p>
                        }
                    </div>
                </div>
    );
}
