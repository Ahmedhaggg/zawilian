import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { destroyToken } from "../../services/storage";

export default function Sidebar() {
    let store = useSelector(state => state);
    let dispatch = useDispatch();

    let logoutHanlder = () => {
        dispatch(logout());
        destroyToken();
    }
    
    return <div className="bg-main-color">
        <p className="fs-4 ps-3 pt-5 text-white-color">chemistry</p>
        <nav className="h-100 flex-column align-items-stretch ps-2">
            <nav className="nav nav-pills flex-column">
                <Link className="nav-link text-white-color" to="/">Dashboard</Link>
                <Link className="nav-link text-white-color" to="/grades">grades</Link>
                <Link className="nav-link text-white-color" to="/courses">courses</Link>
                <Link className="nav-link text-white-color" to="/students">students</Link>
                <Link className="nav-link text-white-color" to="/applying-students">applying students</Link>
                <button className=" text-start nav-link text-white-color" onClick={logoutHanlder}>logout</button>

                {/* <nav className="nav nav-pills flex-column">
                    <Link className="nav-link text-white-color ms-3 my-1" to="/students">accepted students</Link>
                    <Link className="nav-link text-white-color ms-3 my-1" to="/non-accepted/students">non accepted students</Link>
                </nav> */}
            </nav>
        </nav>
    </div>;
}
