import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-md-none d-block py-3">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">zawilian</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className='nav-link' to="/courses">courses</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/grades">grades</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/students">students</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/applying-students">applying students</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
