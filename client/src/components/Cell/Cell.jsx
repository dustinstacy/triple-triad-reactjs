import React from 'react'
import './Cell.scss'

const Cell = ({ id, handleClick }) => {
    return <div className='cell center' onClick={handleClick} id={id}></div>
}

export default Cell
