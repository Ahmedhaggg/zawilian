import React from "react";
import { useParams } from "react-router-dom";
import { useGetStudentQuery } from "../../store/studentSlice";

export default function Student() {
    let {id} = useParams();

    let { data } = useGetStudentQuery(id);
    console.log(data)
    return (
        "new student"
    )
}
