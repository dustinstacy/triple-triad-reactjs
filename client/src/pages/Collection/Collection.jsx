import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import './Collection.scss'

const Collection = () => {
	const { allCards, userCards, getUserCards } = useGlobalContext()
	useEffect(() => {
		getUserCards
	}, [])

	return (
		<div className='collection page'>
			<div className='background' />
			<div className='filters box'></div>
			<div className='list'>
				{allCards.map((card) =>
					userCards.find((userCard) => userCard.name === card.name) ? (
						<div key={card.name} className='display'>
							<div className='card'>
								<img className='card__image' src={card.image} alt='owl' />
							</div>
							<p>{card.number} / 281</p>
							<p>{card.name}</p>
						</div>
					) : (
						<div key={card.name} className='display'>
							<div className='card disabled' />
							<p>??? / 281</p>
							<p>????????</p>
						</div>
					)
				)}
			</div>
		</div>
	)
}

export default Collection
