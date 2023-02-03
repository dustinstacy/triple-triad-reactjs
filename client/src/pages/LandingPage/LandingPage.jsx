import React from 'react'
import { logo } from '../../assets'
import { Button, TextInput } from '../../components'
import './LandingPage.scss'

const LandingPage = () => {
	return (
		<div className='landing page'>
			<div className='content'>
				<img className='logo__large' src={logo} alt='logo' />
				<form className='form'>
					<TextInput label='Username' />
					<TextInput label='Email' />
					<TextInput label='Password' />
					<TextInput label='Confirm Password' />
				</form>
				<Button id='button' label='Create Account' />
			</div>
		</div>
	)
}

export default LandingPage
