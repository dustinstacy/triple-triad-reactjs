import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import './TextInput.scss'

const TextInput = ({ label, name, value, onChange, loading, autofocus }) => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const isPasswordInput = label.includes('Password')

    const handleToggle = () => {
        setPasswordVisible((passwordVisible) => !passwordVisible)
    }

    const inputType = isPasswordInput && !passwordVisible ? 'password' : 'text'
    const EyeIcon = passwordVisible ? AiFillEye : AiFillEyeInvisible

    return (
        <div className='text-input'>
            <input
                type={inputType}
                id={name}
                className={`input ${value ? 'has-content' : ''}`}
                name={name}
                value={value}
                onChange={(e) => onChange(e)}
                disabled={loading}
                autoFocus={autofocus}
            />
            {isPasswordInput && (
                <EyeIcon onClick={handleToggle} data-testid='eye-icon' />
            )}
            <label htmlFor={name}>{label}</label>
            <span className='focus-border'>
                <i />
            </span>
        </div>
    )
}

export default TextInput
