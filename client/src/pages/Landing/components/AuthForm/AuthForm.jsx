import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { useGlobalContext } from '@context'
import { Button, TextInput } from '@components'
import './AuthForm.scss'

// The register prop is used to toggle between login and signup form
const AuthForm = ({ register }) => {
    const { getCurrentUser } = useGlobalContext()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    // Define the form fields to be rendered based on the value of register prop
    const formFields = ['Username', 'Password']
    if (register) {
        formFields.splice(1, 0, 'Email')
        formFields.splice(3, 0, 'Confirm Password')
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // Deconstruct the formData object to extract values needed for the POST request
        const { username, email, password, confirmPassword } = formData

        // Set the data object based on the value of register prop
        const data = register
            ? { username, email, password, confirmPassword }
            : { username, password }

        try {
            // Send a POST request to the appropriate endpoint based on the value of register prop
            await axios.post(
                register ? '/api/auth/register' : '/api/auth/login',
                data
            )

            await getCurrentUser().then(navigate('/'))
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
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        })
        setLoading(false)
        setErrors({})
    }

    // Reset the form data, loading state, and errors when the register prop changes
    useEffect(() => {
        reset()
    }, [register])

    // This function takes in a string and converts it to CamelCase format
    // This capability is used to map TextInput elements to their corresponding labels
    const toCamelCase = (str) => {
        return str
            .replace(/\s(.)/g, function (a) {
                return a.toUpperCase()
            })
            .replace(/\s/g, '')
            .replace(/^(.)/, function (b) {
                return b.toLowerCase()
            })
    }

    return (
        <div className='auth-form center'>
            <form className='form center' onKeyDown={(e) => handleKeyDown(e)}>
                {formFields.map((field) => (
                    <React.Fragment key={field}>
                        <TextInput
                            label={field}
                            name={toCamelCase(field)}
                            value={formData[toCamelCase(field)]}
                            onChange={handleInputChange}
                            loading={loading}
                            autofocus={field === 'Username'}
                        />
                        {errors[toCamelCase(field)] && (
                            <p className='form__error'>
                                {errors[toCamelCase(field)]}
                            </p>
                        )}
                    </React.Fragment>
                ))}

                {Object.keys(errors).length > 0 && !register && (
                    <p className='form__error'>Nope. Try Again.</p>
                )}
                <div className='form__footer'>
                    <span>
                        {register
                            ? 'Already Have An Account? '
                            : 'Need An AccOunt? '}
                    </span>
                    <NavLink to={register ? '/login' : '/register'}>
                        {register ? 'Login' : 'Sign up'}
                    </NavLink>
                </div>
            </form>
            <Button
                label='Submit'
                type='submit'
                onClick={handleSubmit}
                disabled={loading}
                onKeyDown
            />
        </div>
    )
}

export default AuthForm