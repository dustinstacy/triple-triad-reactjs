import React, { useState } from 'react'
import { Card, Cell } from '../../components'
import './Match.scss'
import { useBattleContext } from '../../context/BattleContext'
import { useGlobalContext } from '../../context/GlobalContext'
import { BiArrowFromBottom, BiArrowFromTop } from 'react-icons/bi'

const Score = ({ playerScore }) => (
    <div className='column'>
        <span className='match__score'>{playerScore} </span>
    </div>
)

const Board = ({ board }) => (
    <div className='board'>
        <div className='grid center'>
            {board?.map((contents, i) =>
                contents === 'empty' ? (
                    <Cell key={i} id={i} handleClick={(e) => placeCard(e)} />
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

const Hand = ({ playerHand, selectedCard, setSelectedCard, user }) => {
    const [cardsRaised, setCardsRaised] = useState(false)

    const selectCard = (card) => {
        if (card === selectedCard) {
            setSelectedCard(null)
        } else {
            setSelectedCard(card)
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
                    key={card._id + index}
                    card={card}
                    isShowing={playerHand[0].user !== 'cpu' ?? false}
                    isSelected={selectedCard?._id === card._id}
                    handleClick={() => selectCard(card)}
                />
            ))}
        </div>
    )
}

const Match = () => {
    const {
        decks,
        setDecks,
        hands,
        setHands,
        board,
        setBoard,
        isP1Turn,
        setisP1Turn,
        p1Score,
        setP1Score,
        cpuScore,
        setCpuScore,
        resetContext,
    } = useBattleContext()
    const { user } = useGlobalContext()

    const [selectedCard, setSelectedCard] = useState(null)

    return (
        <div className='match page'>
            <div className='table'>
                <Hand
                    playerHand={hands.cpu}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                    user={user}
                />
                <Board board={board} />
                <Hand
                    playerHand={hands.p1}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                    user={user}
                />
            </div>
        </div>
    )
}

export default Match
