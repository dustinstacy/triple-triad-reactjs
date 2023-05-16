import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { useCPUCardContext } from '../../context/CPUCardContext'
import { shuffleCards, dealCards } from '../../utils/shuffleAndDeal'
import { Card, Cell } from '../../components'
import './Match.scss'

const width = 3

const Match = () => {
    const { getCurrentUser, user, userDeck } = useGlobalContext()
    const { cpu, cpuDeck } = useCPUCardContext()

    const [decks, setDecks] = useState({
        p1: [...userDeck],
        cpu: [...cpuDeck],
    })
    const [hands, setHands] = useState({
        p1: [],
        cpu: [],
    })
    const [board, setBoard] = useState([
        ...new Array(width * width).fill('empty'),
    ])

    const [isP1Turn, setisP1Turn] = useState(Math.random() < 0.5)
    const [p1Score, setP1Score] = useState(5)
    const [cpuScore, setCpuScore] = useState(5)

    const newGame = () => {
        const p1DealtCards = []
        const cpuDealtCards = []
        shuffleCards(userDeck)
        shuffleCards(cpuDeck)
        dealCards(p1DealtCards, userDeck)
        dealCards(cpuDealtCards, cpuDeck)
        setHands({ p1: p1DealtCards, cpu: cpuDealtCards })
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    useEffect(() => {
        if (userDeck.length) {
            newGame()
        }
    }, [userDeck])

    return (
        <div className='match page'>
            <div className='board'>
                <div className='cpu'>
                    {hands.cpu?.map((card, i) => (
                        <Card key={card._id + i} card={card} owner={cpu} />
                    ))}
                </div>
                <div className='column'>
                    <span className='match__score'>{cpuScore} </span>
                </div>
                <div className='grid'>
                    {board.map((cell, i) =>
                        cell === 'empty' ? (
                            <Cell
                                key={i}
                                id={i}
                                handleClick={(e) => placeCard(e)}
                            />
                        ) : (
                            <Card
                                key={i}
                                card={cell}
                                player={cell.user === 'cpu' ? cpu : p1}
                            />
                        )
                    )}
                </div>
                <div className='column'>
                    <span className='match__score'>{p1Score} </span>
                </div>
                <div className='player'>
                    {hands.p1?.map((card, i) => (
                        <Card
                            key={card._id + i}
                            card={card}
                            owner={user.id}
                            faith='p1'
                            isShowing
                            handleClick={(e) => selectCard(e, card)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Match
