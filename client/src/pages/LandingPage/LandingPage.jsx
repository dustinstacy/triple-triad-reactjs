import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContext'
import { logo } from '../../assets'
import { Button, TextInput } from '../../components'
import './LandingPage.scss'

const LandingPage = ({ login, register }) => {
	const { user } = useGlobalContext()
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [passwordVisisble, setPasswordVisisble] = useState(false)
	const [confirmPasswordVisisble, setConfirmPasswordVisisble] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({})

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
		console.log(data)
	}

	return (
		<div className='landing page'>
			{!login && !register && (
				<div className='content'>
					<img className='logo__large' src={logo} alt='logo' />
					<Button
						id='button'
						type='link'
						path='register'
						label='Create Account'
					/>
				</div>
			)}

			{(register || login) && (
				<div className='content'>
					<img className='logo__medium' src={logo} alt='logo' />
					<form className='form'>
						<TextInput
							label='Username'
							value={username}
							setState={setUsername}
							loading={loading}
						/>
						{register && (
							<TextInput
								label='Email'
								value={email}
								setState={setEmail}
								loading={loading}
							/>
						)}
						<TextInput
							label='Password'
							value={password}
							setState={setPassword}
							loading={loading}
						/>
						{register && (
							<TextInput
								label='Confirm Password'
								value={confirmPassword}
								setState={setConfirmPassword}
								loading={loading}
							/>
						)}

						{register ? (
							<div className='form__footer'>
								<span>Already a member? </span>
								<NavLink to='/login'>Login</NavLink>
							</div>
						) : (
							<div className='form__footer'>
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
					/>
				</div>
			)}
		</div>
	)
}

export default LandingPage
