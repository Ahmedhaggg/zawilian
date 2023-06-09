import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "../../components/Box";
import PageLoading from "../../components/PageLoading";
import SectionHeader from "../../components/SectionHeader";
import { useGetGradeQuery } from "../../store/gradeSlice";

export default function Grade() {
    let { id } = useParams();
    let { data, isLoading, isSuccess } = useGetGradeQuery(id);
    useEffect(() => console.log("dddddd", data), [data])
    return <>
        {
            isLoading ? <PageLoading /> : <>
                {
                    isSuccess ?
                        <div className="dashboard-section">
                            <SectionHeader text={data.grade.name} />
                            <div className="row">
                                <Box text="grades" iconClass="fa-solid fa-graduation-cap" />
                                <Box text="courses" iconClass="fa-solid fa-microphone-lines" />
                                <Box text="students" iconClass="fa-solid fa-user-check" />
                                <Box text="applying students" iconClass="fa-solid fa-user-clock" />
                            </div>
                        </div>
                        : <></>
                }

            </>
        }
    </>;
}
