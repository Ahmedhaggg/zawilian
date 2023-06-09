import React from "react";
import { Link } from "react-router-dom";

export default function CustomTable({ data, linkItems, redirectPath, bgColor }) {
    return (
        <table className="table bg-white">
            <thead className={`${bgColor || "bg-second-color"} text-light`}>
                <tr className="text-center">
                    {
                        Object.keys(data[0]).map(key => key !== "_id" ? <th>{key}</th> : null)
                    }
                    <th>update</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(item => (
                        <tr>
                            {
                                Object.keys(item).map(key => (
                                    key !== "_id" ?
                                        linkItems.find(link => link === key) ?
                                            <td data-title={key} className="fs-6">
                                                <Link className="text-black-color text-decoration-none" to={redirectPath + item._id}>{item[key]}</Link>
                                            </td>
                                            :
                                            <td data-title={key} className="fs-6">
                                                {item[key]}
                                            </td>
                                        : null
                                ))
                            }
                            <td data-title="update unit">
                                <Link to={redirectPath + item._id + "/edit"} className="text-decoration-none">
                                    update
                                </Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

{/* <tr className="text-center" key={bodyItem._id}>
    <td data-title="unit" className="fs-6">
        <Link className="text-black-color text-decoration-none" to={"/units/" + bodyItem._id}>{bodyItem.name}</Link>
    </td>
    <td data-title="arrangement" className="fs-6">
        {bodyItem.arrangement}
    </td>
    <td data-title="update unit">
        <Link to={"/units/" + bodyItem._id + "/edit"} className="text-decoration-none">
            update
        </Link>
    </td>
</tr> */}