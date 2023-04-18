import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../../context/GlobalContext'
import { Button, TextInput } from '../../components'
import { logo } from '../../assets/logos'
import './LandingPage.scss'

const LandingPage = ({ login, register }) => {
	const { user, getCurrentUser, getAllCards, getUserCards } = useGlobalContext()
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [passwordVisible, setPasswordVisible] = useState(false)
	const [confirmpasswordVisible, setConfirmpasswordVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({})
	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	})

	const handleResize = () => {
		setDimensions({
			height: window.innerHeight,
			width: window.innerWidth,
		})
	}

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
				getCurrentUser(), getAllCards(), getUserCards()
			})
			.catch((error) => {
				setLoading(false)
				if (error?.response?.data) {
					setErrors(error.response.data)
				}
			})
		navigate('/home')
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
	}, [login, register])

	useEffect(() => {
		window.addEventListener('resize', handleResize, false)
	}, [])

	return (
		<div className='landing page'>
			{!login && !register && (
				<div className='auth box'>
					<img className='logo__large' src={logo} alt='logo' />
					<Button type='link' path='register' label='Create Account' />
				</div>
			)}

			{(register || login) && (
				<div className='auth box'>
					<img className='logo__medium' src={logo} alt='logo' />
					<form className='auth__form' onKeyDown={(e) => handleKeyDown(e)}>
						<TextInput
							label='Username'
							value={username}
							setState={setUsername}
							loading={loading}
						/>
						{errors.username && (
							<p className='auth__error'>{errors.username}</p>
						)}
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

						{Object.keys(errors).length > 0 && (
							<p className='auth__error'>
								{register
									? "Something's not right. Try again."
									: 'Nope. Try again.'}
							</p>
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
						handleClick={handleSubmit}
						disabled={loading}
						onKeyDown
					/>
				</div>
			)}
			{dimensions.width > 1200 &&
			dimensions.height !== window.screen.availHeight ? (
				<div className='tip__fullscreen'>
					*Press F11 for fullscreen experience.
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default LandingPage
