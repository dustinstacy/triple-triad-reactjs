import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Button.scss'

const Button = ({ label, type, path, handleSubmit, disabled }) => {
	const navigate = useNavigate()

	const handleClick = (e) => {
		e.preventDefault()

		if (type === 'link') {
			navigate(`/${path}`)
		}

		if (type === 'submit') {
			handleSubmit(e)
		}
	}

	return (
		<div
			className='button'
			onClick={(e) => handleClick(e)}
			style={disabled ? { pointerEvents: 'none', opacity: '0.5' } : {}}
		>
			<span>{label}</span>
		</div>
	)
}

export default Button
