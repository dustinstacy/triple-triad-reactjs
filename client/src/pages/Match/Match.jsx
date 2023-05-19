import React, { useEffect, useState } from 'react'
import { Card, Cell } from '../../components'
import './Match.scss'
import { useGlobalContext } from '../../context/GlobalContext'
import { BiArrowFromBottom, BiArrowFromTop } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'
import { shuffleCards, dealCards } from '../../utils/shuffleAndDeal'

const Score = ({ playerScore }) => (
    <div className='column'>
        <span className='match__score'>{playerScore} </span>
    </div>
)

const Board = ({ board, placeCard }) => {
    return (
        <div className='board'>
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

const Match = () => {
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

    useEffect(() => {
        setupMatch()
    }, [])

    const setupMatch = () => {
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
                />
                <Hand
                    playerHand={hands.p1}
                    cardSelected={cardSelected}
                    setCardSelected={setCardSelected}
                    user={user}
                />
            </div>
        </div>
    )
}

export default Match
