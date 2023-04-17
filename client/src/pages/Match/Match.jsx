import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContext'
import { useCPUCardContext } from '../../context/CPUCardContext'
import { useSettingsContext } from '../../context/SettingsContext'
import { shuffleCards, dealCards } from '../../../utils/shuffleAndDeal'
import { Card, Cell, TurnArrow } from '../../components'
import './Match.scss'

const width = 3

const Match = () => {
	const navigate = useNavigate()
	const { same, elements } = useSettingsContext()
	const { user, userDeck, allCards } = useGlobalContext()
	const { cpuDeck } = useCPUCardContext()

	const [p1Hand, setP1Hand] = useState([])
	const [p2Hand, setP2Hand] = useState([])
	const [boardArray, setBoardArray] = useState([
		...new Array(width * width).fill('empty'),
	])
	const [emptyCells, setEmptyCells] = useState(
		[...new Array(width * width).keys()].map((x) => x - 1 + 1)
	)
	const [randomElementArray, setRandomElementArray] = useState([
		...new Array(width * width),
	])
	const [cardSelected, setCardSelected] = useState(null)
	const [isP1Turn, setisP1Turn] = useState(Math.random() < 0.5 ? true : false)
	const [p1Score, setP1Score] = useState(5)
	const [p2Score, setP2Score] = useState(5)

	const table = [...p1Hand, ...boardArray, ...p2Hand]
	const p1 = 'p1'
	const p2 = 'cpu'
	const leftColumn = [0, width, width * 2]
	const rightColumn = [width - 1, width * 2 - 1, width * 3 - 1]
	const elementArray = []

	let p1ScoreCounter = 0
	let p2ScoreCounter = 0
	let winner = 'Stalemate'

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

	const setRandomElements = useCallback(() => {
		if (elements) {
			allCards.forEach((card) => {
				if (!elementArray.includes(card.element)) {
					elementArray.push(card.element)
				}
			})
			randomElementArray.forEach((cell, i) => {
				const randomElement =
					elementArray[Math.floor(Math.random() * elementArray.length)]
				randomElementArray.splice(i, 1, randomElement)
			})
		}
	}, [])

	useEffect(() => {
		newGame()
		setRandomElements()
	}, [])

	const selectCard = (e, card) => {
		let previouslySelected = document.querySelector('.selected')
		previouslySelected && previouslySelected.classList.remove('selected')
		e.target.classList.add('selected')
		setCardSelected(card)
	}

	const placeCard = (e) => {
		const index = parseInt(e.target.id)
		if (cardSelected) {
			checkElements(index, cardSelected)
			boardArray.splice(index, 1, cardSelected)
			processBattles(index, cardSelected)
			p1Hand.forEach((card, i) =>
				card._id === cardSelected._id ? p1Hand.splice(i, 1) : ''
			)
		}
	}

	const checkElements = (index, card) => {
		if (elements && randomElementArray[index] === card.element) {
			card.values.forEach((value, i) => {
				if (value !== 'A') {
					card.values.splice(i, 1, parseInt(value) + 1)
				}
			})
			card.power = 'harmony'
		}
	}

	const processBattles = (index, card) => {
		const up = boardArray[index - width]
		const right = boardArray[index + 1]
		const left = boardArray[index - 1]
		const down = boardArray[index + width]
		const values = card.values
		const winner = card.user

		if (up?._id) {
			if (same) {
				if (up.values[2] <= values[0]) {
					up.user = winner
				}
			} else {
				if (up.values[2] < values[0]) {
					up.user = winner
				}
			}
		}
		if (!leftColumn.includes(index) && left?._id) {
			if (same) {
				if (left.values[1] <= values[3]) {
					left.user = winner
				}
			} else {
				if (left.values[1] < values[3]) {
					left.user = winner
				}
			}
		}
		if (!rightColumn.includes(index) && right?._id) {
			if (same) {
				if (right.values[3] <= values[1]) {
					right.user = winner
				}
			} else {
				if (right.values[3] < values[1]) {
					right.user = winner
				}
			}
		}
		if (down?._id) {
			if (same) {
				if (down.values[0] <= values[2]) {
					down.user = winner
				}
			} else {
				if (down.values[0] < values[2]) {
					down.user = winner
				}
			}
		}
		emptyCells.forEach((cell, i) =>
			cell === index ? emptyCells.splice(i, 1) : ''
		)
		updateScores()
	}

	const updateScores = () => {
		table.forEach((card) => {
			if (card.user === 'cpu') {
				p2ScoreCounter++
			} else if (card.user === user._id) {
				p1ScoreCounter++
			}
			setP1Score(p1ScoreCounter)
			setP2Score(p2ScoreCounter)
		})
		endTurn()
	}

	const endTurn = () => {
		setCardSelected(null)
		setisP1Turn((current) => !current)
	}

	const cpuMove = () => {
		const newBoardArray = boardArray
		let newHand = p2Hand
		let bestScore = -Infinity
		let move
		p2Hand.forEach((card) => {
			emptyCells.forEach((cell) => {
				let score = 0
				const up = boardArray[cell - width]
				const right = boardArray[cell + 1]
				const left = boardArray[cell - 1]
				const down = boardArray[cell + width]
				const values = card.values
				checkElements(cell, card)

				// check cards user
				// scales
				if (same) {
					if (cell !== 0 && cell !== 1 && cell !== 2 && up !== 'empty') {
						if (up.values[2] <= values[0]) {
							score += 100 + (parseInt(up.values[2]) - parseInt(values[0]))
						}
					}
				} else {
					if (cell !== 0 && cell !== 1 && cell !== 2 && up !== 'empty') {
						if (up.values[2] < values[0]) {
							score += 100 + (parseInt(up.values[2]) - parseInt(values[0]))
						}
					}
				}
				if (cell !== 0 && cell !== 1 && cell !== 2 && up === 'empty') {
					score += parseInt(values[0])
				}
				if (cell === 0 || cell === 1 || cell === 2) {
					score -= parseInt(values[0])
				}

				if (same) {
					if (cell !== 0 && cell !== 3 && cell !== 6 && left !== 'empty') {
						if (left.values[1] <= values[3]) {
							score += 100 + (parseInt(left.values[1]) - parseInt(values[3]))
						}
					}
				} else {
					if (cell !== 0 && cell !== 3 && cell !== 6 && left !== 'empty') {
						if (left.values[1] < values[3]) {
							score += 100 + (parseInt(left.values[1]) - parseInt(values[3]))
						}
					}
				}
				if (cell !== 0 && cell !== 3 && cell !== 6 && left === 'empty') {
					score += parseInt(values[3])
				}
				if (cell === 0 || cell === 3 || cell === 6) {
					score -= parseInt(values[3])
				}

				if (same) {
					if (cell !== 2 && cell !== 5 && cell !== 8 && right !== 'empty') {
						if (right.values[3] <= values[1]) {
							score += 100 + (parseInt(right.values[3]) - parseInt(values[1]))
						}
					}
				} else {
					if (cell !== 2 && cell !== 5 && cell !== 8 && right !== 'empty') {
						if (right.values[3] < values[1]) {
							score += 100 + (parseInt(right.values[3]) - parseInt(values[1]))
						}
					}
				}

				if (cell !== 2 && cell !== 5 && cell !== 8 && right !== 'empty') {
					score += parseInt(values[1])
				}
				if (cell === 2 || cell === 5 || cell === 8) {
					score -= parseInt(values[1])
				}

				if (same) {
					if (cell !== 6 && cell !== 7 && cell !== 8 && down !== 'empty') {
						if (down.values[0] <= values[2]) {
							score += 100 + (parseInt(down.values[0]) - parseInt(values[2]))
						}
					}
				} else {
					if (cell !== 6 && cell !== 7 && cell !== 8 && down !== 'empty') {
						if (down.values[0] < values[2]) {
							score += 100 + (parseInt(down.values[0]) - parseInt(values[2]))
						}
					}
				}
				if (cell !== 6 && cell !== 7 && cell !== 8 && down !== 'empty') {
					score += parseInt(values[2])
				}
				if (cell === 6 || cell === 7 || cell === 8) {
					score -= parseInt(values[2])
				}
				p2Hand.forEach((card) => {
					if (card.power === 'harmony') {
						card.values.forEach((value, i) => {
							if (value !== 'A') {
								card.values.splice(i, 1, parseInt(value) - 1)
							}
						})
						card.power = ''
					}
				})
				if (score > bestScore) {
					bestScore = score
					move = { card: card, cell: cell }
				}
			})
		})
		checkElements(move.cell, move.card)
		newBoardArray.splice(move.cell, 1, move.card)
		setBoardArray(newBoardArray)
		newHand.forEach((handCard, i) =>
			handCard._id === move.card._id ? p2Hand.splice(i, 1) : ''
		)
		setP2Hand(newHand)
		processBattles(move.cell, move.card)
	}

	useEffect(() => {
		if (!isP1Turn && emptyCells.length !== 0 && p2Hand.length > 0) {
			setTimeout(() => {
				cpuMove()
			}, 1500)
		}
	}, [isP1Turn, p2Hand])

	const checkForWin = () => {
		if (emptyCells.length === 0) {
			setTimeout(() => {
				if (p1Score > p2Score) {
					winner = 'Victory'
				} else if (p1Score < p2Score) {
					winner = 'Defeat'
				} else if (p1Score === p2Score) {
				}
				navigate('/matchEnd', {
					state: {
						winner: winner,
						p1Score: p1Score,
						p2Score: p2Score,
					},
				})
			}, 1000)
		}
	}

	useEffect(() => {
		checkForWin()
	}, [isP1Turn])

	return (
		<div className='match page'>
			<div className='cpu'>
				{p2Hand.map((card, i) => (
					<Card
						key={card._id + i}
						card={card}
						player={p2}
						turn={!isP1Turn}
						visibility={false}
					/>
				))}
			</div>
			<div className='column'>
				<span className='match__score'>{p2Score} </span>
				{!isP1Turn && emptyCells.length > 0 && <TurnArrow turn={isP1Turn} />}
			</div>
			<div className='space' />
			<div className='grid'>
				{boardArray.map((cell, i) =>
					cell === 'empty' ? (
						<Cell
							key={i}
							id={i}
							handleClick={(e) => placeCard(e)}
							element={elements && randomElementArray[i]}
						/>
					) : (
						<Card
							key={i}
							card={cell}
							player={cell.user === 'cpu' ? p2 : p1}
							visibility={true}
						/>
					)
				)}
			</div>
			<div className='column'>
				<span className='match__score'>{p1Score} </span>
				{isP1Turn && emptyCells.length > 0 && <TurnArrow turn={isP1Turn} />}
			</div>
			<div className='player'>
				{p1Hand.map((card, i) => (
					<Card
						key={card._id + i}
						card={card}
						player={p1}
						handleClick={(e) => selectCard(e, card)}
						turn={isP1Turn}
						visibility={true}
					/>
				))}
			</div>
		</div>
	)
}

export default Match
