import React from 'react'

export default function UnitScoreItem({ data }) {
    return (
        <div className="card">
            <div className="card-header">
                <button 
                    className="btn shadow-none btn-block border-none text-left" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target={"#collapse" + data.unit.id}
                    aria-expanded="true" 
                    aria-controls={"collapse" + data.unit.id}
                >
                    <div className='d-flex justify-content-between'>
                        <span>  
                            {data.unit.name}
                        </span>
                        <span>  
                            {data.score}
                        </span>
                    </div>
                </button>
            </div>
            <div 
                id={"collapse" + data.unit.id}
                className="collapse" 
                aria-labelledby={"heading" + data.unit.id}
            >
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        {
                            data.unit.sections.length ? 
                                data.unit.sections.map(sectionScore => (
                                    <li className="list-group-item" key={sectionScore.section.id}>
                                        <div className='d-flex justify-content-between'>
                                            <span>  
                                                { sectionScore.section.name}
                                            </span>
                                            <span>  
                                                { sectionScore.score}
                                            </span>
                                        </div>
                                    </li>
                                ))
                            : <p className='alert'>student didn't pass any exam in this unit</p>
                        }
                    </ul>
                </div>
            </div>
        </div>
  )
}
