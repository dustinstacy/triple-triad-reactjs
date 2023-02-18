import React, { useEffect, useState } from 'react'

import { useGlobalContext } from '../../context/GlobalContext'
import { useCPUCardContext } from '../../context/CPUCardContext'
import { shuffleCards, dealCards } from '../../../../utils/shuffleAndDeal'
import { Card } from '../../components'
import { boardframe } from '../../assets'
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
	const { user, userDeck } = useGlobalContext()
	const { cpuDeck } = useCPUCardContext()
	const boardArray = []
	const p1 = user
	const p2 = 'cpu'

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
					<Card key={card._id} card={card} player={p2} />
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
					<Card key={card._id} card={card} player={p1} />
				))}
			</div>
		</div>
	)
}

export default Match
