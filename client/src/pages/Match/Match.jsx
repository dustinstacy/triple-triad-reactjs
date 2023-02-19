import React, { useCallback, useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { useCPUCardContext } from '../../context/CPUCardContext'
import { useSettingsContext } from '../../context/SettingsContext'
import { shuffleCards, dealCards } from '../../../../utils/shuffleAndDeal'
import { Card, Cell } from '../../components'
import './Match.scss'

const width = 3

const Match = () => {
	const { same, elements, rounds } = useSettingsContext()
	const { userDeck, allCards } = useGlobalContext()
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
	const [roundsLeft, setRoundsLeft] = useState(parseInt(rounds) - 1)

	const table = [...p1Hand, ...boardArray, ...p2Hand]
	const p1 = 'p1'
	const p2 = 'cpu'
	const emptyCells = []
	const elementArray = []

	boardArray.forEach((cell, i) => (cell === 'empty' ? emptyCells.push(i) : ''))

	let p1ScoreCounter = 0
	let p2ScoreCounter = 0
	let winner = 'Draw'

	const reset = () => {
		setP1Hand([])
		setP2Hand([])
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
			checkElements(index)
			newBoardArray.splice(index, 1, cardSelected)
			newHand.forEach((card, i) =>
				card._id === cardSelected._id ? newHand.splice(i, 1) : ''
			)
			setP1Hand(newHand)
			setBoardArray(newBoardArray)
			processBattles(index)
		}
	}

	const checkElements = (index) => {
		if (elements && randomElementArray[index] === cardSelected.element) {
			cardSelected.values.forEach((value, i) => {
				const newValue = parseInt(value) + 1
				cardSelected.values.splice(i, 1, newValue)
			})
			cardSelected.power = 'harmony'
		}
	}

	const processBattles = (index) => {
		const card = cardSelected
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
			} else if (card.user === '63e0159760773620ef998e62') {
				p1ScoreCounter++
			}
		})
		setP1Score(p1ScoreCounter)
		setP2Score(p2ScoreCounter)
		checkForWin()
	}

	const checkForWin = () => {
		if (emptyCells.length <= 1) {
			setRoundsLeft((current) => (current -= 1))
			console.log(roundsLeft)
			if (roundsLeft === 0) {
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
			} else {
				reset()
				const p1DealtCards = []
				const p2DealtCards = []
				console.log(p1DealtCards)
				dealCards(p1DealtCards, userDeck)
				dealCards(p2DealtCards, cpuDeck)
				setP1Hand(p1DealtCards)
				setP2Hand(p2DealtCards)
			}
		} else {
			endTurn()
		}
	}

	const endTurn = () => {
		setCardSelected(null)
		setisP1Turn((current) => !current)
	}

	const cpuTurn = () => {
		setTimeout(() => {
			const newBoardArray = boardArray
			const randomCell =
				emptyCells[Math.floor(Math.random() * emptyCells.length)]
			checkElements(randomCell)
			newBoardArray.splice(randomCell, 1, cardSelected)
			setBoardArray(newBoardArray)

			let newHand = p2Hand
			newHand.forEach((card, i) =>
				card._id === cardSelected._id ? p2Hand.splice(i, 1) : ''
			)
			setP2Hand(newHand)
			processBattles(randomCell)
		}, 1500)
	}

	useEffect(() => {
		if (!isP1Turn && emptyCells.length > 0) {
			const randomCard = p2Hand[Math.floor(Math.random() * p2Hand.length)]
			setCardSelected(randomCard)
		}
	}, [isP1Turn])

	useEffect(() => {
		if (!isP1Turn && cardSelected) {
			cpuTurn()
		}
	}, [cardSelected])

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
