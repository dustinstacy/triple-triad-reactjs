import React from 'react'

import './TextInput.scss'

const TextInput = ({ label }) => {
	return (
		<div className='input'>
			<input className='input__text' type='text' />
			<label>{label}</label>
			<span className='focus-border'>
				<i></i>
			</span>
		</div>
	)
}

export default TextInput
