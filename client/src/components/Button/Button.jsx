import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Button.scss'

// Button component that can function as a navigation link or a custom onClick function.
// Set the prop 'type' to 'link' and provide a 'path' to navigate to a specific page.
// Set the prop 'onClick' to define a custom function to execute on button click.
const Button = ({ label, type, path, onClick, disabled }) => {
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        type === 'link' ? navigate(`/${path}`) : onClick(e)
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
