import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContext'
import { useCPUCardContext } from '../../context/CPUCardContext'
import { useSettingsContext } from '../../context/SettingsContext'
import { shuffleCards, dealCards } from '../../../../utils/shuffleAndDeal'
import { Card, Cell } from '../../components'
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
	const [randomElementArray, setRandomElementArray] = useState([
		...new Array(width * width),
	])
	const [cardSelected, setCardSelected] = useState(null)
	const [isP1Turn, setisP1Turn] = useState(true)
	const [p1Score, setP1Score] = useState(5)
	const [p2Score, setP2Score] = useState(5)

	const table = [...p1Hand, ...boardArray, ...p2Hand]
	const p1 = 'p1'
	const p2 = 'cpu'
	const emptyCells = []
	const elementArray = []

	let p1ScoreCounter = 0
	let p2ScoreCounter = 0
	let winner = 'Draw'

	const reset = () => {
		setP1Hand([])
		setP2Hand([])
		setP1Score(5)
		setP2Score(5)
		setBoardArray([...new Array(9).fill('empty')])
		setCardSelected(null)
		setisP1Turn(true)
	}

	const newGame = () => {
		reset()
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
		setRandomElements()
	}, [])

	const setRandomElements = useCallback(() => {
		const newElementArray = randomElementArray

		allCards.forEach((card) => {
			if (!elementArray.includes(card.element)) {
				elementArray.push(card.element)
			}
		})

		newElementArray.forEach((cell, i) => {
			const randomElement =
				elementArray[Math.floor(Math.random() * elementArray.length)]
			newElementArray.splice(i, 1, randomElement)
		})

		setRandomElementArray(newElementArray)
	}, [])

	const selectCard = (e, card) => {
		let previouslySelected = document.querySelector('.selected')
		previouslySelected ? previouslySelected.classList.remove('selected') : ''
		e.target.classList.add('selected')
		setCardSelected(card)
	}

	const placeCard = (e) => {
		const newBoardArray = boardArray
		const index = parseInt(e.target.id)
		let newHand = p1Hand
		if (cardSelected) {
			checkElements(index, cardSelected)
			newBoardArray.splice(index, 1, cardSelected)
			newHand.forEach((card, i) =>
				card._id === cardSelected._id ? newHand.splice(i, 1) : ''
			)
			setP1Hand(newHand)
			setBoardArray(newBoardArray)
			processBattles(index, cardSelected)
		}
	}

	const checkElements = (index, card) => {
		if (elements && randomElementArray[index] === card.element) {
			card.values.forEach((value, i) => {
				const newValue = parseInt(value) + 1
				card.values.splice(i, 1, newValue)
			})
			card.power = 'harmony'
		}
	}

	const processBattles = (index, card) => {
		const up = boardArray[index - width]
		const right = boardArray[index + 1]
		const left = boardArray[index - 1]
		const down = boardArray[index + width]

		if (same) {
			if (index !== 0 && index !== 1 && index !== 2 && up !== 'empty') {
				if (up.values[2] <= card.values[0]) {
					up.user = card.user
				}
			}
			if (index !== 0 && index !== 3 && index !== 6 && left !== 'empty') {
				if (left.values[1] <= card.values[3]) {
					left.user = card.user
				}
			}
			if (index !== 2 && index !== 5 && index !== 8 && right !== 'empty') {
				if (right.values[3] <= card.values[1]) {
					right.user = card.user
				}
			}
			if (index !== 6 && index !== 7 && index !== 8 && down !== 'empty') {
				if (down.values[0] <= card.values[2]) {
					down.user = card.user
				}
			}
		} else {
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

		updateScores()
	}

	const updateScores = () => {
		table.forEach((card) => {
			if (card.user === 'cpu') {
				p2ScoreCounter++
			} else if (card.user === user._id) {
				p1ScoreCounter++
			}
		})
		setP1Score(p1ScoreCounter)
		setP2Score(p2ScoreCounter)
		checkForWin()
	}

	const checkForWin = () => {
		if (emptyCells.length <= 1) {
			console.log('game over')
			if (p1Score > p2Score) {
				console.log('p1 wins')
				winner = 'Player One Wins!'
			} else if (p1Score < p2Score) {
				console.log('p2 wins')
				winner = 'Player Two Wins!'
			} else if (p1Score === p2Score) {
				console.log('Draw')
			}
			setTimeout(() => {
				navigate('/matchEnd')
			}, 1500)
		} else {
			endTurn()
		}
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

				if (same) {
					if (cell !== 0 && cell !== 1 && cell !== 2 && up !== 'empty') {
						if (up.values[2] <= card.values[0]) {
							score += 100 + (up.values[2] - card.values[0].replace(/A/g, 10))
						}
					}
				} else {
					if (cell !== 0 && cell !== 1 && cell !== 2 && up !== 'empty') {
						if (up.values[2] < card.values[0]) {
							score += 100 + (up.values[2] - card.values[0].replace(/A/g, 10))
						}
					}
				}
				if (cell !== 0 && cell !== 1 && cell !== 2 && up === 'empty') {
					score += card.values[0].replace(/A/g, 10)
				}
				if (cell === 0 || cell === 1 || cell === 2) {
					score -= card.values[0].replace(/A/g, 10)
				}

				if (same) {
					if (cell !== 0 && cell !== 3 && cell !== 6 && left !== 'empty') {
						if (left.values[1] <= card.values[3]) {
							score += 100 + (left.values[1] - card.values[3].replace(/A/g, 10))
						}
					}
				} else {
					if (cell !== 0 && cell !== 3 && cell !== 6 && left !== 'empty') {
						if (left.values[1] < card.values[3]) {
							score += 100 + (left.values[1] - card.values[3].replace(/A/g, 10))
						}
					}
				}
				if (cell !== 0 && cell !== 3 && cell !== 6 && left === 'empty') {
					score += card.values[3].replace(/A/g, 10)
				}
				if (cell === 0 || cell === 3 || cell === 6) {
					score -= card.values[3].replace(/A/g, 10)
				}

				if (same) {
					if (cell !== 2 && cell !== 5 && cell !== 8 && right !== 'empty') {
						if (right.values[3] <= card.values[1]) {
							score +=
								100 + (right.values[3] - card.values[1].replace(/A/g, 10))
						}
					}
				} else {
					if (cell !== 2 && cell !== 5 && cell !== 8 && right !== 'empty') {
						if (right.values[3] < card.values[1]) {
							score +=
								100 + (right.values[3] - card.values[1].replace(/A/g, 10))
						}
					}
				}

				if (cell !== 2 && cell !== 5 && cell !== 8 && right !== 'empty') {
					score += card.values[1].replace(/A/g, 10)
				}
				if (cell === 2 || cell === 5 || cell === 8) {
					score -= card.values[1].replace(/A/g, 10)
				}

				if (same) {
					if (cell !== 6 && cell !== 7 && cell !== 8 && down !== 'empty') {
						if (down.values[0] <= card.values[2]) {
							score += 100 + (down.values[0] - card.values[2].replace(/A/g, 10))
						}
					}
				} else {
					if (cell !== 6 && cell !== 7 && cell !== 8 && down !== 'empty') {
						if (down.values[0] < card.values[2]) {
							score += 100 + (down.values[0] - card.values[2].replace(/A/g, 10))
						}
					}
				}
				if (cell !== 6 && cell !== 7 && cell !== 8 && down !== 'empty') {
					score += card.values[2].replace(/A/g, 10)
				}
				if (cell === 6 || cell === 7 || cell === 8) {
					score -= card.values[2].replace(/A/g, 10)
				}

				if (score > bestScore) {
					bestScore = score
					move = { card: card, cell: cell }
				}
			})
		})
		newBoardArray.splice(move.cell, 1, move.card)
		setBoardArray(newBoardArray)
		newHand.forEach((handCard, i) =>
			handCard._id === move.card._id ? p2Hand.splice(i, 1) : ''
		)
		setP2Hand(newHand)
		processBattles(move.cell, move.card)
	}

	useEffect(() => {
		if (!isP1Turn) {
			setTimeout(() => {
				cpuMove()
			}, 1500)
		}
	}, [isP1Turn])

	boardArray.forEach((cell, i) => (cell === 'empty' ? emptyCells.push(i) : ''))

	return (
		<div className='match page'>
			<div className='cpu'>
				{p2Hand.map((card, i) => (
					<Card key={card._id + i} card={card} player={p2} turn={!isP1Turn} />
				))}
			</div>
			<span className='match__score'>{p2Score}</span>
			<div className='grid'>
				{boardArray.map((cell, i) =>
					cell === 'empty' ? (
						<Cell
							key={i}
							id={i}
							handleClick={(e) => placeCard(e)}
							element={randomElementArray[i]}
						/>
					) : (
						<Card key={i} card={cell} player={cell.user === 'cpu' ? p2 : p1} />
					)
				)}
			</div>
			<span className='match__score'>{p1Score}</span>
			<div className='player'>
				{p1Hand.map((card, i) => (
					<Card
						key={card._id + i}
						card={card}
						player={p1}
						handleClick={(e) => selectCard(e, card)}
						turn={isP1Turn}
					/>
				))}
			</div>
		</div>
	)
}

export default Match
