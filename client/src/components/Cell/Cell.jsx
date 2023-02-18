import React from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { useSettingsContext } from '../../context/SettingsContext'
import './Cell.scss'

const Cell = ({ value, id, handleClick }) => {
	const { allCards } = useGlobalContext()
	const { elements } = useSettingsContext()
	const elementArray = []

	allCards.forEach((card) => {
		if (!elementArray.includes(card.element)) {
			elementArray.push(card.element)
		}
	})

	const randomElement = () => {
		const element =
			elementArray[Math.floor(Math.random() * elementArray.length)]
		return element
	}

	randomElement()

	return (
		<div className='cell' value={value} onClick={handleClick} id={id}>
			{elements ? randomElement() : ''}
		</div>
	)
}

export default Cell
