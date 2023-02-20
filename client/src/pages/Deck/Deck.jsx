import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../../context/GlobalContext'
import { Card } from '../../components'
import { FaStar, FaRegStar } from 'react-icons/fa'

import {
	Neutral,
	Fire,
	Water,
	Earth,
	Wind,
	Ice,
	Lightning,
	Holy,
	Dark,
	Universal,
} from '../../assets'
import './Deck.scss'

const Deck = () => {
	const { getCurrentUser, user, getUserCards, userCards, userDeck, allCards } =
		useGlobalContext()
	const [deckFilter, setDeckFilter] = useState('Show All')
	const [rarityFilter, setRarityFilter] = useState(null)
	const [elementFilter, setElementFilter] = useState(null)
	const [sortingFilter, setSortingFilter] = useState(null)

	const valuesArray = ['Up', 'Right', 'Down', 'Left']
	const elementArray = []
	const rarityArray = []

	useEffect(() => {
		getUserCards()
	}, [])

	allCards.forEach((card) => {
		if (!elementArray.includes(card.element)) {
			elementArray.push(card.element)
		}
		if (!rarityArray.includes(card.rarity)) {
			rarityArray.push(card.rarity)
		}
	})

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

		if (sortingFilter === 'Reset') {
			filteredCards.sort((a, b) => a.number - b.number)
		}
		if (sortingFilter === 'Up') {
			filteredCards.sort(
				(a, b) => b.values[0].replace(/A/g, 10) - a.values[0].replace(/A/g, 10)
			)
		}
		if (sortingFilter === 'Right') {
			filteredCards.sort(
				(a, b) => b.values[1].replace(/A/g, 10) - a.values[1].replace(/A/g, 10)
			)
		}
		if (sortingFilter === 'Down') {
			filteredCards.sort(
				(a, b) => b.values[2].replace(/A/g, 10) - a.values[2].replace(/A/g, 10)
			)
		}
		if (sortingFilter === 'Left') {
			filteredCards.sort(
				(a, b) => b.values[3].replace(/A/g, 10) - a.values[3].replace(/A/g, 10)
			)
		}
		if (sortingFilter === 'Total') {
			filteredCards.sort(
				(a, b) =>
					b.values.reduce(
						(sum, current) =>
							parseInt(sum) + parseInt(current.replace(/A/g, 10)),
						0
					) -
					a.values.reduce(
						(sum, current) =>
							parseInt(sum) + parseInt(current.replace(/A/g, 10)),
						0
					)
			)
		}
		return filteredCards
	}

	const markSelected = async (card) => {
		if (userDeck.length < 35) {
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

	const removeSelection = async (card) => {
		await axios.put(`/api/collection/${card._id}/removeSelection`)
		await axios.delete(`/api/deck/${card._id}/remove`, {
			user: user._id,
		})
		getCurrentUser()
	}

	const autoBuild = async () => {
		const emptySlots = 35 - userDeck.length
		const totalValueArray = userCards
			.filter((card) => !userDeck.find(({ _id }) => card._id === _id))
			.sort(
				(a, b) =>
					b.values.reduce(
						(sum, current) =>
							parseInt(sum) + parseInt(current.replace(/A/g, 10)),
						0
					) -
					a.values.reduce(
						(sum, current) =>
							parseInt(sum) + parseInt(current.replace(/A/g, 10)),
						0
					)
			)

		for (let i = 0; i < emptySlots; i++) {
			markSelected(totalValueArray[i])
		}
		getCurrentUser()
	}

	const unSelectAll = () => {
		userDeck.forEach((deckCard) => {
			removeSelection(deckCard)
		})
		getCurrentUser()
	}

	return (
		<div className='deck page'>
			<div className='sidebar box'>
				<div className='filters'>
					<div className='filters__section box'>
						<h1>Filter</h1>
						<div className='section__header'>
							<h3>Cards </h3>
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
						<div className='section__header'>
							<h3>Rarity</h3>
							<hr />
						</div>
						<div className='section__options'>
							<button className='box' onClick={() => setRarityFilter(null)}>
								Clear Filter
							</button>
							{rarityArray.map((rarity) => (
								<button
									key={rarity}
									className={`${rarityFilter === rarity ? 'active' : ''} box`}
									onClick={() => setRarityFilter(rarity)}
								>
									{rarity}
								</button>
							))}
						</div>

						<div className='section__header'>
							<h3>Element</h3>
							<hr />
						</div>
						<div className='section__options'>
							<button className='box' onClick={() => setElementFilter(null)}>
								Clear Filter
							</button>
							{elementArray.map((element) => (
								<button
									key={element}
									className={`${elementFilter === element ? 'active' : ''} box`}
									onClick={() => setElementFilter(element)}
								>
									{element}
								</button>
							))}
						</div>
					</div>
					<div className='filters__section box'>
						<h1>Sort</h1>
						<div className='section__header'>
							<h3>Card Values</h3>
							<hr />
						</div>
						<div className='section__options'>
							<button className='box' onClick={() => setSortingFilter('Reset')}>
								Reset
							</button>
							{valuesArray.map((value) => (
								<button
									key={value}
									className={`${sortingFilter === value ? 'active' : ''} box`}
									onClick={() => setSortingFilter(value)}
								>
									{value}
								</button>
							))}
							<button
								className={`${sortingFilter === 'Total' ? 'active' : ''} box`}
								onClick={() => setSortingFilter('Total')}
							>
								Total
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='list'>
				<div className='deck__details box'>
					<div className='top'>
						<div className='counter'>
							<p>Cards in Deck</p>
							<p>
								<span className={userDeck.length < 35 ? 'invalid' : 'valid'}>
									{userDeck.length}
								</span>
								/ 35
							</p>
						</div>
						<div className='strength'>
							<p>Deck Strength</p>
							{userDeck.reduce(
								(total, card) =>
									total +
									card.values.reduce(
										(sum, current) =>
											parseInt(sum) + parseInt(current.replace(/A/g, 10)),
										0
									),
								0
							)}
						</div>
						<div className='section'>
							<button className='box' onClick={() => autoBuild()}>
								Auto Build
							</button>
							<button className='box' onClick={() => unSelectAll()}>
								Unselect All
							</button>
						</div>
					</div>
					<div className='bottom'>
						<div className='element'>
							<img src={Neutral} alt='Neutral' />
							<span>
								{userDeck.filter((card) => card.element === 'Neutral').length}
							</span>
						</div>
						<div className='element'>
							<img src={Fire} alt='Fire' />
							<span>
								{userDeck.filter((card) => card.element === 'Fire').length}
							</span>
						</div>{' '}
						<div className='element'>
							<img src={Water} alt='Water' />
							<span>
								{userDeck.filter((card) => card.element === 'Water').length}
							</span>
						</div>{' '}
						<div className='element'>
							<img src={Earth} alt='Earth' />
							<span>
								{userDeck.filter((card) => card.element === 'Earth').length}
							</span>
						</div>{' '}
						<div className='element'>
							<img src={Wind} alt='Wind' />
							<span>
								{userDeck.filter((card) => card.element === 'Wind').length}
							</span>
						</div>{' '}
						<div className='element'>
							<img src={Ice} alt='Ice' />
							<span>
								{userDeck.filter((card) => card.element === 'Ice').length}
							</span>
						</div>{' '}
						<div className='element'>
							<img src={Lightning} alt='Lightning' />
							<span>
								{userDeck.filter((card) => card.element === 'Lightning').length}
							</span>
						</div>{' '}
						<div className='element'>
							<img src={Holy} alt='Holy' />
							<span>
								{userDeck.filter((card) => card.element === 'Holy').length}
							</span>
						</div>{' '}
						<div className='element'>
							<img src={Dark} alt='Dark' />
							<span>
								{userDeck.filter((card) => card.element === 'Dark').length}
							</span>
						</div>{' '}
						<div className='element'>
							<img src={Universal} alt='Universal' />
							<span>
								{userDeck.filter((card) => card.element === 'Universal').length}
							</span>
						</div>
					</div>
				</div>

				{filterCards().map((card) => (
					<div key={card._id} className='display'>
						<Card
							card={card}
							player='p1'
							page={'deck'}
							handleClick={() =>
								!card.selected ? markSelected(card) : removeSelection(card)
							}
							turn={true}
						/>

						<p className='stars'>
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
