import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { ModalOverlay } from '@components'
import { useGlobalContext } from '@context'

import {
    BattleResults,
    BattleIntro,
    Board,
    Hand,
    RoundResult,
} from './components'
import { assignColorsAndDealCards, shuffleCards, updateState } from './utils'
import { processStandardBattles } from './lib/logic'
import { cpuMove } from './lib/ai'

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
        roundScore: 0,
        battleScore: 0,
    })

    // Initialize Player Two state
    const [playerTwo, setPlayerTwo] = useState({
        user: opponent,
        name: 'p2',
        deck: [],
        hand: [],
        roundScore: 0,
        battleScore: 0,
    })

    // Initialize Battle State
    const [battleState, setBattleState] = useState({
        battleIntro: false,
        board: [...new Array(9).fill('empty')],
        decksShuffled: false,
        roundAlert: false,
        handsDealt: false,
        battleStarted: false,
        round: 0,
        isP1Turn: null,
        roundOver: false,
        battleOver: false,
    })

    // Initiliaze card selection state
    const [cardDragged, setCardDragged] = useState(null)
    const [cardSelected, setCardSelected] = useState(null)

    // Destructure Battle State
    const {
        battleIntro,
        board,
        decksShuffled,
        roundAlert,
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

    const battleRounds = opponent.minDeckSize / 5

    // Retrieve state from local storage if it exists
    // Otherwise initialize a new game
    useEffect(() => {
        const savedState = localStorage.getItem('battleState')
        setTimeout(() => {
            if (savedState) {
                restoreStateFromLocalStorage(savedState)
            } else {
                newGame()
            }
        }, 50)
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
        updateState(setBattleState, { battleIntro: true })
        setTimeout(() => {
            shuffleDecks()
            updateState(setBattleState, {
                battleIntro: false,
                roundAlert: true,
            })
        }, 4000)
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
            setTimeout(() => {
                updateState(setBattleState, { roundAlert: false })
                dealHands()
            }, 1000)
        }
    }, [decksShuffled])

    const dealHands = () => {
        assignColorsAndDealCards(playerOne)
        assignColorsAndDealCards(playerTwo)
        updateState(setPlayerOne, {
            deck: [...playerOne.deck],
            hand: [...playerOne.hand],
            roundScore: playerOne.hand.length,
        })
        updateState(setPlayerTwo, {
            deck: [...playerTwo.deck],
            hand: [...playerTwo.hand],
            roundScore: playerTwo.hand.length,
        })
        updateState(setBattleState, {
            handsDealt: true,
        })
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
            updateState(setPlayerOne, { roundScore: p1Score })
            updateState(setPlayerTwo, { roundScore: p2Score })
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
        updateState(setPlayerOne, {
            battleScore: playerOne.battleScore + playerOne.roundScore,
        })
        updateState(setPlayerTwo, {
            battleScore: playerTwo.battleScore + playerTwo.roundScore,
        })
        setTimeout(() => {
            updateState(setBattleState, { roundOver: true })
        }, 1000)
    }

    useEffect(() => {
        if (roundOver === true) {
            setTimeout(() => {
                checkForBattleEnd()
            }, 2500)
        }
    }, [roundOver])

    const checkForBattleEnd = () => {
        if (
            round === battleRounds ||
            playerOne.battleScore >
                playerTwo.battleScore + (battleRounds - round) * 9 ||
            playerTwo.battleScore >
                playerOne.battleScore + (battleRounds - round) * 9
        ) {
            updateState(setBattleState, { battleOver: true })
        } else {
            newRound()
        }
    }

    const newRound = () => {
        updateState(setPlayerOne, { hand: [] })
        updateState(setPlayerTwo, { hand: [] })
        updateState(setBattleState, {
            board: [...new Array(9).fill('empty')],
            roundAlert: true,
            handsDealt: false,
            roundOver: false,
            round: round + 1,
        })
    }

    useEffect(() => {
        if (handsDealt === false && round > 0) {
            setTimeout(() => {
                dealHands()
                updateState(setBattleState, { roundAlert: false })
            }, 1000)
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
            {!battleIntro && (
                <div className='table'>
                    <Hand
                        player={playerTwo}
                        battleState={battleState}
                        cardSelected={cardSelected}
                        cardDragged={cardDragged}
                        setCardSelected={setCardSelected}
                    />
                    <Board
                        playerOne={playerOne}
                        setPlayerOne={setPlayerOne}
                        playerTwo={playerTwo}
                        battleState={battleState}
                        setBattleState={setBattleState}
                        cardSelected={cardSelected}
                        cardDragged={cardDragged}
                        setCardDragged={setCardDragged}
                        updateScores={updateScores}
                    />
                    <Hand
                        player={playerOne}
                        battleState={battleState}
                        cardSelected={cardSelected}
                        cardDragged={cardDragged}
                        setCardSelected={setCardSelected}
                        setCardDragged={setCardDragged}
                    />
                </div>
            )}
            {battleIntro && (
                <ModalOverlay>
                    <BattleIntro
                        playerOne={playerOne.user}
                        playerTwo={playerTwo.user}
                    />
                </ModalOverlay>
            )}
            {roundAlert && (
                <ModalOverlay>
                    <h1 className='round-alert center'>
                        <h1>Round</h1> <span>{round}</span>
                    </h1>
                </ModalOverlay>
            )}
            {roundOver && !battleOver && (
                <ModalOverlay>
                    <RoundResult playerOne={playerOne} playerTwo={playerTwo} />
                </ModalOverlay>
            )}
            {battleOver && (
                <ModalOverlay>
                    <BattleResults
                        playerOne={playerOne}
                        playerTwo={playerTwo}
                    />
                </ModalOverlay>
            )}
        </div>
    )
}

export default Battle
