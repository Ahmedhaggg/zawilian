import React from 'react'
import { useDeleteLessonMutation } from "../../store/lessonSlice";
import { useDeleteUnitRevisionMutation } from "../../store/unitRevisionSlice";
import { useParams, Link } from 'react-router-dom';

export default function LessonContentTable({ data }) {
    let { courseId, unitId } = useParams();
    let [deletelesson] =  useDeleteLessonMutation();
    let [deleteRevision] =  useDeleteUnitRevisionMutation();

    let deleteItem = (item) => {
        if (item.type === "lesson")
            deletelesson({ courseId, unitId, lessonId: item.id });
        else
            deleteRevision({ courseId, unitId, revisionId: item.id  });
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
                    <tr className={`text-center ${row.type === "lesson"  ? "" : "bg-white-color"}`} key={row.id}>
                        <td data-title="index">
                            {index + 1}
                        </td>
                        <td data-title="lesson">
                            <Link 
                              className="text-black-color text-decoration-none" 
                              to={`/courses/${courseId}/units/${unitId}/${row.type === "lesson" ? "lessons/" : "revisions/" }${row.id}`}>{row.name}</Link>
                        </td>
                        <td data-title="arrangement">
                            {row.type}
                        </td>
                        <td data-title="update lesson">
                            <Link 
                                to={`/courses/${courseId}/units/${unitId}/${row.type === "lesson" ? "lessons/" : "revisions/" }${row.id}/edit`}
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
