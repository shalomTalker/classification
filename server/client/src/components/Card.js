import React from 'react'

const Card = ({title,stats,icon}) => {
  return (
    <div>
          <div className="card-comp card-header card-header-success card-header-icon bg-light" >
              <div className="card-icon bg-primary"> <i style={{ fontSize: '30px' }} className={`fas fa-${icon}`}></i></div>
              <p className="card-category">{title}</p>
              <h3 className="card-title">{stats}</h3>
          </div>
    </div>
  )
}
export default Card