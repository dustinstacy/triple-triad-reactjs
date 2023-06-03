import React from 'react'
import './Cell.scss'

const Cell = ({ id, handleClick, children }) => {
    return (
        <div className='cell center' onClick={handleClick} id={id}>
            {children}
        </div>
    )
}

export default Cell
