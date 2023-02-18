import React from 'react'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import './Card.scss'

const Card = ({ card, player, turn, handleClick, page }) => {
	return (
		<div
			className={`card ${player === 'p1' ? 'blue' : 'red'} ${
				!turn ? 'not__user' : ''
			}`}
			id={card._id}
			onClick={(e) => handleClick(e)}
			onDrag={(e) => handleDrag(e)}
			owner={player}
		>
			<img className='card__image' src={card.image} alt={card._id} />
			{page !== 'collection' && (
				<div className='card__values'>
					<span className='up'>{card.values[0]}</span>
					<span className='right'>{card.values[1]}</span>
					<span className='down'>{card.values[2]}</span>
					<span className='left'>{card.values[3]}</span>
				</div>
			)}
			{page === 'deck' && (
				<div className='checkbox'>
					{card.selected ? (
						<ImCheckboxChecked className='check' />
					) : (
						<ImCheckboxUnchecked className='uncheck' />
					)}
				</div>
			)}
		</div>
	)
}

export default Card
