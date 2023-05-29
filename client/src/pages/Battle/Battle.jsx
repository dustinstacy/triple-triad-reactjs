import React, { useEffect, useState } from 'react'
import { Card, Cell } from '../../components'
import './Battle.scss'
import { useGlobalContext } from '../../context/GlobalContext'
import { BiArrowFromBottom, BiArrowFromTop } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'
import { shuffleCards, dealCards } from '../../utils/shuffleAndDeal'
import { useNavigate } from 'react-router-dom'
import { blueScore, redScore, turnArrow } from '../../assets/icons'

const Score = ({ playerScore, player }) => {
    const score = [...new Array(playerScore)]

    return (
        <div className={`${player}-score`}>
            {score.map((count, i) => (
                <div key={'count' + i}>
                    {player === 'p1' ? (
                        <img src={blueScore} alt='blue score' />
                    ) : (
                        <img src={redScore} alt='red score' />
                    )}
                </div>
            ))}
        </div>
    )
}

const Board = ({ board, placeCard, playerScores, isP1Turn }) => {
    return (
        <div className='board'>
            <div className='column'>
                <Score playerScore={playerScores.cpu} player='cpu' />
                <Score playerScore={playerScores.p1} player='p1' />
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
                <img
                    className={`turn-arrow ${isP1Turn ? 'down' : 'up'}`}
                    src={turnArrow}
                    alt='turn arrow'
                />
            </div>
        </div>
    )
}

const Hand = ({
    player,
    playerHand,
    user,
    cardSelected,
    setCardSelected,
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
            className={`${player === 'p1' ? 'p1 hand' : 'cpu hand'} ${
                cardsRaised ? 'raised' : ''
            }`}
        >
            {player === 'p1' &&
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
                    user={user}
                    isShowing={player == 'p1' ?? false}
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
    const navigate = useNavigate()

    const WIDTH = 3

    const [decks, setDecks] = useState({
        p1: [],
        cpu: [],
    })
    const [hands, setHands] = useState({
        p1: [],
        cpu: [],
    })
    const [board, setBoard] = useState([
        ...new Array(WIDTH * WIDTH).fill('empty'),
    ])
    const [emptyCells, setEmptyCells] = useState([
        ...new Array(WIDTH * WIDTH).keys(),
    ])

    const [cardSelected, setCardSelected] = useState(null)
    const [isP1Turn, setIsP1Turn] = useState(null)
    const [scores, setScores] = useState({
        p1: 5,
        cpu: 5,
    })

    const [battleStarted, setBattleStarted] = useState(false)
    const [battleOver, setBattleOver] = useState(false)
    const [modalMessage, setModalMessage] = useState(null)

    const table = [...hands.p1, ...board, ...hands.cpu]
    const leftColumn = [0, WIDTH, WIDTH * 2]
    const rightColumn = [WIDTH - 1, WIDTH * 2 - 1, WIDTH * 3 - 1]

    let p1ScoreCounter = 0
    let cpuScoreCounter = 0

    useEffect(() => {
        const savedState = localStorage.getItem('battleState')
        if (savedState) {
            restoreStateFromLocalStorage(savedState)
        } else {
            setupBattle()
        }
    }, [])

    useEffect(() => {
        if (battleStarted === true) {
            saveStateToLocalStorage()
        }
    }, [battleStarted])

    useEffect(() => {
        if (battleOver === true) {
            removeStateFromLocalStorage()
        }
    }, [battleOver])

    const restoreStateFromLocalStorage = (savedState) => {
        const { decks, hands, board, isP1Turn } = JSON.parse(savedState)
        setDecks(decks)
        setHands(hands)
        setBoard(board)
        setIsP1Turn(isP1Turn)
        setBattleStarted(true)
    }

    const saveStateToLocalStorage = () => {
        localStorage.setItem(
            'battleState',
            JSON.stringify({
                decks,
                hands,
                board,
                isP1Turn,
                battleStarted,
            })
        )
    }

    const removeStateFromLocalStorage = () => {
        localStorage.removeItem('battleState')
    }

    const setupBattle = () => {
        shuffleDecks()
        dealHands()
        randomFirstTurn()
    }

    const shuffleDecks = () => {
        shuffleCards([userDeck, state.opponentDeck])
        setDecks({
            p1: [...userDeck],
            cpu: [...state.opponentDeck],
        })
    }

    const dealHands = () => {
        let p1DealtCards = []
        let cpuDealtCards = []
        dealCards(p1DealtCards, userDeck)
        dealCards(cpuDealtCards, state.opponentDeck)
        setHands({
            p1: [...p1DealtCards],
            cpu: [...cpuDealtCards],
        })
    }

    const randomFirstTurn = () => {
        const arrowElement = document.querySelector('.turn-arrow')
        arrowElement.classList.add('start-game')
        setTimeout(() => {
            Math.random() < 0.5 ? setIsP1Turn(true) : setIsP1Turn(false)
            arrowElement.classList.remove('start-game')
            setBattleStarted(true)
        }, 1000)
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
            if (card.number) {
                cpuScoreCounter++
            } else if (card.image) {
                p1ScoreCounter++
            }
            setScores({ p1: p1ScoreCounter, cpu: cpuScoreCounter })
        })
        endTurn()
    }

    const endTurn = () => {
        setCardSelected(null)
        setIsP1Turn((current) => !current)
    }

    useEffect(() => {
        checkForWin()
    }, [isP1Turn])

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
        } else if (emptyCells.length < 9) {
            saveStateToLocalStorage()
        }
    }

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

    return (
        <div className='match page'>
            <div className='table'>
                <Hand
                    player='cpu'
                    playerHand={hands.cpu}
                    user={state.opponent}
                    cardSelected={cardSelected}
                    setCardSelected={setCardSelected}
                />
                <Board
                    board={board}
                    placeCard={placeCard}
                    playerScores={scores}
                    isP1Turn={isP1Turn}
                />
                <Hand
                    player='p1'
                    playerHand={hands.p1}
                    user={user}
                    cardSelected={cardSelected}
                    setCardSelected={setCardSelected}
                    isP1Turn={isP1Turn}
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
