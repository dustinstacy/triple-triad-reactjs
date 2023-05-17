import React, { useEffect, useState } from 'react'
import { Button, Card, Cell } from '../../components'
import './Match.scss'
import { useBattleContext } from '../../context/BattleContext'

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

const Hand = ({ playerHand }) => (
    <div className={playerHand[0]?.user === 'cpu' ? 'cpu' : 'player'}>
        {playerHand?.map((card, i) => (
            <Card
                key={card._id + i}
                card={card}
                owner={card.user}
                faith={card.user === 'cpu' ? 'cpu' : 'p1'}
                isShowing={playerHand[0].user !== 'cpu' ?? false}
                handleClick={(e) => selectCard(e, card)}
            />
        ))}
    </div>
)

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

    const table = [...hands.p1, ...board, ...hands.cpu]

    return (
        <div className='match page'>
            <div className='board'>
                <Hand playerHand={hands.cpu} />
                <Score playerScore={cpuScore} />
                <BoardGrid board={board} />
                <Score playerScore={p1Score} />
                <Hand playerHand={hands.p1} />
            </div>
        </div>
    )
}

export default Match
