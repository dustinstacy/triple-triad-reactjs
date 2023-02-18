import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { useCPUCardContext } from '../../context/CPUCardContext'
import { shuffleCards, dealCards } from '../../../../utils/shuffleAndDeal'
import { Card, Cell } from '../../components'
import './Match.scss'
import { useSettingsContext } from '../../context/SettingsContext'

const width = 3

const Match = () => {
	const { same, elements } = useSettingsContext
	const { user, userDeck } = useGlobalContext()
	const { cpuDeck } = useCPUCardContext()
	const [p1Hand, setP1Hand] = useState([])
	const [p2Hand, setP2Hand] = useState([])
	const [boardArray, setBoardArray] = useState([...new Array(9).fill('empty')])
	const [table, setTable] = useState([...p2Hand, ...boardArray, ...p1Hand])
	const [cardSelected, setCardSelected] = useState(null)
	const [isP1Turn, setisP1Turn] = useState(true)
	// const [p1Score, setP1Score] = useState(5)
	// const [p2Score, setP2Score] = useState(5)
	const p1 = 'p1'
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

	const processBattles = (e) => {
		const card = cardSelected
		const index = parseInt(e.target.id)
		const up = boardArray[index - width]
		const right = boardArray[index + 1]
		const left = boardArray[index - 1]
		const down = boardArray[index + width]

		if (index !== 0 && index !== 1 && index !== 2 && up !== 'empty') {
			if (up.values[2] < card.values[0]) {
				up.user = card.user
			}
		}
		if (index !== 0 && index !== 3 && index !== 6 && left !== 'empty') {
			if (left.values[1] < card.values[3]) {
				left.user = card.user
			}
		}
		if (index !== 2 && index !== 5 && index !== 8 && right !== 'empty') {
			if (right.values[3] < card.values[1]) {
				right.user = card.user
			}
		}
		if (index !== 6 && index !== 7 && index !== 8 && down !== 'empty') {
			if (down.values[0] < card.values[2]) {
				down.user = card.user
			}
		}
	}

	const endTurn = () => {
		setCardSelected(null)
		setisP1Turn((current) => !current)
	}

	const endMove = (e) => {
		processBattles(e)
		endTurn()
	}

	const placeCard = (e) => {
		const newBoardArray = boardArray
		let newHand
		if (cardSelected) {
			newBoardArray.splice(e.target.id, 1, cardSelected)
			isP1Turn
				? ((newHand = p1Hand),
				  newHand.forEach((card, i) =>
						card._id === cardSelected._id ? newHand.splice(i, 1) : ''
				  ),
				  setP1Hand(newHand))
				: ((newHand = p2Hand),
				  newHand.forEach((card, i) =>
						card._id === cardSelected._id ? newHand.splice(i, 1) : ''
				  ),
				  setP2Hand(newHand))
			setBoardArray(newBoardArray)
			endMove(e)
		}
	}

	return (
		<div className='match page'>
			<div className='cpu'>
				{p2Hand.map((card) => (
					<Card
						key={card._id}
						card={card}
						player={p2}
						handleClick={!isP1Turn ? () => setCardSelected(card) : () => ''}
						turn={!isP1Turn}
					/>
				))}
			</div>
			<div className='grid'>
				{boardArray.map((cell, i) =>
					cell === 'empty' ? (
						<Cell key={i} id={i} handleClick={(e) => placeCard(e)} />
					) : (
						<Card key={i} card={cell} player={cell.user === 'cpu' ? p2 : p1} />
					)
				)}
			</div>
			<div className='player'>
				{p1Hand.map((card, i) => (
					<Card
						key={card._id}
						card={card}
						player={p1}
						handleClick={isP1Turn ? () => setCardSelected(card) : () => ''}
						turn={isP1Turn}
					/>
				))}
			</div>
		</div>
	)
}

export default Match
