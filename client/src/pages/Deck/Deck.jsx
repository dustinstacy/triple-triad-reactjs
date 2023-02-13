import React, { useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../../context/GlobalContext'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import './Deck.scss'

const Deck = () => {
	const { getCurrentUser, user, userCards, userDeck, allCards } =
		useGlobalContext()
	const [deckFilter, setDeckFilter] = useState('Show All')
	const [rarityFilter, setRarityFilter] = useState(null)
	const [elementFilter, setElementFilter] = useState(null)
	const [sorting, setSorting] = useState(null)

	const valuesArray = ['Up', 'Right', 'Down', 'Left']
	const elementArray = []
	const rarityArray = []

	allCards.forEach((card) => {
		if (!elementArray.includes(card.element)) {
			elementArray.push(card.element)
		}
		if (!rarityArray.includes(card.rarity)) {
			rarityArray.push(card.rarity)
		}
	})

	const unSelectAll = (e) => {
		e.preventDefault()
		userDeck.forEach((deckCard) => {
			removeSelection(e, deckCard)
		})
		getCurrentUser()
	}

	const markSelected = async (e, card) => {
		if (userDeck.length < 35) {
			e.preventDefault()
			await axios.put(`/api/collection/${card._id}/selected`)
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
			getCurrentUser()
		} else {
			alert('Your deck is currently full')
		}
	}

	const removeSelection = async (e, card) => {
		e.preventDefault()
		await axios.put(`/api/collection/${card._id}/removeSelection`)
		await axios.delete(`/api/deck/${card._id}/remove`, {
			user: user._id,
		})
		getCurrentUser()
	}

	const filterCards = () => {
		let filteredCards = []

		if (deckFilter === 'Show All') {
			filteredCards = [...userCards.sort((a, b) => a.number - b.number)]
		}

		if (deckFilter === 'Selected') {
			filteredCards = [
				...userCards.filter((card) =>
					userDeck.find(({ _id }) => card._id === _id)
				),
			]
		}

		if (deckFilter === 'Unselected') {
			filteredCards = [
				...userCards.filter(
					(card) => !userDeck.find(({ _id }) => card._id === _id)
				),
			]
		}
		if (rarityFilter) {
			filteredCards = [
				...filteredCards.filter((card) => card.rarity === rarityFilter),
			]
		}

		if (elementFilter) {
			filteredCards = [
				...filteredCards.filter((card) => card.element === elementFilter),
			]
		}

		if (sorting === 'Reset') {
			filteredCards.sort((a, b) => a.number - b.number)
		}
		if (sorting === 'Up') {
			filteredCards.sort((a, b) => b.values[0] - a.values[0])
		}
		if (sorting === 'Right') {
			filteredCards.sort((a, b) => b.values[1] - a.values[1])
		}
		if (sorting === 'Down') {
			filteredCards.sort((a, b) => b.values[2] - a.values[2])
		}
		if (sorting === 'Left') {
			filteredCards.sort((a, b) => b.values[3] - a.values[3])
		}
		if (sorting === 'Total') {
			filteredCards.sort(
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
		}

		return filteredCards
	}

	const reset = () => {
		setRarityFilter(null)
		setElementFilter(null)
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
					<button className='box' onClick={(e) => unSelectAll(e)}>
						Unselect All
					</button>

					<div className='filters__section box'>
						<div className='section__header'>
							<h3>Deck Options</h3>
							<hr />
						</div>

						<div className='section__options'>
							<button
								className={`${deckFilter === 'Show All' ? 'active' : ''} box`}
								onClick={() => setDeckFilter('Show All')}
							>
								Show All
							</button>
							<button
								className={`${deckFilter === 'Selected' ? 'active' : ''} box`}
								onClick={() => setDeckFilter('Selected')}
							>
								Show Selected
							</button>
							<button
								className={`${deckFilter === 'Unselected' ? 'active' : ''} box`}
								onClick={() => setDeckFilter('Unselected')}
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
							<button className='box' onClick={() => setSorting('Reset')}>
								Reset
							</button>
							{valuesArray.map((value) => (
								<button
									key={value}
									className={`${sorting === value ? 'active' : ''} box`}
									onClick={() => setSorting(value)}
								>
									{value}
								</button>
							))}
							<button
								className={`${sorting === 'Total' ? 'active' : ''} box`}
								onClick={() => setSorting('Total')}
							>
								Total
							</button>
						</div>
					</div>
					<div className='filters__section box'>
						<div className='section__header'>
							<h3>Filter by Rarity</h3>
							<hr />
						</div>
						<div className='section__options'>
							<button className='box' onClick={(e) => setRarityFilter(null)}>
								Clear Filter
							</button>
							{rarityArray.map((rarity) => (
								<button
									key={rarity}
									className={`${rarityFilter === rarity ? 'active' : ''} box`}
									onClick={(e) => setRarityFilter(rarity)}
								>
									{rarity}
								</button>
							))}
						</div>
					</div>
					<div className='filters__section box'>
						<div className='section__header'>
							<h3>Filter by Element</h3>
							<hr />
						</div>
						<div className='section__options'>
							<button className='box' onClick={(e) => setElementFilter(null)}>
								Clear Filter
							</button>
							{elementArray.map((element) => (
								<button
									key={element}
									className={`${elementFilter === element ? 'active' : ''} box`}
									onClick={(e) => setElementFilter(element)}
								>
									{element}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className='list'>
				{filterCards().map((card) => (
					<div key={card._id} className='display'>
						<div className='card'>
							<img className='card__image' src={card.image} alt='owl' />
							<div className='card__values'>
								<span className='up'>{card.values[0]}</span>
								<span className='right'>{card.values[1]}</span>
								<span className='down'>{card.values[2]}</span>
								<span className='left'>{card.values[3]}</span>
							</div>
							<div className='checkbox'>
								<span
									onClick={(e) =>
										!card.selected
											? markSelected(e, card)
											: removeSelection(e, card)
									}
								>
									{card.selected ? (
										<ImCheckboxChecked className='check' />
									) : (
										<ImCheckboxUnchecked className='uncheck' />
									)}
								</span>
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
