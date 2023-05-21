import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import './BattleSetup.scss'
import { cpuOpponents } from '../../constants/cpuOpponents.js'
import { coinImage } from '../../assets/icons'
import { getRandomCards } from '../../utils/randomizers'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../../components'
import axios from 'axios'

const Opponent = ({
    opponent,
    allCards,
    selectedOpponent,
    setSelectedOpponent,
    selectedOpponentDeck,
    setSelectedOpponentDeck,
}) => {
    const { user } = useGlobalContext()
    const [opponentDeck, setOpponentDeck] = useState([])
    const [opponentDeckStrength, setOpponentDeckStrength] = useState(0)

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

    const selectOpponent = () => {
        setSelectedOpponent(opponent)
        setSelectedOpponentDeck((prevDeck) => opponentDeck)
    }

    useEffect(() => {
        getOpponentDeck()
    }, [])

    return (
        <>
            {user?.level > opponent.level ? (
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
                    <div className='opponent__stats center'>
                        <p>
                            Power <br />{' '}
                            <span>
                                {opponentDeckStrength > 0
                                    ? opponentDeckStrength
                                    : 'Loading...'}
                            </span>
                        </p>
                        <p>
                            Required Deck Size <br />
                            {opponent?.size}
                        </p>
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

const OpponentMenu = ({
    selectedOpponent,
    setSelectedOpponent,
    selectedOpponentDeck,
}) => {
    const { getCurrentUser, user, userCards, userDeck } = useGlobalContext()
    const navigate = useNavigate()

    const markSelected = async (card) => {
        if (userDeck.length < 15) {
            await axios.put(`/api/collection/${card._id}/selected`)
            await axios.post('/api/deck/add', {
                user: user._id,
                _id: card._id,
                number: card.number,
                name: card.name,
                level: card.level,
                rarity: card.rarity,
                element: card.element,
                image: card.image,
                values: card.values,
            })
            getCurrentUser()
        } else {
            alert('Your deck is currently full')
        }
    }

    const autoBuild = async () => {
        const emptySlots = 15 - userDeck.length
        const totalValueArray = userCards
            .filter((card) => !userDeck.find(({ _id }) => card._id === _id))
            .sort(
                (a, b) =>
                    b.values.reduce(
                        (sum, current) =>
                            parseInt(sum) + parseInt(current.replace(/A/g, 10)),
                        0
                    ) -
                    a.values.reduce(
                        (sum, current) =>
                            parseInt(sum) + parseInt(current.replace(/A/g, 10)),
                        0
                    )
            )
        for (let i = 0; i < emptySlots; i++) {
            markSelected(totalValueArray[i])
        }
        getCurrentUser()
    }

    const startBattle = () => {
        navigate('/battle', {
            state: {
                opponent: selectedOpponent,
                opponentDeck: selectedOpponentDeck,
            },
        })
    }

    return (
        <div className='opponent-menu box'>
            Your Deck:
            <div className='user-deck__power'>
                <p>Power</p>
                <span>
                    {userDeck.reduce(
                        (total, card) =>
                            total +
                            card.values.reduce(
                                (sum, current) =>
                                    parseInt(sum) +
                                    parseInt(current.replace(/A/g, 10)),
                                0
                            ),
                        0
                    )}
                </span>
            </div>
            <div className='user-deck__size'>
                <p>Size</p>
                <span>{userDeck.length}</span>
            </div>
            <Button
                onClick={autoBuild}
                label='FIll Deck'
                disabled={userDeck.length === selectedOpponent.size}
            />
            <Button
                label='Start Battle'
                onClick={() => startBattle()}
                disabled={userDeck.length !== selectedOpponent.size}
            />
        </div>
    )
}

const BattleSetup = () => {
    const { allCards } = useGlobalContext()
    const [selectedOpponent, setSelectedOpponent] = useState('')
    const [selectedOpponentDeck, setSelectedOpponentDeck] = useState('')

    return (
        <div className='setup page center'>
            <div className='opponent-list'>
                <div className='header'>
                    <h1>Choose your opponent</h1>
                    <hr />
                </div>

                {cpuOpponents?.map((opponent) => (
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

export default BattleSetup
