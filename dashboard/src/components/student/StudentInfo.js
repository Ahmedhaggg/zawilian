import React from 'react'

export default function StudentInfo({ info }) {
  return (
        <ul className="list-group">
            <li className="list-group-item">
                <div className="row py-2 ">
                    <div className="col-3">name</div>
                    <div className="col-9 text-center">{info.name}</div>
                </div>
            </li>
            <li className="list-group-item">
                <div className="row py-2 ">
                    <div className="col-3">email</div>
                    <div className="col-9 text-center">{info.email}</div>
                </div>
            </li>
            <li className="list-group-item">
                <div className="row py-2 ">
                    <div className="col-3">phone</div>
                    <div className="col-9 text-center">{info.phoneNumber}</div>
                </div>
            </li>
            <li className="list-group-item">
                <div className="row py-2">
                    <div className="col-3">grade</div>
                    <div className="col-9 text-center">{info.grade.name}</div>
                </div>
            </li>
        </ul>
  )
}
