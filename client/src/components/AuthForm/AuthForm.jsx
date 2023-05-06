import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { useGlobalContext } from '../../context/GlobalContext'
import { Button, TextInput } from '../../components'
import './AuthForm.scss'

const AuthForm = ({ register }) => {
    const { getCurrentUser } = useGlobalContext()
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const { username, email, password, confirmPassword } = inputs

        const data = register
            ? { username, email, password, confirmPassword }
            : { username, password }

        try {
            await axios.post(
                register ? '/api/auth/register' : '/api/auth/login',
                data
            )

            await getCurrentUser().then(navigate('/home'))
        } catch (error) {
            if (error?.response?.data) {
                setErrors(error.response.data)
            }
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
        }
    }

    const reset = () => {
        setInputs({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        })
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
                    value={inputs.username}
                    setValue={(value) =>
                        setInputs((prevState) => ({
                            ...prevState,
                            username: value,
                        }))
                    }
                    loading={loading}
                    autofocus
                />
                {errors.username && (
                    <p className='form__error'>{errors.username}</p>
                )}
                {register && (
                    <>
                        <TextInput
                            label='Email'
                            value={inputs.email}
                            setValue={(value) =>
                                setInputs((prevState) => ({
                                    ...prevState,
                                    email: value,
                                }))
                            }
                            loading={loading}
                        />
                        {errors.email && (
                            <p className='form__error'>{errors.email}</p>
                        )}
                    </>
                )}
                <TextInput
                    label='Password'
                    value={inputs.password}
                    setValue={(value) =>
                        setInputs((prevState) => ({
                            ...prevState,
                            password: value,
                        }))
                    }
                    loading={loading}
                />

                {errors.password && (
                    <p className='form__error'>{errors.password}</p>
                )}
                {register && (
                    <>
                        {' '}
                        <TextInput
                            label='Confirm Password'
                            value={inputs.confirmPassword}
                            setValue={(value) =>
                                setInputs((prevState) => ({
                                    ...prevState,
                                    confirmPassword: value,
                                }))
                            }
                            loading={loading}
                        />
                        {errors.confirmPassword && (
                            <p className='form__error'>
                                {errors.confirmPassword}
                            </p>
                        )}
                    </>
                )}

                {Object.keys(errors).length > 0 && !register && (
                    <p className='form__error'>Nope. Try Again.</p>
                )}
                <div className='form__footer'>
                    <span>
                        {register
                            ? 'Already have an account? '
                            : 'Need an account? '}
                    </span>
                    <NavLink to={register ? '/' : '/register'}>
                        {register ? 'Login' : 'Sign up'}
                    </NavLink>
                </div>
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
