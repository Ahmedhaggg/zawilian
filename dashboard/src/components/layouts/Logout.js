import React from 'react'
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { destroyToken } from "../../services/storage";

export default function Logout({ color = null }) {
    let dispatch = useDispatch();

    let logoutHanlder = () => {
        dispatch(logout());
        destroyToken();
    }
    
    return (
        <button className="btn text-left nav-link text-white-color" style={{ color: color || "white"}} onClick={logoutHanlder}>logout</button>
    )
}
