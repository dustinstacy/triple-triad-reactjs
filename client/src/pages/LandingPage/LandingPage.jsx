import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContext'
import { logo } from '../../assets'
import { Button, TextInput } from '../../components'
import './LandingPage.scss'

const LandingPage = ({ login, register }) => {
	const { user } = useGlobalContext()
	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [passwordVisisble, setPasswordVisisble] = useState(false)
	const [confirmPasswordVisisble, setConfirmPasswordVisisble] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({})

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

			{register && (
				<div className='content'>
					<img className='logo__medium' src={logo} alt='logo' />
					<form className='form'>
						<TextInput label='Username' />
						<TextInput label='Email' />
						<TextInput label='Password' />
						<TextInput label='Confirm Password' />
						<div className='form__footer'>
							<span>Already a member? </span>
							<NavLink to='/login'>Login</NavLink>
						</div>
					</form>
					<Button id='button' label='Submit' />
				</div>
			)}

			{login && (
				<div className='content'>
					<img className='logo__medium' src={logo} alt='logo' />
					<form className='form'>
						<TextInput label='Username' />
						<TextInput label='Password' />
						<div className='form__footer'>
							<span>Not a member? </span>
							<NavLink to='/register'>Sign up</NavLink>
						</div>
					</form>
					<Button id='button' label='Login' />
				</div>
			)}
		</div>
	)
}

export default LandingPage
