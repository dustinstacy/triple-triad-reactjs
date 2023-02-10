import { UNSAFE_convertRoutesToDataRoutes } from '@remix-run/router'
import { all } from 'axios'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import './Packs.scss'

const Packs = () => {
	const { allCards } = useGlobalContext()
	const [packContents, setPackContents] = useState([])

	const openPack = (e) => {
		e.preventDefault()
		const packSize = 3
		const newPack = [...Array(packSize)]
		getRandomCards(newPack)
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
							<span className='up'>1</span>
							<span className='right'>2</span>
							<span className='left'>3</span>
							<span className='down'>4</span>
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
