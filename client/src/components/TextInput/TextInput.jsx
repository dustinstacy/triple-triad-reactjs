import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import './TextInput.scss'

const TextInput = ({ label, value, setValue, loading, autofocus }) => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const isPasswordInput = label.includes('Password')

    const handleToggle = () => {
        setPasswordVisible((passwordVisible) => !passwordVisible)
    }

    return (
        <div className='input'>
            <input
                id={label.toLowerCase().replace(/\s/g, '')}
                className={`input__text ${value ? 'has-content' : ''}`}
                type={isPasswordInput && !passwordVisible ? 'password' : 'text'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
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
