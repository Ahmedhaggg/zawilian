import React from "react";
// import { Link } from "react-router-dom";

export default function Pagination({ setOffset, numberOfPages, setPage }) {
    let handleClick = (offset, page) => {
        setOffset(offset);
        setPage(page)
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {
                    Array.from(Array(numberOfPages).keys()).map(page => (
                        <li className="page-item" key={page} onClick={() => handleClick(page * 10, page + 1)}>
                            <span className="page-link" to={page}>{page + 1}</span>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
}
