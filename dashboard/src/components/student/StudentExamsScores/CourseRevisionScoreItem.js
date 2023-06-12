import React from 'react'

export default function CourseRevisionScoreItem({ data }) {
    return (
        <div className="card">
            <div className="card-header">
                <div className='d-flex justify-content-between'>
                    <span>  
                        {data.courseRevision.name}
                    </span>
                    <span>  
                        {data.score}
                    </span>
                </div>
            </div>
        </div>
    )
}
