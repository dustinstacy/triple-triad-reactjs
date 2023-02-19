import React from 'react'
import { useSettingsContext } from '../../context/SettingsContext'
import {
	Neutral,
	Earth,
	Fire,
	Water,
	Wind,
	Ice,
	Lightning,
	Holy,
	Dark,
	Universal,
} from '../../assets'
import './Cell.scss'

const Cell = ({ id, handleClick, element }) => {
	const { elements } = useSettingsContext()
	const imageArray = [
		Neutral,
		Earth,
		Fire,
		Water,
		Wind,
		Ice,
		Lightning,
		Holy,
		Dark,
		Universal,
	]
	const addElement = () => {
		if (elements && element) {
			let source = imageArray.find((image) =>
				image.includes(element.toLowerCase())
			)
			return <img className='element' src={source} alt={element} />
		}
	}

	return (
		<div className='cell' value={element} onClick={handleClick} id={id}>
			{addElement()}
		</div>
	)
}

export default Cell
