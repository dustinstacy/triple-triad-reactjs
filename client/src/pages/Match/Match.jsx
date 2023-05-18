import React, { useEffect, useState } from 'react'
import { Button, Card, Cell } from '../../components'
import './Match.scss'
import { useBattleContext } from '../../context/BattleContext'
import { inertia } from 'framer-motion'

const BoardGrid = ({ board }) => (
    <div className='grid'>
        {board?.map((contents, i) =>
            contents === 'empty' ? (
                <Cell key={i} id={i} handleClick={(e) => placeCard(e)} />
            ) : (
                <Card key={i} card={contents} owner={contents.user} isShowing />
            )
        )}
    </div>
)

const Score = ({ playerScore }) => (
    <div className='column'>
        <span className='match__score'>{playerScore} </span>
    </div>
)

const Hand = ({ playerHand, setCurrentCard }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [scrollDirection, setScrollDirection] = useState('')

    return (
        <div className={playerHand[0]?.user === 'cpu' ? 'cpu' : 'player'}>
            {playerHand?.map((card, index) => (
                <Card
                    key={card._id + index}
                    card={card}
                    isShowing={playerHand[0].user !== 'cpu' ?? false}
                    handleClick={(e) => selectCard(e, card)}
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

    const [currentCard, setCurrentCard] = useState(null)
    const table = [...hands.p1, ...board, ...hands.cpu]

    return (
        <div className='match page'>
            <div className='board'>
                <Hand playerHand={hands.cpu} setCurrentCard={setCurrentCard} />
                <Score playerScore={cpuScore} />
                <BoardGrid board={board} />
                <Score playerScore={p1Score} />
                <Hand playerHand={hands.p1} setCurrentCard={setCurrentCard} />
            </div>
        </div>
    )
}

export default Match
