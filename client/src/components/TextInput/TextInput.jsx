import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import './TextInput.scss'

const TextInput = ({ label, name, value, onChange, loading, autofocus }) => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const isPasswordInput = label.includes('Password')

    const handleToggle = () => {
        setPasswordVisible((passwordVisible) => !passwordVisible)
    }

    return (
        <div className='text-input'>
            <input
                type={isPasswordInput && !passwordVisible ? 'password' : 'text'}
                id={name}
                className={`input ${value ? 'has-content' : ''}`}
                name={name}
                value={value}
                onChange={(e) => onChange(e)}
                disabled={loading}
                autoFocus={autofocus}
            />
            {isPasswordInput &&
                (passwordVisible ? (
                    <AiFillEye onClick={() => handleToggle()} />
                ) : (
                    <AiFillEyeInvisible onClick={() => handleToggle()} />
                ))}
            <label>{label}</label>
            <span className='focus-border'>
                <i />
            </span>
        </div>
    )
}

export default TextInput
