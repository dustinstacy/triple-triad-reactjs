import React, { useEffect, useState } from 'react'
import { Card, Cell } from '../../components'
import './Battle.scss'
import { useGlobalContext } from '../../context/GlobalContext'
import { BiArrowFromBottom, BiArrowFromTop, BiBath } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'
import { shuffleCards, dealCards } from '../../utils/shuffleAndDeal'

import { blueScore, redScore, turnArrow } from '../../assets/icons'

const Score = ({ player }) => {
    const { name, score } = player
    const playerScore = [...new Array(score)]

    return (
        <div className={`${name}-score`}>
            {playerScore.map((count, i) => (
                <div key={'count' + i}>
                    {name === 'p1' ? (
                        <img src={blueScore} alt='blue score' />
                    ) : (
                        <img src={redScore} alt='red score' />
                    )}
                </div>
            ))}
        </div>
    )
}

const Board = ({ playerOne, playerTwo, battleState, placeCard }) => {
    const { board, isP1Turn } = battleState

    return (
        <div className='board'>
            <div className='column center'>
                <Score player={playerTwo} />
                <Score player={playerOne} />
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
                        <Card key={i} card={contents} isShowing />
                    )
                )}
            </div>
            <div className='column center'>
                <img
                    className={`turn-arrow ${isP1Turn ? 'down' : 'up'}`}
                    src={turnArrow}
                    alt='turn arrow'
                />
            </div>
        </div>
    )
}

const Hand = ({ player, battleState, cardSelected, setCardSelected }) => {
    const { hand, name } = player
    const [cardsRaised, setCardsRaised] = useState(false)

    const selectCard = (card) => {
        if (card === cardSelected) {
            setCardSelected(null)
        } else {
            setCardSelected(card)
        }
    }

    return (
        <div
            className={`${name === 'p1' ? 'p1 hand' : 'p2 hand'} ${
                cardsRaised ? 'raised' : ''
            }`}
        >
            {name === 'p1' &&
                (cardsRaised ? (
                    <BiArrowFromTop
                        className='down-arrow'
                        onClick={() => setCardsRaised((current) => !current)}
                    />
                ) : (
                    <BiArrowFromBottom
                        className='up-arrow'
                        onClick={() => setCardsRaised((current) => !current)}
                    />
                ))}
            {hand?.map((card, index) => (
                <Card
                    key={card?._id + index}
                    card={card}
                    isShowing={name == 'p1' ?? false}
                    isSelected={cardSelected?._id === card?._id}
                    handleClick={
                        battleState.isP1Turn ? () => selectCard(card) : ''
                    }
                />
            ))}
        </div>
    )
}

const Battle = () => {
    const { user, userDeck } = useGlobalContext()
    const location = useLocation()
    const { opponent, opponentDeck } = location.state || {}

    const [playerOne, setPlayerOne] = useState({
        user: user,
        name: 'p1',
        deck: [],
        hand: [],
        score: 0,
    })

    const [playerTwo, setPlayerTwo] = useState({
        user: opponent,
        name: 'p2',
        deck: [],
        hand: [],
        score: 0,
    })

    const [battleState, setBattleState] = useState({
        board: [...new Array(9).fill('empty')],
        emptyCells: [...new Array(9).keys()],
        decksShuffled: false,
        handsDealt: false,
        battleStarted: false,
        isP1Turn: null,
        battleOver: false,
        battleResultMessage: null,
    })

    const [cardSelected, setCardSelected] = useState(null)

    const {
        board,
        emptyCells,
        decksShuffled,
        handsDealt,
        battleStarted,
        isP1Turn,
        battleOver,
        battleResultMessage,
    } = battleState

    const table = [...playerTwo.hand, ...board, ...playerOne.hand]
    const leftColumn = [0, 3, 6]
    const rightColumn = [2, 5, 8]

    const updateState = (setState, updates) => {
        setState((state) => ({ ...state, ...updates }))
    }

    useEffect(() => {
        const savedState = localStorage.getItem('battleState')
        if (savedState) {
            restoreStateFromLocalStorage(savedState)
        } else {
            console.log('ran')
            setupBattle()
        }
    }, [])

    const restoreStateFromLocalStorage = (savedState) => {
        const { playerOne, playerTwo, battleState } = JSON.parse(savedState)
        setPlayerOne(playerOne)
        setPlayerTwo(playerTwo)
        setBattleState(battleState)
    }

    const setupBattle = () => {
        shuffleDecks()
    }

    const shuffleDecks = () => {
        shuffleCards([userDeck, opponentDeck])
        updateState(setPlayerOne, { deck: [...userDeck] })
        updateState(setPlayerTwo, { deck: [...userDeck] })
        updateState(setBattleState, { decksShuffled: true })
    }

    useEffect(() => {
        if (decksShuffled === true && battleStarted === false) {
            dealHands()
        }
    }, [decksShuffled])

    const dealHands = () => {
        dealCards(playerOne.deck, playerOne.hand)
        dealCards(playerTwo.deck, playerTwo.hand)
        updateState(setPlayerOne, {
            deck: [...playerOne.deck],
            hand: [...playerOne.hand],
            score: playerOne.hand.length,
        })
        updateState(setPlayerTwo, {
            deck: [...playerTwo.deck],
            hand: [...playerTwo.hand],
            score: playerTwo.hand.length,
        })
        updateState(setBattleState, { handsDealt: true })
    }

    useEffect(() => {
        if ((handsDealt === true) & (battleStarted === false)) {
            randomFirstTurn()
        }
    }, [handsDealt])

    const randomFirstTurn = () => {
        const arrowElement = document.querySelector('.turn-arrow')
        arrowElement.classList.add('start-game')
        setTimeout(() => {
            Math.random() < 0.5
                ? updateState(setBattleState, { isP1Turn: true })
                : updateState(setBattleState, { isP1Turn: false })
            arrowElement.classList.remove('start-game')
            updateState(setBattleState, { battleStarted: true })
        }, 1000)
    }

    useEffect(() => {
        if (battleStarted === true) {
            saveStateToLocalStorage()
        }
    }, [battleStarted])

    const saveStateToLocalStorage = () => {
        localStorage.setItem(
            'battleState',
            JSON.stringify({
                playerOne,
                playerTwo,
                battleState,
            })
        )
    }

    useEffect(() => {
        if (battleOver === true) {
            removeStateFromLocalStorage()
        }
    }, [battleOver])

    const removeStateFromLocalStorage = () => {
        localStorage.removeItem('battleState')
    }

    const placeCard = (e) => {
        const index = parseInt(e.target.id)
        if (cardSelected) {
            const updatedBoard = [...board]
            const updatedHand = [...playerOne.hand]
            const card = playerOne.hand.find(
                (card) => card._id === cardSelected._id
            )
            if (card) {
                const cardIndex = updatedHand.indexOf(card)
                updatedHand.splice(cardIndex, 1)
                updatedBoard[index] = card
                updateState(setPlayerOne, { hand: [...updatedHand] })
                updateState(setBattleState, { board: [...updatedBoard] })
                processBattles(index, cardSelected)
            }
        }
    }

    // const processBattles = (index, card) => {
    //     const up = board[index - WIDTH]
    //     const right = board[index + 1]
    //     const left = board[index - 1]
    //     const down = board[index + WIDTH]
    //     const values = card.values
    //     const winner = card.user

    //     if (up?._id) {
    //         if (up.values[2] < values[0]) {
    //             up.user = winner
    //         }
    //     }
    //     if (!leftColumn.includes(index) && left?._id) {
    //         if (left.values[1] < values[3]) {
    //             left.user = winner
    //         }
    //     }
    //     if (!rightColumn.includes(index) && right?._id) {
    //         if (right.values[3] < values[1]) {
    //             right.user = winner
    //         }
    //     }
    //     if (down?._id) {
    //         if (down.values[0] < values[2]) {
    //             down.user = winner
    //         }
    //     }
    //     emptyCells.forEach((cell, i) =>
    //         cell === index ? emptyCells.splice(i, 1) : ''
    //     )
    //     updateScores()
    // }

    // useEffect(() => {
    //     let p1Score = 0
    //     let p2Score = 0

    //     table.forEach((card) => {
    //         if (card?.user._id === user?._id) {
    //             p1Score++
    //         } else if (card?.user.name === opponent?.name) {
    //             p2Score++
    //         }
    //         updateState(setPlayerOne, { score: p1Score })
    //         updateState(setPlayerTwo, { score: p2Score })
    //     })
    // }, [board])

    // const endTurn = () => {
    //     setCardSelected(null)
    //     setIsP1Turn((current) => !current)
    // }

    // useEffect(() => {
    //     checkForWin()
    // }, [isP1Turn])

    // const checkForWin = () => {
    //     if (emptyCells.length === 0) {
    //         setTimeout(() => {
    //             if (scores.p1 > scores.cpu) {
    //                 setModalMessage('Victory')
    //             } else if (scores.p1 < scores.cpu) {
    //                 setModalMessage('Defeat')
    //             } else if (scores.p1 === scores.cpu) {
    //                 setModalMessage('Draw')
    //             }
    //             setBattleOver(true)
    //         }, 1000)
    //     } else if (emptyCells.length < 9) {
    //         saveStateToLocalStorage()
    //     }
    // }

    // const cpuMove = () => {
    //     const newBoardArray = board
    //     let newHand = hands.cpu
    //     let bestScore = -Infinity
    //     let move
    //     hands.cpu.forEach((card) => {
    //         emptyCells.forEach((cell) => {
    //             let score = 0
    //             const up = board[cell - WIDTH]
    //             const right = board[cell + 1]
    //             const left = board[cell - 1]
    //             const down = board[cell + WIDTH]
    //             const values = card.values

    //             // check cards user
    //             // scales

    //             if (cell !== 0 && cell !== 1 && cell !== 2 && up !== 'empty') {
    //                 if (up.values[2] < values[0]) {
    //                     score +=
    //                         100 + (parseInt(up.values[2]) - parseInt(values[0]))
    //                 }
    //             }
    //             if (cell !== 0 && cell !== 1 && cell !== 2 && up === 'empty') {
    //                 score += parseInt(values[0])
    //             }
    //             if (cell === 0 || cell === 1 || cell === 2) {
    //                 score -= parseInt(values[0])
    //             }

    //             if (
    //                 cell !== 0 &&
    //                 cell !== 3 &&
    //                 cell !== 6 &&
    //                 left !== 'empty'
    //             ) {
    //                 if (left.values[1] < values[3]) {
    //                     score +=
    //                         100 +
    //                         (parseInt(left.values[1]) - parseInt(values[3]))
    //                 }
    //             }

    //             if (
    //                 cell !== 0 &&
    //                 cell !== 3 &&
    //                 cell !== 6 &&
    //                 left === 'empty'
    //             ) {
    //                 score += parseInt(values[3])
    //             }
    //             if (cell === 0 || cell === 3 || cell === 6) {
    //                 score -= parseInt(values[3])
    //             }

    //             if (
    //                 cell !== 2 &&
    //                 cell !== 5 &&
    //                 cell !== 8 &&
    //                 right !== 'empty'
    //             ) {
    //                 if (right.values[3] < values[1]) {
    //                     score +=
    //                         100 +
    //                         (parseInt(right.values[3]) - parseInt(values[1]))
    //                 }
    //             }

    //             if (
    //                 cell !== 2 &&
    //                 cell !== 5 &&
    //                 cell !== 8 &&
    //                 right !== 'empty'
    //             ) {
    //                 score += parseInt(values[1])
    //             }
    //             if (cell === 2 || cell === 5 || cell === 8) {
    //                 score -= parseInt(values[1])
    //             }

    //             if (
    //                 cell !== 6 &&
    //                 cell !== 7 &&
    //                 cell !== 8 &&
    //                 down !== 'empty'
    //             ) {
    //                 if (down.values[0] < values[2]) {
    //                     score +=
    //                         100 +
    //                         (parseInt(down.values[0]) - parseInt(values[2]))
    //                 }
    //             }

    //             if (
    //                 cell !== 6 &&
    //                 cell !== 7 &&
    //                 cell !== 8 &&
    //                 down !== 'empty'
    //             ) {
    //                 score += parseInt(values[2])
    //             }
    //             if (cell === 6 || cell === 7 || cell === 8) {
    //                 score -= parseInt(values[2])
    //             }
    //             if (score > bestScore) {
    //                 bestScore = score
    //                 move = { card: card, cell: cell }
    //             }
    //         })
    //     })
    //     move.card.user = opponent
    //     newBoardArray.splice(move.cell, 1, move.card)
    //     setBoard((prevBoard) => newBoardArray)
    //     newHand.forEach((handCard, i) =>
    //         handCard._id === move.card._id ? hands.cpu.splice(i, 1) : ''
    //     )
    //     setHands({ ...hands, cpu: newHand })
    //     processBattles(move.cell, move.card)
    // }

    // useEffect(() => {
    //     if (
    //         battleStarted &&
    //         !isP1Turn &&
    //         emptyCells.length !== 0 &&
    //         hands.cpu.length > 0
    //     ) {
    //         setTimeout(() => {
    //             cpuMove()
    //         }, 1500)
    //     }
    // }, [isP1Turn, playerTwo.hand])

    return (
        <div className='match page'>
            <div className='table'>
                <Hand
                    player={playerTwo}
                    battleState={battleState}
                    cardSelected={cardSelected}
                    setCardSelected={setCardSelected}
                />
                <Board
                    playerOne={playerOne}
                    playerTwo={playerTwo}
                    battleState={battleState}
                    placeCard={placeCard}
                />
                <Hand
                    player={playerOne}
                    battleState={battleState}
                    cardSelected={cardSelected}
                    setCardSelected={setCardSelected}
                />
            </div>

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
                        <button className='box' onClick={() => navigate('/')}>
                            Quit
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Battle
