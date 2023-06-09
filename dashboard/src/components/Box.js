import React from "react";

export default function Box({ text, number, bgColor }) {
    return <div className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center mb-4">
        <div className={`text-decoration-none box ${bgColor} w-100 d-flex aligin-item-center justify-content-center align-items-center`}>
            <div>
                <p className="text-white mb-0 fs-3">{number}</p>
                <p className="text-white mt-2 fs-5">{text}</p>
            </div>
        </div>
    </div>;
}
