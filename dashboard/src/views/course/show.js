import React, { useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import PageLoading from "../../components/PageLoading";
import SectionHeader from "../../components/SectionHeader";
import { useGetCourseQuery } from "../../store/courseSlice";
import Box from "../../components/Box";
import UnitTable from "../../components/course/UnitTable";
import CustomTable from "../../components/CustomTable";

export default function Course() {
    let { id } = useParams();
    let { data, isSuccess, isLoading } = useGetCourseQuery(id);
    useEffect(() => console.log(data), [data])
    return (
        isLoading ? <PageLoading /> :
            !isSuccess ?
                <Navigate to="/505" />
                :
                <div className="dashboard-section">
                    <SectionHeader text={"Course " + data.course.name} />
                    {/*<div className="row justify-content-center">
                        <Box text="units" number={data.course.numberOfUnits} bgColor="bg-second-color" />
                        <Box text="revisions" number={data.course.numberOfRevisions} bgColor="bg-success" />
    </div>*/}
                    <div>
                        <p className="text-main-color fs-3 mt-3">units</p>
                        {
                            data.course.units.length === 0 ?
                                <p className="alert alert-info w-50 mx-auto">no match units</p>
                                :
                                <CustomTable redirectPath={"/courses/" + id + "/units/"} data={data.course.units} linkItems={["name"]} bgColor="bg-main-color" />
                        }
                        <Link to={"/courses/" + id + "/units/create"} className="btn bg-main-color text-white">add new unit to course</Link>
                    </div>
                    <div>
                        <p className="text-second-color fs-3 mt-3">revisions</p>
                        {
                            data.course.revisions.length === 0 ?
                                <p className="alert alert-info">no match revisions</p>
                                :
                                <CustomTable redirectPath={"/courses/" + id + "/revisions/"} data={data.course.revisions} linkItems={["name"]} bgColor="bg-second-color" />
                        }
                        <Link to={"/courses/" + id + "/revisions/create"} className="btn btn-primary">add new revision to course</Link>
                    </div>
                </div>
    );
}
