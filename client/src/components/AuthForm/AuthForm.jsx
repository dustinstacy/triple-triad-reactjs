import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { useGlobalContext } from '../../context/GlobalContext'
import { Button, TextInput } from '../../components'
import './AuthForm.scss'

const AuthForm = ({ register }) => {
    const { getCurrentUser } = useGlobalContext()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        let data = {}
        if (register) {
            data = {
                username,
                email,
                password,
                confirmPassword,
            }
        } else {
            data = {
                username,
                password,
            }
        }
        await axios
            .post(register ? '/api/auth/register' : '/api/auth/login', data)
            .then(() => {
                getCurrentUser(), navigate('/home')
            })
            .catch((error) => {
                setLoading(false)
                if (error?.response?.data) {
                    setErrors(error.response.data)
                }
            })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
        }
    }

    const reset = () => {
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setLoading(false)
        setErrors({})
    }

    useEffect(() => {
        reset()
    }, [register])

    return (
        <div className='auth-form center'>
            <form className='form center' onKeyDown={(e) => handleKeyDown(e)}>
                <TextInput
                    label='Username'
                    value={username}
                    setState={setUsername}
                    loading={loading}
                    autofocus
                />
                {errors.username && (
                    <p className='form__error'>{errors.username}</p>
                )}
                {register && (
                    <TextInput
                        label='Email'
                        value={email}
                        setState={setEmail}
                        loading={loading}
                    />
                )}
                {errors.email && <p className='form__error'>{errors.email}</p>}
                <TextInput
                    label='Password'
                    value={password}
                    setState={setPassword}
                    loading={loading}
                />
                {errors.password && (
                    <p className='form__error'>{errors.password}</p>
                )}
                {register && (
                    <TextInput
                        label='Confirm Password'
                        value={confirmPassword}
                        setState={setConfirmPassword}
                        loading={loading}
                    />
                )}
                {errors.confirmPassword && (
                    <p className='form__error'>{errors.confirmPassword}</p>
                )}

                {Object.keys(errors).length > 0 && !register && (
                    <p className='form__error'>Nope. Try Again.</p>
                )}

                {register ? (
                    <div className='form__footer'>
                        <span>Already have an account? </span>
                        <NavLink to='/'>Login</NavLink>
                    </div>
                ) : (
                    <div className='form__footer'>
                        <span>Need an account? </span>
                        <NavLink to='/register'>Sign up</NavLink>
                    </div>
                )}
            </form>
            <Button
                label='Submit'
                type='submit'
                handleSubmit={handleSubmit}
                disabled={loading}
                onKeyDown
            />
        </div>
    )
}

export default AuthForm
