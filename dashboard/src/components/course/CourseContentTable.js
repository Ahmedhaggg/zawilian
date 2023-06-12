import React from 'react'
import { useDeleteUnitMutation } from "../../store/unitSlice";
import { useDeleteCourseRevisionMutation } from "../../store/courseRevisionSlice";
import { useParams, Link } from 'react-router-dom';

export default function CourseContentTable({ data }) {
    let { id: courseId } = useParams();
    let [deleteUnit] =  useDeleteUnitMutation();
    let [deleteRevision] =  useDeleteCourseRevisionMutation();

    let deleteItem = (item) => {
        if (item.type === "unit")
            deleteUnit({ courseId, unitId: item.id });
        else
            deleteRevision({ courseId, revisionId: item.id  });
    }

    return (
        <table className="table bg-white">
            <thead className="bg-second-color text-light">
                <tr className="text-center">
                    <th>index</th>
                    <th>name</th>
                    <th>type</th>
                    <th>update</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr className={`text-center ${row.type === "unit"  ? "" : "bg-white-color"}`} key={row.id}>
                        <td data-title="index">
                            {index + 1}
                        </td>
                        <td data-title="unit">
                            <Link className="text-black-color text-decoration-none" to={`/courses/${courseId}/${row.type === "unit" ? "units/" : "revisions/" }${row.id}`}>{row.name}</Link>
                        </td>
                        <td data-title="arrangement">
                            {row.type}
                        </td>
                        <td data-title="update unit">
                            <Link 
                                to={`/courses/${courseId}/${row.type === "unit" ? "units/" : "revisions/" }${row.id}/edit`}
                                className="text-decoration-none">
                                update
                            </Link>
                        </td>
                        <td data-title="arrangement">
                            <button 
                                className="btn btn-danger"
                                onClick={()=> deleteItem(row)}
                                >delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
