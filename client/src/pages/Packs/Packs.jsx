import React, { useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../../context/GlobalContext'
import { assignRandomValues } from '../../../../utils/assignRandomValues'
import './Packs.scss'

const Packs = () => {
	const { allCards, user } = useGlobalContext()
	const [packContents, setPackContents] = useState([])

	const openPack = async (e) => {
		e.preventDefault()
		const packSize = 3
		const newPack = [...Array(packSize)]
		getRandomCards(newPack)
		newPack.forEach((card) => {
			assignRandomValues(card)
			axios.post('/api/collection/new', {
				user: user._id,
				number: card.number,
				name: card.name,
				rarity: card.rarity,
				element: card.element,
				image: card.image,
				values: card.values,
			})
		})
		setPackContents(newPack)
	}

	const randomRarity = () => {
		const num = Math.random()
		if (num < 0.425) return 'Common'
		else if (num <= 0.725) return 'Uncommon'
		else if (num <= 0.875) return 'Rare'
		else if (num <= 0.95) return 'Epic'
		else return 'Legendary'
	}

	const getRandomCards = (pack) => {
		pack.forEach((_, i) => {
			const rarity = randomRarity()
			const currentRarityCards = allCards.filter(
				(card) => card.rarity === rarity
			)
			const randomCard =
				currentRarityCards[
					Math.floor(Math.random() * currentRarityCards.length)
				]
			pack.splice(i, 1, randomCard)
		})
	}

	return (
		<div className='packs page'>
			<div className='contents'>
				{packContents?.map((card, i) => (
					<div key={card.name + i} className='card'>
						<img className='card__image' src={card.image} alt='owl' />
						<div className='card__values'>
							<span className='up'>{card.values[0]}</span>
							<span className='right'>{card.values[1]}</span>
							<span className='left'>{card.values[3]}</span>
							<span className='down'>{card.values[2]}</span>
						</div>
					</div>
				))}
			</div>
			<button className='packs__button box' onClick={(e) => openPack(e)}>
				Open Pack
			</button>
		</div>
	)
}

export default Packs
