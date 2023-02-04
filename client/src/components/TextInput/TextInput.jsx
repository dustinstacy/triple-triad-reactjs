import React from 'react'

import './TextInput.scss'

const TextInput = ({ label, value, setState, loading }) => {
	return (
		<div className='input'>
			<input
				className={`input__text ${value.length > 0 ? 'has-content' : ''}`}
				type='text'
				value={value}
				onChange={(e) => setState(e.target.value)}
				disabled={loading}
			/>
			<label>{label}</label>
			<span className='focus-border'>
				<i></i>
			</span>
		</div>
	)
}

export default TextInput
