import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import './MatchSetup.scss'
import { opponents } from '../../constants/opponents.js'
import { coinImage } from '../../assets/icons'
import { getRandomCards } from '../../utils/randomizers'
import { NavLink } from 'react-router-dom'

const Opponent = ({
    opponent,
    allCards,
    selectedOpponent,
    setSelectedOpponent,
    selectedOpponentDeck,
    setSelectedOpponentDeck,
}) => {
    const [opponentDeck, setOpponentDeck] = useState([])
    const [opponentDeckStrength, setOpponentDeckStrength] = useState(0)

    console.log(opponent)

    const getOpponentDeck = () => {
        const randomDeck = Array.from({ length: 15 })
        const updatedDeck = getRandomCards(randomDeck, opponent, allCards)
        setOpponentDeck(updatedDeck)
        const deckStrength = calculateDeckStrength(updatedDeck)
        setOpponentDeckStrength(deckStrength)
    }

    const calculateDeckStrength = (deck) => {
        return deck.reduce(
            (total, card) =>
                total +
                card.values.reduce(
                    (sum, current) => parseInt(sum) + parseInt(current),
                    0
                ),
            0
        )
    }

    useEffect(() => {
        getOpponentDeck()
    }, [])

    return (
        <>
            <div
                className={`opponent box ${
                    selectedOpponent === opponent ? 'selected' : ''
                }`}
                onClick={() => {
                    setSelectedOpponent(opponent),
                        setSelectedOpponentDeck(opponentDeck)
                }}
            >
                <div className='opponent__info'>
                    <img src={opponent?.image} alt='opponent image' />
                    <h3>
                        {opponent?.name}
                        <br />
                        <br />
                        Level {opponent?.level}
                    </h3>
                </div>
                <div className='opponent__stats center'>
                    <p>Deck Strength:</p>
                    <span>
                        {opponentDeckStrength > 0
                            ? opponentDeckStrength
                            : 'Loading...'}
                    </span>
                </div>
                <div className='opponent__rewards center'>
                    <p>Possible Rewards: </p>
                    <div className='rewards center'>
                        <div className='reward'>
                            <p>XP</p>
                            {opponent?.xpReward}
                        </div>
                        <div className='reward'>
                            <p>Coin</p>
                            <span>
                                {opponent?.coinReward}
                                <img src={coinImage} alt='coin' />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {selectedOpponent === opponent && (
                <NavLink
                    to='/match'
                    state={{
                        opponent: selectedOpponent,
                        opponentDeck: selectedOpponentDeck,
                    }}
                >
                    {' '}
                    Battle{' '}
                </NavLink>
            )}
        </>
    )
}

const MatchSetup = () => {
    const { allCards } = useGlobalContext()
    const [selectedOpponent, setSelectedOpponent] = useState('')
    const [selectedOpponentDeck, setSelectedOpponentDeck] = useState('')

    return (
        <div className='setup page center'>
            <div className='opponent-list'>
                {opponents?.map((opponent) => (
                    <Opponent
                        key={opponent.name}
                        opponent={opponent}
                        allCards={allCards}
                        selectedOpponent={selectedOpponent}
                        setSelectedOpponent={setSelectedOpponent}
                        selectedOpponentDeck={selectedOpponentDeck}
                        setSelectedOpponentDeck={setSelectedOpponentDeck}
                    />
                ))}
            </div>
        </div>
    )
}

export default MatchSetup
