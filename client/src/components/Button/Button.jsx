import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Button.scss'

const Button = ({ label, type, path, handleSubmit, disabled }) => {
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()

        if (type === 'link') {
            navigate(`/${path}`)
        }

        if (type === 'submit') {
            handleSubmit(e)
        }
    }

    return (
        <div
            className='button'
            onClick={(e) => handleClick(e)}
            style={
                disabled
                    ? {
                          pointerEvents: 'none',
                          filter: 'grayscale(0.8) blur(.5px)',
                          opacity: '.9',
                      }
                    : {}
            }
        >
            <span>{label}</span>
        </div>
    )
}

export default Button
