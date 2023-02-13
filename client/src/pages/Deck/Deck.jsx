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
	const [sortedCards, setSortedCards] = useState(
		userCards.sort((a, b) => a.number - b.number)
	)

	const deckOptions = (e) => {
		if (e.target.id === 'uncheckAll') {
			userDeck.forEach((deckCard) => {
				axios.delete(`/api/deck/${deckCard._id}/remove`, {
					user: user._id,
				})
				getUserDeck()
			})
			setCheckedState(checkedState.fill(false))
		}

		if (e.target.id === 'selected') {
			setSortedCards(userDeck)
		}

		if (e.target.id === 'unselected') {
			setSortedCards(
				userCards.filter(
					(card) => !userDeck.find(({ _id }) => card._id === _id)
				)
			)
		}
	}

	const sortCardsByValues = (e) => {
		if (e.target.id !== 'total') {
			let index
			if (e.target.id === 'up') {
				index = 0
			} else if (e.target.id === 'right') {
				index = 1
			} else if (e.target.id === 'down') {
				index = 2
			} else if (e.target.id === 'left') {
				index = 3
			}
			const filteredCards = sortedCards.sort(
				(a, b) => parseInt(b.values[index]) - parseInt(a.values[index])
			)
			setSortedCards([...filteredCards])
		} else if (e.target.id === 'total') {
			const filteredCards = sortedCards.sort(
				(a, b) =>
					b.values.reduce(
						(sum, current) => parseInt(sum) + parseInt(current),
						0
					) -
					a.values.reduce(
						(sum, current) => parseInt(sum) + parseInt(current),
						0
					)
			)
			setSortedCards([...filteredCards])
		}
	}

	const filterByRarity = (e) => {
		const filteredCards = userCards.filter(
			(card) => card.rarity === e.target.id
		)
		setSortedCards([...filteredCards])
	}

	const filterByElement = (e) => {
		const filteredCards = userCards.filter(
			(card) => card.element === e.target.id
		)
		setSortedCards([...filteredCards])
	}

	const reset = (e) => {
		setSortedCards(userCards.sort((a, b) => a.number - b.number))
	}

	useEffect(() => {
		sortedCards.forEach((card, index) => {
			if (userDeck.find((deckCard) => deckCard._id === card._id)) {
				setCheckedState([...checkedState, checkedState.splice(index, 1, true)])
			}
		})
	}, [])

	const handleChecked = async (e, card, index) => {
		if (userDeck.length < 35) {
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
			} else {
				await axios.delete(`/api/deck/${card._id}/remove`, {
					user: user._id,
				})
			}
		} else if (userDeck.length === 35 && e.target.checked === true) {
			alert('Your deck is currently full')
		} else if (userDeck.length === 35 && e.target.checked === false) {
			const updatedCheckedState = checkedState.map((item, position) =>
				index === position ? !item : item
			)
			setCheckedState(updatedCheckedState)
			await axios.delete(`/api/deck/${card._id}/remove`, {
				user: user._id,
			})
		}
		getUserDeck()
	}

	return (
		<div className='deck page'>
			<div className='sidebar box'>
				<div className='counter'>
					<p>Cards in Deck</p>
					<p>
						<span className={userDeck.length < 35 ? 'invalid' : 'valid'}>
							{userDeck.length}
						</span>
						/ 35
					</p>
				</div>
				<div className='filters'>
					<button className='box active' onClick={(e) => reset(e)}>
						Show All
					</button>
					<div className='filters__section box'>
						<div className='section__header'>
							<h3>Deck Options</h3>
							<hr />
						</div>
						<div className='section__options'>
							<button
								className='box'
								id='uncheckAll'
								onClick={(e) => deckOptions(e)}
							>
								Uncheck All
							</button>
							<button
								className='box'
								id='selected'
								onClick={(e) => deckOptions(e)}
							>
								Show Selected
							</button>
							<button
								className='box'
								id='unselected'
								onClick={(e) => deckOptions(e)}
							>
								Show Unselected
							</button>
						</div>
					</div>
					<div className='filters__section box'>
						<div className='section__header'>
							<h3>Sort by Card Values</h3>
							<hr />
						</div>
						<div className='section__options'>
							<button
								className='box'
								id='total'
								onClick={(e) => sortCardsByValues(e)}
							>
								Total
							</button>
							<button
								className='box'
								id='up'
								onClick={(e) => sortCardsByValues(e)}
							>
								Up
							</button>
							<button
								className='box'
								id='right'
								onClick={(e) => sortCardsByValues(e)}
							>
								Right
							</button>
							<button
								className='box'
								id='down'
								onClick={(e) => sortCardsByValues(e)}
							>
								Down
							</button>
							<button
								className='box'
								id='left'
								onClick={(e) => sortCardsByValues(e)}
							>
								Left
							</button>
						</div>
					</div>
					<div className='filters__section box'>
						<div className='section__header'>
							<h3>Filter by Rarity</h3>
							<hr />
						</div>
						<div className='section__options'>
							<button
								className='box'
								id='Common'
								onClick={(e) => filterByRarity(e)}
							>
								Common
							</button>
							<button
								className='box'
								id='Uncommon'
								onClick={(e) => filterByRarity(e)}
							>
								Uncommon
							</button>
							<button
								className='box'
								id='Rare'
								onClick={(e) => filterByRarity(e)}
							>
								Rare
							</button>
							<button
								className='box'
								id='Epic'
								onClick={(e) => filterByRarity(e)}
							>
								Epic
							</button>
							<button
								className='box'
								id='Legendary'
								onClick={(e) => filterByRarity(e)}
							>
								Legendary
							</button>
						</div>
					</div>
					<div className='filters__section box'>
						<div className='section__header'>
							<h3>Filter by Element</h3>
							<hr />
						</div>
						<div className='section__options'>
							<button
								className='box'
								id='Neutral'
								onClick={(e) => filterByElement(e)}
							>
								Neutral
							</button>
							<button
								className='box'
								id='Fire'
								onClick={(e) => filterByElement(e)}
							>
								Fire
							</button>
							<button
								className='box'
								id='Water'
								onClick={(e) => filterByElement(e)}
							>
								Water
							</button>
							<button
								className='box'
								id='Earth'
								onClick={(e) => filterByElement(e)}
							>
								Earth
							</button>
							<button
								className='box'
								id='Wind'
								onClick={(e) => filterByElement(e)}
							>
								Wind
							</button>
							<button
								className='box'
								id='Ice'
								onClick={(e) => filterByElement(e)}
							>
								Ice
							</button>
							<button
								className='box'
								id='Lightning'
								onClick={(e) => filterByElement(e)}
							>
								Lightning
							</button>
							<button
								className='box'
								id='Holy'
								onClick={(e) => filterByElement(e)}
							>
								Holy
							</button>
							<button
								className='box'
								id='Dark'
								onClick={(e) => filterByElement(e)}
							>
								Dark
							</button>
							<button
								className='box'
								id='Universal'
								onClick={(e) => filterByElement(e)}
							>
								Universal
							</button>
						</div>
					</div>
				</div>
			</div>
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
