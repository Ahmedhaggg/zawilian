import React, { useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import Box from "../../components/Box";
import PageLoading from "../../components/PageLoading";
import SectionHeader from "../../components/SectionHeader";
import { useGetUnitQuery } from "../../store/unitSlice";
import CustomTable from "../../components/CustomTable";

export default function Unit() {
    let { courseId, unitId } = useParams();

    let { data, isLoading, isSuccess } = useGetUnitQuery({ courseId, unitId });
    useEffect(() => console.log(data), [data])
    return (
        isLoading ? <PageLoading />
            : !isSuccess ? <Navigate to="/404" />
                : (
                    <div className="dashboard-section">
                        <SectionHeader text={data.unit.name} />
                        {/* <div className="row justify-content-center">
                            <Box text="units" number={data.unit.numberOfLessons} bgColor="bg-second-color" />
                            <Box text="revisions" number={data.unit.numberOfRevisions} bgColor="bg-success" />
                        </div> */}
                        <div>
                            <p className="text-second-color fs-3 mt-3">lessons</p>
                            {
                                data.unit.lessons.length === 0 ?
                                    <p className="alert alert-info w-100 mx-auto">no match lessons</p>
                                    :
                                    <CustomTable
                                        redirectPath={"/courses/" + courseId + "/units/" + unitId + "/lessons/"}
                                        data={data.unit.lessons}
                                        linkItems={["name"]}
                                    />
                            }
                            <Link to={"/courses/" + courseId + "/units/" + unitId + "/lessons/create"} className="btn bg-second-color text-white">add new lesson to unit</Link>
                        </div>
                        <div>
                            <p className="text-main-color fs-3 mt-3">revisions</p>
                            {
                                data.unit.revisions.length === 0 ?
                                    <p className="alert alert-info w-100 mx-auto">no match revisions</p>
                                    :
                                    <CustomTable redirectPath={"/courses/" + courseId + "/units/" + unitId + "/revisions/"} data={data.unit.revisions} linkItems={["name"]} />
                            }
                            <Link to={"/courses/" + courseId + "/units/" + unitId + "/revisions/create"} className="btn bg-main-color text-white">add new revision to unit</Link>
                        </div>
                    </div>

                )
    );
}
