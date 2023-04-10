import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { Card } from '../../components'
import './Collection.scss'

const Collection = () => {
	const { allCards, getCurrentUser, userCards, getUserCards } =
		useGlobalContext()
	const sortedCards = allCards.sort((a, b) => a.number - b.number)
	const cardNames = userCards.map((card) => card.name)
	const uniqueCards = [...new Set(cardNames)]

	useEffect(() => {
		getCurrentUser()
		getUserCards()
	}, [])

	return (
		<div className='collection page'>
			<div className='list'>
				<h1 className='header box'>
					Collection
					<span>
						Total Found : {uniqueCards.reduce((total) => total + 1, 0)} /{' '}
						{allCards.length}
					</span>
				</h1>
				<div className='container'>
					{sortedCards.map((card) =>
						userCards.find((userCard) => userCard.name === card.name) ? (
							<div key={card.name} className='display'>
								<Card
									card={card}
									player='p1'
									page='collection'
									visibility={true}
								/>
								<div className='info'>
									<p>
										{card.number} / {allCards.length}
									</p>
									<p>{card.name}</p>
								</div>
							</div>
						) : (
							<div key={card.name} className='display'>
								<div className='card disabled' />
								<div className='info'>
									<p>??? / {allCards.length}</p>
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
