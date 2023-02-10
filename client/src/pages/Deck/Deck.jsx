import React from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { FaStar, FaRegStar } from 'react-icons/fa'
import './Deck.scss'

const Deck = () => {
	const { userCards } = useGlobalContext()

	const sortedCards = userCards.sort((a, b) => a.number - b.number)

	return (
		<div className='deck page'>
			<div className='filters box'></div>
			<div className='list'>
				{sortedCards.map((card, i) => (
					<div key={card._id} className='display'>
						<div className='card'>
							<img className='card__image' src={card.image} alt='owl' />
							<div className='card__values'>
								<span className='up'>{card.values[0]}</span>
								<span className='right'>{card.values[1]}</span>
								<span className='down'>{card.values[2]}</span>
								<span className='left'>{card.values[3]}</span>
							</div>
							<div class='checkcircle'>
								<div class='round'>
									<input type='checkbox' id={card._id} />
									<label for={card._id}></label>
								</div>
							</div>
						</div>

						<p>
							<FaStar />
							<FaRegStar />
							<FaRegStar />
							<FaRegStar />
							<FaRegStar />
						</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Deck
