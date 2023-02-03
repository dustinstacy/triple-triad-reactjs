import React from 'react'

import './TextInput.scss'

const TextInput = ({ label, value }) => {
	return (
		<div className='input'>
			<input className='input__text' type='text' value={value} />
			<label>{label}</label>
			<span className='focus-border'>
				<i></i>
			</span>
		</div>
	)
}

export default TextInput
