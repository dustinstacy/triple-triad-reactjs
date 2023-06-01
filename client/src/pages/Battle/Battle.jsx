import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useGlobalContext } from '../../context/GlobalContext'
import { BattleResults, Board, Hand } from './components'
import { shuffleCards, assignColorsAndDealCards } from './utils/shuffleAndDeal'
import { processStandardBattles } from './utils/battleEvaluations'
import { cpuMove } from './ai/cpuMove'

import './Battle.scss'

const Battle = () => {
    // Get user and opponent information from their respective sources
    const { user, userDeck } = useGlobalContext()
    const location = useLocation()
    const { opponent, opponentDeck } = location.state || {}

    // Initialize Player One state
    const [playerOne, setPlayerOne] = useState({
        user: user,
        name: 'p1',
        deck: [],
        hand: [],
        score: 0,
        roundsWon: 0,
    })

    // Initialize Player Two state
    const [playerTwo, setPlayerTwo] = useState({
        user: opponent,
        name: 'p2',
        deck: [],
        hand: [],
        score: 0,
        roundsWon: 0,
    })

    // Initialize Battle State
    const [battleState, setBattleState] = useState({
        board: [...new Array(9).fill('empty')],
        decksShuffled: false,
        handsDealt: false,
        battleStarted: false,
        round: 0,
        isP1Turn: null,
        roundOver: false,
        battleOver: false,
    })

    // Initiliaze card selection state to track user input
    const [cardSelected, setCardSelected] = useState(null)
    const [screenMessage, setScreenMessage] = useState(null)

    // Destructure Battle State
    const {
        board,
        decksShuffled,
        handsDealt,
        battleStarted,
        round,
        isP1Turn,
        roundOver,
        battleOver,
    } = battleState

    // Variables to track status of Player Hands and Board
    const table = [...playerTwo.hand, ...board, ...playerOne.hand]
    const emptyCells = board
        .map((cell, i) => {
            if (cell === 'empty') {
                return i
            }
            return null
        })
        .filter((index) => index !== null)
    const roundsForWin = playerTwo.user?.minDeckSize / 5 - 1

    // Helper function to simplify updating state
    const updateState = (setState, updates) => {
        setState((state) => ({ ...state, ...updates }))
    }

    // Retrieve state from local storage if it exists
    // Otherwise initialize a new game
    useEffect(() => {
        const savedState = localStorage.getItem('battleState')
        if (savedState) {
            restoreStateFromLocalStorage(savedState)
        } else {
            newGame()
        }
    }, [])

    // Set state equal to state retrieve from local storage
    // Returns state to last move before page exit
    const restoreStateFromLocalStorage = (savedState) => {
        const { playerOne, playerTwo, battleState } = JSON.parse(savedState)
        setPlayerOne(playerOne)
        setPlayerTwo(playerTwo)
        setBattleState(battleState)
    }

    // Begin process of setting up a new game
    const newGame = () => {
        shuffleDecks()
    }

    const shuffleDecks = () => {
        shuffleCards([userDeck, opponentDeck])
        updateState(setPlayerOne, { deck: [...userDeck] })
        updateState(setPlayerTwo, { deck: [...opponentDeck] })
        updateState(setBattleState, { decksShuffled: true, round: round + 1 })
    }

    // Deal cards only once decks are shuffled and a Battle is
    // not currently under way
    useEffect(() => {
        if (decksShuffled === true && battleStarted === false) {
            dealHands()
        }
    }, [decksShuffled])

    const dealHands = () => {
        assignColorsAndDealCards(playerOne)
        assignColorsAndDealCards(playerTwo)
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
        updateState(setBattleState, {
            handsDealt: true,
        })
        if (round === roundsForWin + 1) {
            setScreenMessage('Final Round')
        } else {
            setScreenMessage(`Round ${round}`)
        }
    }

    useEffect(() => {
        if (screenMessage !== null) {
            setTimeout(() => {
                setScreenMessage(null)
            }, 1500)
        }
    }, [screenMessage])

    // Decide who goes first only once hands have been dealt and
    // a Battle is not currently under way
    useEffect(() => {
        if (
            (handsDealt === true) &
            (battleStarted === false) &
            (screenMessage === null)
        ) {
            randomFirstTurn()
        }
    }, [handsDealt, screenMessage])

    const randomFirstTurn = () => {
        const arrowElement = document.querySelector('.turn-arrow')
        arrowElement.classList.add('start-game')
        setTimeout(() => {
            Math.random() < 0.5
                ? updateState(setBattleState, { isP1Turn: true })
                : updateState(setBattleState, { isP1Turn: false })
            arrowElement.classList.remove('start-game')
            updateState(setBattleState, {
                battleStarted: true,
                roundOver: false,
            })
        }, 1000)
    }

    // Save state to local storage when a new game has been initialized
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

    // Handle process of user choosing which cell to place a card
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
                processStandardBattles(index, cardSelected, battleState)
            }
            updateScores()
        }
    }

    useEffect(() => {
        if (
            battleStarted &&
            !isP1Turn &&
            emptyCells.length !== 0 &&
            playerTwo.hand.length > 0 &&
            roundOver === false
        ) {
            setTimeout(() => {
                cpuTurn()
            }, 2000)
        }
    }, [isP1Turn, playerTwo.hand])

    const cpuTurn = () => {
        const { move, newBoard, newHand } = cpuMove(
            playerTwo.hand,
            battleState.board,
            emptyCells
        )
        processStandardBattles(move.cell, move.card, battleState)
        updateState(setPlayerTwo, { hand: newHand })
        updateState(setBattleState, { board: newBoard })
        updateScores()
    }

    const updateScores = () => {
        let p1Score = 0
        let p2Score = 0

        table.forEach((card) => {
            if (card?.color === user?.color) {
                p1Score++
            } else if (card?.color === playerTwo.user?.color) {
                p2Score++
            }
            updateState(setPlayerOne, { score: p1Score })
            updateState(setPlayerTwo, { score: p2Score })
        })
        endTurn()
    }

    const endTurn = () => {
        setCardSelected(null)
        updateState(setBattleState, { isP1Turn: !isP1Turn })
    }

    useEffect(() => {
        checkForRoundEnd()
    }, [isP1Turn])

    const checkForRoundEnd = () => {
        if (emptyCells.length === 0) {
            roundResult()
        } else if (emptyCells.length < 9) {
            saveStateToLocalStorage()
        }
    }

    const roundResult = async () => {
        if (playerOne.score > playerTwo.score) {
            updateState(setPlayerOne, { roundsWon: playerOne.roundsWon + 1 })
        } else if (playerOne.score < playerTwo.score) {
            updateState(setPlayerTwo, { roundsWon: playerTwo.roundsWon + 1 })
        }
        setTimeout(() => {
            updateState(setBattleState, { roundOver: true })
        }, 1000)
    }

    useEffect(() => {
        if (roundOver === true) {
            checkForWin()
        }
    }, [roundOver])

    const checkForWin = () => {
        if (
            playerOne.roundsWon == roundsForWin ||
            playerTwo.roundsWon == roundsForWin ||
            round == roundsForWin + 1
        ) {
            setTimeout(() => {
                updateState(setBattleState, { battleOver: true })
            }, 1000)
        } else {
            newRound()
        }
    }

    const newRound = () => {
        updateState(setPlayerOne, { hand: [] })
        updateState(setPlayerTwo, { hand: [] })
        updateState(setBattleState, {
            board: [...new Array(9).fill('empty')],
            handsDealt: false,
            isP1Turn: null,
            round: round + 1,
        })
    }

    useEffect(() => {
        if (handsDealt === false && round > 0) {
            dealHands()
            setTimeout(() => {
                randomFirstTurn()
            }, 1500)
        }
    }, [handsDealt])

    // Remove state from local storage when the Battle is over
    useEffect(() => {
        if (battleOver === true) {
            removeStateFromLocalStorage()
        }
    }, [battleOver])

    const removeStateFromLocalStorage = () => {
        localStorage.removeItem('battleState')
    }

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
            {screenMessage && (
                <div
                    className={`screen-message center ${
                        screenMessage ? 'show' : ''
                    }`}
                >
                    {screenMessage}
                </div>
            )}
            {battleOver && (
                <BattleResults playerOne={playerOne} playerTwo={playerTwo} />
            )}
        </div>
    )
}

export default Battle
