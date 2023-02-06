import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../../context/GlobalContext'
import { logo } from '../../assets'
import { Button, TextInput } from '../../components'
import './LandingPage.scss'
import { useEffect } from 'react'

const LandingPage = ({ login, register }) => {
	const { user, getCurrentUser } = useGlobalContext()
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [passwordVisible, setPasswordVisible] = useState(false)
	const [confirmpasswordVisible, setConfirmpasswordVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({})

	useEffect(() => {
		if (user) {
			navigate('/home')
		}
	}, [user])

	const handleSubmit = (e) => {
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

		axios
			.post(register ? '/api/auth/register' : '/api/auth/login', data)
			.then(() => {
				getCurrentUser()
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

	return (
		<div className='landing page'>
			{!login && !register && (
				<div className='auth'>
					<img className='logo__large' src={logo} alt='logo' />
					<Button type='link' path='register' label='Create Account' />
				</div>
			)}

			{(register || login) && (
				<div className='auth'>
					<img className='logo__medium' src={logo} alt='logo' />
					<form className='auth__form' onKeyDown={(e) => handleKeyDown(e)}>
						<TextInput
							label='Username'
							value={username}
							setState={setUsername}
							loading={loading}
						/>
						{errors.name && <p className='auth__error'>{errors.username}</p>}
						{register && (
							<TextInput
								label='Email'
								value={email}
								setState={setEmail}
								loading={loading}
							/>
						)}
						{errors.email && <p className='auth__error'>{errors.email}</p>}
						<TextInput
							label='Password'
							value={password}
							setState={setPassword}
							loading={loading}
							passwordVisibility={passwordVisible}
							setPasswordVisibility={setPasswordVisible}
						/>
						{errors.password && (
							<p className='auth__error'>{errors.password}</p>
						)}
						{register && (
							<TextInput
								label='Confirm Password'
								value={confirmPassword}
								setState={setConfirmPassword}
								loading={loading}
								passwordVisibility={confirmpasswordVisible}
								setPasswordVisibility={setConfirmpasswordVisible}
							/>
						)}
						{errors.confirmPassword && (
							<p className='auth__error'>{errors.confirmPassword}</p>
						)}

						{register ? (
							<div className='auth__footer'>
								<span>Already a member? </span>
								<NavLink to='/login'>Login</NavLink>
							</div>
						) : (
							<div className='auth__footer'>
								<span>Not a member? </span>
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
			)}
		</div>
	)
}

export default LandingPage
