import React, { useEffect, useState } from 'react'
import { Avatar, Card, Cell } from '../../components'
import './Battle.scss'
import { useGlobalContext } from '../../context/GlobalContext'
import { BiArrowFromBottom, BiArrowFromTop } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'
import { shuffleCards, dealCards } from '../../utils/shuffleAndDeal'

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

const Board = ({ board, placeCard, playerScores }) => {
    return (
        <div className='board'>
            <Score playerScore={playerScores.cpu} user='cpu' />
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
            <Score playerScore={playerScores.p1} user='p1' />
        </div>
    )
}

const Hand = ({ playerHand, cardSelected, setCardSelected, user }) => {
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
                playerHand[0]?.user === user?._id ? 'player' : 'cpu'
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
                    handleClick={() => selectCard(card)}
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
    const [hands, setHands] = useState(initialHands)
    const [cardSelected, setCardSelected] = useState(null)
    const [scores, setScores] = useState({
        p1: 5,
        cpu: 5,
    })

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
                    setBoard={setBoard}
                    cardSelected={cardSelected}
                    hands={hands}
                    placeCard={placeCard}
                    playerScores={scores}
                />
                <Hand
                    playerHand={hands.p1}
                    cardSelected={cardSelected}
                    setCardSelected={setCardSelected}
                    user={user}
                />
                <img
                    className='user-image'
                    src={user.image}
                    alt='user image '
                />
            </div>
        </div>
    )
}

export default Battle
