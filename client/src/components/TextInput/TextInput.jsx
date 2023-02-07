import React from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import './TextInput.scss'

const TextInput = ({
	label,
	value,
	setState,
	loading,
	passwordVisibility,
	setPasswordVisibility,
}) => {
	return (
		<div className='input'>
			<input
				className={`input__text ${value.length > 0 ? 'has-content' : ''}`}
				type={
					label.includes('Password')
						? !passwordVisibility
							? 'password'
							: 'text'
						: 'text'
				}
				value={value}
				onChange={(e) => setState(e.target.value)}
				disabled={loading}
			/>
			{passwordVisibility === true ? (
				<AiFillEye
					onClick={() => setPasswordVisibility((current) => !current)}
				/>
			) : passwordVisibility === false ? (
				<AiFillEyeInvisible
					onClick={() => setPasswordVisibility((current) => !current)}
				/>
			) : (
				<></>
			)}
			<label>{label}</label>
			<span className='focus-border'>
				<i></i>
			</span>
		</div>
	)
}

export default TextInput
