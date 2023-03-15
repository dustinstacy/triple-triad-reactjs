import React, { useEffect } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../../context/GlobalContext'
import { assignRandomValues } from '../../../../utils/assignRandomValues'
import {
	scorchedEarthDeck,
	hurricaneDeck,
	frozenChargeDeck,
} from '../../constants/preBuilts'
import { scorchedEarth, hurricane, frozenCharge } from '../../assets/elements'
import './FirstDeck.scss'
import { useNavigate } from 'react-router-dom'

const FirstDeck = () => {
	const navigate = useNavigate()
	const { user, allCards, getCurrentUser } = useGlobalContext()

	useEffect(() => {
		getCurrentUser()
		if (user.firstDeck === true) {
			navigate('/home')
		}
	}, [])

	const selectDeck = (deck) => {
		let prebuilt
		if (deck === 'Scorched Earth') {
			prebuilt = scorchedEarthDeck
		} else if (deck === 'Hurricane') {
			prebuilt = hurricaneDeck
		} else if (deck === 'Frozen Charge') {
			prebuilt = frozenChargeDeck
		}
		prebuilt.forEach((number) =>
			allCards.find((card) => {
				if (parseInt(card.number) === number) {
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
				}
			})
		)
		axios.put('/api/profile', {
			coin: 1000,
			firstDeck: true,
		})
		axios.put('/api/profile/packs', {
			packs: [{ name: 'small' }, { name: 'medium' }, { name: 'large' }],
		})
		axios.put('/api/profile/backgrounds', {
			backgrounds: [{ name: 'blue1' }, { name: 'red1' }],
		})
		getCurrentUser()
	}

	return (
		<div className='first page'>
			<div className='intro box'>
				<h1>Welcome to the world of Triple Triad</h1>
				<p>Please select a deck to begin your journey</p>
				<div className='decks'>
					<div className='starter'>
						<img
							src={scorchedEarth}
							alt='Scorched Earth'
							onClick={() => selectDeck('Scorched Earth')}
						/>
						<p>Scorched Earth</p>
						<span>Fire & Earth</span>
					</div>
					<div className='starter'>
						<img
							src={hurricane}
							alt='Hurricane'
							onClick={() => selectDeck('Hurricane')}
						/>
						<p>Hurricane</p>
						<span>Wind & Water</span>
					</div>
					<div className='starter'>
						<img
							src={frozenCharge}
							alt='Frozen Charge'
							onClick={() => selectDeck('Frozen Charge')}
						/>
						<p>Frozen Charge</p>
						<span>Ice & Lightning</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FirstDeck
