import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../../context/GlobalContext'
import { FaStar, FaRegStar } from 'react-icons/fa'
import './Deck.scss'

const Deck = () => {
	const { user, userCards, getUserDeck, userDeck } = useGlobalContext()
	const [checkedState, setCheckedState] = useState(
		new Array(userCards.length).fill(false)
	)
	const sortedCards = userCards.sort((a, b) => a.number - b.number)

	useEffect(() => {
		sortedCards.forEach((card, index) => {
			if (userDeck.find((deckCard) => deckCard._id === card._id)) {
				setCheckedState([...checkedState, checkedState.splice(index, 1, true)])
			}
		})
	}, [])

	const handleChecked = async (e, card, index) => {
		const updatedCheckedState = checkedState.map((item, position) =>
			index === position ? !item : item
		)
		setCheckedState(updatedCheckedState)

		if (e.target.checked) {
			await axios.post('/api/deck/add', {
				user: user._id,
				_id: card._id,
				number: card.number,
				name: card.name,
				rarity: card.rarity,
				element: card.element,
				image: card.image,
				values: card.values,
			})
			getUserDeck()
		} else {
			await axios.delete(`/api/deck/${card._id}/remove`, {
				user: user._id,
			})
			getUserDeck()
		}
	}

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
							<div className='checkcircle'>
								<div className='round'>
									<input
										type='checkbox'
										id={card._id}
										value={{ ...card }}
										checked={checkedState[i]}
										onChange={(e) => handleChecked(e, card, i)}
									/>
									<label htmlFor={card._id}></label>
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
