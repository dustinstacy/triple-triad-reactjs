import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

import { Board, Hand } from './components'
import { useGlobalContext } from '../../context/GlobalContext'
import { shuffleCards, assignColorsAndDealCards } from './utils/shuffleAndDeal'
import { processStandardBattles } from './utils/battleEvaluations'
import { cpuMove } from './ai/cpuMove'

import './Battle.scss'
import { Button } from '../../components'
import { assignRandomCardValues } from '../../utils/randomizers'

const Battle = () => {
    // Get user and opponent information from their respective sources
    const { allCards, getCurrentUser, user, userDeck } = useGlobalContext()
    const location = useLocation()
    const { opponent, opponentDeck } = location.state || {}

    // Initialize Player One state
    const [playerOne, setPlayerOne] = useState({
        user: user,
        name: 'p1',
        deck: [],
        hand: [],
        score: 0,
    })

    // Initialize Player Two state
    const [playerTwo, setPlayerTwo] = useState({
        user: opponent,
        name: 'p2',
        deck: [],
        hand: [],
        score: 0,
    })

    // Initialize Battle State
    const [battleState, setBattleState] = useState({
        board: [...new Array(9).fill('empty')],
        decksShuffled: false,
        handsDealt: false,
        battleStarted: false,
        isP1Turn: null,
        battleOver: false,
        battleResultMessage: null,
    })

    // Initiliaze card selection state to track user input
    const [cardSelected, setCardSelected] = useState(null)

    // Destructure Battle State
    const {
        board,
        decksShuffled,
        handsDealt,
        battleStarted,
        isP1Turn,
        battleOver,
        battleResultMessage,
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
        updateState(setBattleState, { decksShuffled: true })
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
        updateState(setBattleState, { handsDealt: true })
    }

    // Decide who goes first only once hands have been dealt and
    // a Battle is not currently under way
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

    // Remove state from local storage when the Battle is over
    useEffect(() => {
        if (battleOver === true) {
            removeStateFromLocalStorage()
        }
    }, [battleOver])

    const removeStateFromLocalStorage = () => {
        localStorage.removeItem('battleState')
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
            playerTwo.hand.length > 0
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
            } else if (card?.color === opponent?.color) {
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
        checkForWin()
    }, [isP1Turn])

    const checkForWin = () => {
        if (emptyCells.length === 0) {
            setTimeout(() => {
                battleResults()
                updateState(setBattleState, { battleOver: true })
            }, 1000)
        } else if (emptyCells.length < 9) {
            saveStateToLocalStorage()
        }
    }

    const battleResults = async () => {
        if (playerOne.score > playerTwo.score) {
            updateState(setBattleState, {
                battleResultMessage: 'Victory',
            })
        } else if (playerOne.score < playerTwo.score) {
            updateState(setBattleState, {
                battleResultMessage: 'Defeat',
            })
        } else if (playerOne.score === playerTwo.score) {
            updateState(setBattleState, {
                battleResultMessage: 'Draw',
            })
        }

        const updatedCoin = {
            coin: user.coin + opponent.rewards.coin,
        }
        await axios
            .put('/api/profile/info', updatedCoin)
            .then(() => getCurrentUser())
        const updatedStats = {
            level: user.level,
            xp:
                user.xp +
                (playerOne.score > playerTwo.score
                    ? opponent.rewards.xp
                    : playerOne.score < playerTwo.score
                    ? 0
                    : Math.floor(opponent.rewards.xp / 2)),

            battles: user.stats.battles + 1,
            wins:
                playerOne.score > playerTwo.score
                    ? user.stats.wins + 1
                    : user.stats.wins,
            losses:
                playerOne.score < playerTwo.score
                    ? user.stats.losses + 1
                    : user.stats.losses,
            draws:
                playerOne.score === playerTwo.score
                    ? user.stats.draws + 1
                    : user.stats.draws,
        }
        await axios
            .put('/api/profile/stats', updatedStats)
            .then(() => getCurrentUser())

        if (user.defeatedEnemies.includes(opponent.name)) {
            return
        } else {
            const opponentCard = allCards.find(
                (card) => card._id == opponent.rewards.card
            )
            assignRandomCardValues(opponentCard)
            const cardData = {
                name: opponentCard.name,
                number: opponentCard.number,
                image: opponentCard.image,
                rarity: opponentCard.rarity,
                empower: opponentCard.empower,
                weaken: opponentCard.weaken,
                values: opponentCard.values,
            }
            try {
                await axios
                    .put('/api/collection/new', cardData)
                    .then(() =>
                        axios.put('/api/profile/info', {
                            defeatedEnemies: [
                                ...user.defeatedEnemies,
                                opponent.name,
                            ],
                        })
                    )
            } catch (error) {
                console.log(error)
            }
        }
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

            {battleOver && battleResultMessage && (
                <div className='battle-over box'>
                    <span className='result'>{battleResultMessage}</span>
                    <div className='buttons'>
                        <Button
                            label='Select Battle'
                            type='link'
                            path='/battleSetup'
                        />
                        <Button label='Main Menu' type='link' path='/' />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Battle
