import React, { useEffect } from 'react'
import { TbPlayCard } from 'react-icons/tb'

import { coinImage } from '@assets'
import { useGlobalContext } from '@context'
import {
    assignRandomDeckValues,
    getRandomCards,
} from '../../../../utils/randomizers'

import { OpponentMenu } from '..'
import './Opponent.scss'

const Opponent = ({
    opponent,
    selectedOpponent,
    setSelectedOpponent,
    selectedOpponentDeck,
    setSelectedOpponentDeck,
}) => {
    const { allCards, user, getCurrentUser } = useGlobalContext()

    const getOpponentDeck = () => {
        const currentOpponentDeck = getRandomCards(
            opponent.minDeckSize - 1,
            opponent.deckOdds,
            allCards
        )
        const currentOpennentCard = allCards.find(
            (card) => card._id === opponent.rewards.card
        )
        currentOpponentDeck.push(currentOpennentCard)
        assignRandomDeckValues(
            currentOpponentDeck,
            opponent.minPower,
            opponent.maxPower
        )
        setSelectedOpponentDeck((prevDeck) => currentOpponentDeck)
    }

    const selectOpponent = () => {
        if (selectedOpponent === opponent) {
            setSelectedOpponent(!opponent)
        } else {
            setSelectedOpponent(opponent)
        }
        getOpponentDeck()
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <>
            {user?.level >= opponent?.level ? (
                <div
                    className={`opponent box ${
                        selectedOpponent === opponent ? 'selected' : ''
                    }`}
                    onClick={() => {
                        selectOpponent()
                    }}
                >
                    <div className='opponent__info'>
                        <img src={opponent?.image} alt='opponent image' />
                        <h3>{opponent?.name}</h3>
                    </div>
                    <div className='opponent__stats'>
                        <p className='stat'>
                            Power
                            <span>
                                {opponent?.minPower} - {opponent?.maxPower}
                            </span>
                        </p>
                        <p className='stat'>
                            Required Deck Size
                            <span>{opponent?.minDeckSize}</span>
                        </p>
                        <p className='stat'>
                            Number of Rounds:
                            <span>{opponent?.minDeckSize / 5}</span>
                        </p>
                    </div>
                    <div className='opponent__rewards center'>
                        <p>Possible Rewards: </p>
                        <div className='rewards'>
                            <div className='reward'>
                                <p>XP</p>
                                {opponent?.rewards.xp}
                            </div>
                            <div className='reward'>
                                <p>Coin</p>
                                <span>
                                    {opponent?.rewards.coin}
                                    <img src={coinImage} alt='coin' />
                                </span>
                            </div>
                            {!user?.defeatedEnemies.includes(
                                `${opponent.name}`
                            ) && (
                                <div className='reward'>
                                    <p>Card</p>
                                    <span>
                                        <TbPlayCard className='card-icon' />
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <OpponentMenu
                        selectedOpponent={selectedOpponent}
                        setSelectedOpponent={setSelectedOpponent}
                        selectedOpponentDeck={selectedOpponentDeck}
                    />
                </div>
            ) : (
                <div className='higher-opponent box center'>
                    Unlocks at level {opponent.level}
                </div>
            )}
        </>
    )
}

export default Opponent
