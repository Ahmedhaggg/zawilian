import React from "react";
import { Link } from "react-router-dom"
export default function RevisionTable({ tableHead, tableBody }) {
    return (
        <table className="table bg-white">
            <thead className="bg-second-color text-light">
                <tr className="text-center">
                    {tableHead.map(headItem => <th>{headItem}</th>)}
                </tr>
            </thead>
            <tbody>
                {tableBody.map(bodyItem => (
                    <tr className="text-center" key={bodyItem.id}>
                        <td data-title="unit" className="fs-6">
                            <Link className="text-black-color text-decoration-none" to={"/units/" + bodyItem.id}>{bodyItem.name}</Link>
                        </td>
                        <td data-title="arrangement" className="fs-6">
                            {bodyItem.arrangement}
                        </td>
                        <td data-title="update unit">
                            <Link to={"/units/" + bodyItem.id + "/edit"} className="text-decoration-none">
                                update
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
