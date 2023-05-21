import React, { useEffect, useState } from 'react'
import { Avatar, Card, Cell } from '../../components'
import './Battle.scss'
import { useGlobalContext } from '../../context/GlobalContext'
import { BiArrowFromBottom, BiArrowFromTop } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'
import { shuffleCards, dealCards } from '../../utils/shuffleAndDeal'
import { GiBroadheadArrow } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'

const Score = ({ playerScore, user }) => {
    const score = [...new Array(playerScore)]

    return (
        <div className={`${user}-score`}>
            {score.map((tick, i) => (
                <div key={'tick' + i}>{user === 'p1' ? '🔵' : '🔴'}</div>
            ))}
        </div>
    )
}

const Board = ({ board, placeCard, playerScores, isP1Turn }) => {
    return (
        <div className='board'>
            <div className='column'>
                <Score playerScore={playerScores.cpu} user='cpu' />
                <Score playerScore={playerScores.p1} user='p1' />
            </div>
            <div className='grid center'>
                {board.map((contents, i) =>
                    contents === 'empty' ? (
                        <Cell
                            key={i}
                            id={i}
                            handleClick={(e) => placeCard(e)}
                        />
                    ) : (
                        <Card
                            key={i}
                            card={contents}
                            owner={contents.user}
                            isShowing
                        />
                    )
                )}
            </div>
            <div className='column'>
                <GiBroadheadArrow
                    className={`turn-arrow ${isP1Turn ? 'down' : 'up'}`}
                />
            </div>
        </div>
    )
}

const Hand = ({
    playerHand,
    cardSelected,
    setCardSelected,
    user,
    isP1Turn,
}) => {
    const [cardsRaised, setCardsRaised] = useState(false)

    const selectCard = (card) => {
        if (card === cardSelected) {
            setCardSelected(null)
        } else {
            setCardSelected(card)
        }
    }

    const raiseCards = () => {
        setCardsRaised((current) => !current)
    }

    return (
        <div
            className={`${
                playerHand[0]?.user === user?._id ? 'p1 hand' : 'cpu hand'
            } ${cardsRaised ? 'raised' : ''}`}
        >
            {playerHand[0]?.user === user?._id &&
                (cardsRaised ? (
                    <BiArrowFromTop
                        className='down-arrow'
                        onClick={() => raiseCards()}
                    />
                ) : (
                    <BiArrowFromBottom
                        className='up-arrow'
                        onClick={() => raiseCards()}
                    />
                ))}
            {playerHand?.map((card, index) => (
                <Card
                    key={card?._id + index}
                    card={card}
                    isShowing={playerHand[0]?.user == user?._id ?? false}
                    isSelected={cardSelected?._id === card?._id}
                    handleClick={isP1Turn ? () => selectCard(card) : ''}
                />
            ))}
        </div>
    )
}

const Battle = () => {
    const { user, userDeck } = useGlobalContext()
    const { state } = useLocation()

    const WIDTH = 3
    const initialDecks = {
        p1: [],
        cpu: [],
    }
    const initialHands = {
        p1: [],
        cpu: [],
    }

    const initialBoard = [...new Array(WIDTH * WIDTH).fill('empty')]
    const [decks, setDecks] = useState(initialDecks)
    const [board, setBoard] = useState(initialBoard)
    const [emptyCells, setEmptyCells] = useState([
        ...new Array(WIDTH * WIDTH).keys(),
    ])
    const [hands, setHands] = useState(initialHands)
    const [cardSelected, setCardSelected] = useState(null)
    const [isP1Turn, setIsP1Turn] = useState(null)
    const [battleStarted, setBattleStarted] = useState(false)
    const [battleOver, setBattleOver] = useState(false)
    const [modalMessage, setModalMessage] = useState(null)
    const [scores, setScores] = useState({
        p1: 5,
        cpu: 5,
    })
    const leftColumn = [0, WIDTH, WIDTH * 2]
    const rightColumn = [WIDTH - 1, WIDTH * 2 - 1, WIDTH * 3 - 1]
    const table = [...hands.p1, ...board, ...hands.cpu]
    const navigate = useNavigate()

    let p1ScoreCounter = 0
    let p2ScoreCounter = 0

    useEffect(() => {
        setupBattle()
    }, [])

    const setupBattle = () => {
        shuffleCards([userDeck, state.opponentDeck])
        setDecks({
            p1: [...userDeck],
            cpu: [...state.opponentDeck],
        })
        let p1DealtCards = []
        let cpuDealtCards = []
        dealCards(p1DealtCards, userDeck)
        dealCards(cpuDealtCards, state.opponentDeck)
        setHands({
            p1: [...p1DealtCards],
            cpu: [...cpuDealtCards],
        })
        spinArrow()
    }

    const processBattles = (index, card) => {
        const up = board[index - WIDTH]
        const right = board[index + 1]
        const left = board[index - 1]
        const down = board[index + WIDTH]
        const values = card.values
        const winner = card.user

        if (up?._id) {
            if (up.values[2] < values[0]) {
                up.user = winner
            }
        }
        if (!leftColumn.includes(index) && left?._id) {
            if (left.values[1] < values[3]) {
                left.user = winner
            }
        }
        if (!rightColumn.includes(index) && right?._id) {
            if (right.values[3] < values[1]) {
                right.user = winner
            }
        }
        if (down?._id) {
            if (down.values[0] < values[2]) {
                down.user = winner
            }
        }
        emptyCells.forEach((cell, i) =>
            cell === index ? emptyCells.splice(i, 1) : ''
        )
        updateScores()
    }

    const updateScores = () => {
        table.forEach((card) => {
            if (card.user === user?._id) {
                p1ScoreCounter++
            } else if (card.user) {
                p2ScoreCounter++
            }
            setScores({ p1: p1ScoreCounter, cpu: p2ScoreCounter })
        })
        endTurn()
    }

    const endTurn = () => {
        setCardSelected(null)
        setIsP1Turn((current) => !current)
    }

    const checkForWin = () => {
        if (emptyCells.length === 0) {
            setTimeout(() => {
                if (scores.p1 > scores.cpu) {
                    setModalMessage('Victory')
                } else if (scores.p1 < scores.cpu) {
                    setModalMessage('Defeat')
                } else if (scores.p1 === scores.cpu) {
                    setModalMessage('Draw')
                }
                setBattleOver(true)
            }, 1000)
        }
    }

    useEffect(() => {
        checkForWin()
    }, [isP1Turn])

    const cpuMove = () => {
        const newBoardArray = board
        let newHand = hands.cpu
        let bestScore = -Infinity
        let move
        hands.cpu.forEach((card) => {
            emptyCells.forEach((cell) => {
                let score = 0
                const up = board[cell - WIDTH]
                const right = board[cell + 1]
                const left = board[cell - 1]
                const down = board[cell + WIDTH]
                const values = card.values

                // check cards user
                // scales

                if (cell !== 0 && cell !== 1 && cell !== 2 && up !== 'empty') {
                    if (up.values[2] < values[0]) {
                        score +=
                            100 + (parseInt(up.values[2]) - parseInt(values[0]))
                    }
                }
                if (cell !== 0 && cell !== 1 && cell !== 2 && up === 'empty') {
                    score += parseInt(values[0])
                }
                if (cell === 0 || cell === 1 || cell === 2) {
                    score -= parseInt(values[0])
                }

                if (
                    cell !== 0 &&
                    cell !== 3 &&
                    cell !== 6 &&
                    left !== 'empty'
                ) {
                    if (left.values[1] < values[3]) {
                        score +=
                            100 +
                            (parseInt(left.values[1]) - parseInt(values[3]))
                    }
                }

                if (
                    cell !== 0 &&
                    cell !== 3 &&
                    cell !== 6 &&
                    left === 'empty'
                ) {
                    score += parseInt(values[3])
                }
                if (cell === 0 || cell === 3 || cell === 6) {
                    score -= parseInt(values[3])
                }

                if (
                    cell !== 2 &&
                    cell !== 5 &&
                    cell !== 8 &&
                    right !== 'empty'
                ) {
                    if (right.values[3] < values[1]) {
                        score +=
                            100 +
                            (parseInt(right.values[3]) - parseInt(values[1]))
                    }
                }

                if (
                    cell !== 2 &&
                    cell !== 5 &&
                    cell !== 8 &&
                    right !== 'empty'
                ) {
                    score += parseInt(values[1])
                }
                if (cell === 2 || cell === 5 || cell === 8) {
                    score -= parseInt(values[1])
                }

                if (
                    cell !== 6 &&
                    cell !== 7 &&
                    cell !== 8 &&
                    down !== 'empty'
                ) {
                    if (down.values[0] < values[2]) {
                        score +=
                            100 +
                            (parseInt(down.values[0]) - parseInt(values[2]))
                    }
                }

                if (
                    cell !== 6 &&
                    cell !== 7 &&
                    cell !== 8 &&
                    down !== 'empty'
                ) {
                    score += parseInt(values[2])
                }
                if (cell === 6 || cell === 7 || cell === 8) {
                    score -= parseInt(values[2])
                }
                if (score > bestScore) {
                    bestScore = score
                    move = { card: card, cell: cell }
                }
            })
        })
        newBoardArray.splice(move.cell, 1, move.card)
        setBoard(newBoardArray)
        newHand.forEach((handCard, i) =>
            handCard._id === move.card._id ? hands.cpu.splice(i, 1) : ''
        )
        setHands({ ...hands, cpu: newHand })
        processBattles(move.cell, move.card)
    }

    useEffect(() => {
        if (
            battleStarted &&
            !isP1Turn &&
            emptyCells.length !== 0 &&
            hands.cpu.length > 0
        ) {
            setTimeout(() => {
                cpuMove()
            }, 1500)
        }
    }, [isP1Turn, hands.cpu])

    const spinArrow = () => {
        const arrowElement = document.querySelector('.turn-arrow')
        arrowElement.classList.add('start-game')
        setTimeout(() => {
            const randomFirstTurn =
                Math.random() < 0.5 ? setIsP1Turn(true) : setIsP1Turn(false)
            arrowElement.classList.remove('start-game')
            setBattleStarted(true)
        }, 1500)
    }

    const saveStateToLocalStorage = () => {
        localStorage.setItem(
            'battleState',
            JSON.stringify({
                decks,
                hands,
                board,
            })
        )
    }

    const restoreStateFromLocalStorage = () => {
        const savedState = localStorage.getItem('battleState')
        if (savedState) {
            const { decks, hands, board } = JSON.parse(savedState)
            setDecks(decks)
            setHands(hands)
            setBoard(board)
        }
    }

    const placeCard = (e) => {
        const index = parseInt(e.target.id)
        if (cardSelected) {
            const newBoard = [...board]
            const newHands = { ...hands }
            const handToUpdate = newHands[user._id === user._id ? 'p1' : 'cpu']
            const card = handToUpdate.find((c) => c._id === cardSelected._id)
            if (card) {
                const cardIndex = handToUpdate.indexOf(card)
                handToUpdate.splice(cardIndex, 1)
                newBoard[index] = card
                setHands(newHands)
                setBoard(newBoard)
                processBattles(index, cardSelected)
            }
        }
    }

    return (
        <div className='match page'>
            <div className='table'>
                <img
                    className='cpu-image'
                    src={state.opponent.image}
                    alt='cpu image '
                />
                <Hand
                    playerHand={hands.cpu}
                    cardSelected={cardSelected}
                    setCardSelected={setCardSelected}
                    user={user}
                />
                <Board
                    board={board}
                    placeCard={placeCard}
                    playerScores={scores}
                    isP1Turn={isP1Turn}
                />
                <Hand
                    playerHand={hands.p1}
                    cardSelected={cardSelected}
                    setCardSelected={setCardSelected}
                    user={user}
                    isP1Turn={isP1Turn}
                />
                <img
                    className='user-image'
                    src={user?.image}
                    alt='user image '
                />
                {battleOver && modalMessage && (
                    <div className='battle-over box'>
                        <span className='result'>{modalMessage}</span>
                        <div className='buttons'>
                            <button
                                className='box'
                                onClick={() => navigate('/battleSetup')}
                            >
                                Battle Select
                            </button>
                            <button
                                className='box'
                                onClick={() => navigate('/')}
                            >
                                Quit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Battle
