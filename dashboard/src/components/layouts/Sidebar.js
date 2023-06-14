import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function Sidebar() {
    return <div className="bg-main-color">
        <div className="pl-3 pt-5 mb-2">
            <Link to="/" className="h5 text-decoration-none text-white">zawilian</Link>
        </div>
        <nav className="h-100 flex-column align-items-stretch pl-2">
            <nav className="nav nav-pills flex-column">
                <Link className="nav-link text-white-color" to="/">Dashboard</Link>
                <Link className="nav-link text-white-color" to="/grades">grades</Link>
                <Link className="nav-link text-white-color" to="/courses">courses</Link>
                <Link className="nav-link text-white-color" to="/students">students</Link>
                <Link className="nav-link text-white-color" to="/applying-students">applying students</Link>
                <Logout />
            </nav>
        </nav>
    </div>;
}
