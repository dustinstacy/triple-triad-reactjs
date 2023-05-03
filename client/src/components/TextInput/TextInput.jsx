import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import './TextInput.scss'

const TextInput = ({ label, value, setState, loading, autofocus }) => {
    const [passwordVisible, setPasswordVisible] = useState(false)

    return (
        <div className='input'>
            <input
                className={`input__text ${
                    value.length > 0 ? 'has-content' : ''
                }`}
                type={
                    label.includes('Password') && !passwordVisible
                        ? 'password'
                        : 'text'
                }
                value={value}
                onChange={(e) => setState(e.target.value)}
                disabled={loading}
                autoFocus={autofocus}
            />
            {label.includes('Password') &&
                (passwordVisible ? (
                    <AiFillEye
                        onClick={() =>
                            setPasswordVisible((current) => !current)
                        }
                    />
                ) : (
                    <AiFillEyeInvisible
                        onClick={() =>
                            setPasswordVisible((current) => !current)
                        }
                    />
                ))}

            <label>{label}</label>
            <span className='focus-border'>
                <i></i>
            </span>
        </div>
    )
}

export default TextInput
