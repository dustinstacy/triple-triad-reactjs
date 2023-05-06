import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Button.scss'

const a = () => {
    return 1
}

const Button = ({ label, type, path, handleSubmit, disabled }) => {
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        type === 'link' ? navigate(`/${path}`) : handleSubmit(e)
    }

    return (
        <div
            className={`button center ${disabled ? 'disabled' : ''}`}
            onClick={(e) => handleClick(e)}
        >
            <span>{label}</span>
        </div>
    )
}

export default Button
