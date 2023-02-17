import React, { useEffect, useState } from 'react'
import { boardframe } from '../../assets'
import { useGlobalContext } from '../../context/GlobalContext'
import { useCPUCardContext } from '../../context/CPUCardContext'
import { shuffleCards, dealCards } from '../../../../utils/shuffleAndDeal'
import './Match.scss'

const width = 3

const Match = () => {
	// const [boardArray, setBoardArray] = useState([])
	const [p1Hand, setP1Hand] = useState([])
	const [p2Hand, setP2Hand] = useState([])
	// const [cardSelected, setCardSelected] = useState(null)
	// const [cellBeingFilled, setCellBeingFilled] = useState(null)
	// const [isP1Turn, setisP1Turn] = useState(true)
	// const [p1Score, setP1Score] = useState(5)
	// const [p2Score, setP2Score] = useState(5)
	// const table = [...p1Hand, ...boardArray, ...p2Hand]
	const { userDeck } = useGlobalContext()
	const { cpuDeck } = useCPUCardContext()
	const boardArray = []

	const newGame = () => {
		const p1DealtCards = []
		const p2DealtCards = []
		shuffleCards(userDeck)
		shuffleCards(cpuDeck)
		dealCards(p1DealtCards, userDeck)
		dealCards(p2DealtCards, cpuDeck)
		setP1Hand(p1DealtCards)
		setP2Hand(p2DealtCards)
	}

	useEffect(() => {
		newGame()
	}, [])

	return (
		<div className='match page'>
			<div className='cpu'>
				{p2Hand.map((card) => (
					<div key={card._id} className='card'>
						<img className='card__image' src={card.image} alt={card._id} />
						<div className='card__values'>
							<span className='up'>{card.values[0]}</span>
							<span className='right'>{card.values[1]}</span>
							<span className='down'>{card.values[2]}</span>
							<span className='left'>{card.values[3]}</span>
						</div>
					</div>
				))}
			</div>
			<img className='board' src={boardframe} alt='board frame' />
			<div className='grid'>
				{boardArray.map((cell, i) => (
					<div
						key={i}
						id={i}
						className='cell empty'
						onClick={(e) => placeCard(e, p1HandArray)}
					></div>
				))}
			</div>
			<div className='player'>
				{p1Hand.map((card, i) => (
					<div
						key={card._id}
						className='card'
						selected={false}
						onClick={(e) => selectCard(e, p1HandArray)}
						id={i}
					>
						<img className='card__image' src={card.image} alt={card._id} />
						<div className='card__values'>
							<span className='up'>{card.values[0]}</span>
							<span className='right'>{card.values[1]}</span>
							<span className='down'>{card.values[2]}</span>
							<span className='left'>{card.values[3]}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Match
