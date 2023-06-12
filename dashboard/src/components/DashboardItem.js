import React from "react";
import { Link } from "react-router-dom";


export default function DashboardItem({ text, iconClass, link }) {
    return <div className="col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center mb-4">
        <Link to={link} className="text-decoration-none dashboard-item bg-light w-100 d-flex aligin-item-center justify-content-center align-items-center">
            <div>
                <i className={`text-second-color ${iconClass} fa-2x`}></i>
                <p className="text-black-color mt-2">{text}</p>
            </div>
        </Link>
    </div>;
}
