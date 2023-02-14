import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import './Collection.scss'

const Collection = () => {
	const { allCards, userCards, getUserCards } = useGlobalContext()
	const sortedCards = allCards.sort((a, b) => a.number - b.number)
	const cardNames = userCards.map((card) => card.name)
	const uniqueCards = [...new Set(cardNames)]

	useEffect(() => {
		getUserCards
	}, [])

	return (
		<div className='collection page'>
			<div className='background' />

			<div className='list'>
				<h1 className='header box'>
					Collection
					<span>
						Total Found : {uniqueCards.reduce((total) => total + 1, 0)} / 281
					</span>
				</h1>
				<div className='container'>
					{sortedCards.map((card) =>
						userCards.find((userCard) => userCard.name === card.name) ? (
							<div key={card.name} className='display'>
								<div className='card'>
									<img className='card__image' src={card.image} alt='owl' />
								</div>
								<div className='info'>
									<p>{card.number} / 281</p>
									<p>{card.name}</p>
								</div>
							</div>
						) : (
							<div key={card.name} className='display'>
								<div className='card disabled' />
								<div className='info'>
									<p>??? / 281</p>
									<p>????????</p>
								</div>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	)
}

export default Collection
