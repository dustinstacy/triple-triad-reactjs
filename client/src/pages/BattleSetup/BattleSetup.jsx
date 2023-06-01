import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { TbPlayCard } from 'react-icons/tb'

import { useGlobalContext } from '../../context/GlobalContext'
import { Button } from '../../components'
import { assignRandomDeckValues, getRandomCards } from '../../utils/randomizers'
import { coinImage } from '../../assets/icons'

import './BattleSetup.scss'

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
            14,
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
        setSelectedOpponent(opponent)
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

const OpponentMenu = ({ selectedOpponent, selectedOpponentDeck }) => {
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
                    b.values.reduce((sum, current) => sum + current, 0) -
                    a.values.reduce((sum, current) => sum + current, 0)
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
                                    parseInt(sum) + parseInt(current),
                                0
                            ),
                        0
                    )}
                </span>
            </div>
            <div className='user-deck__size'>
                <p>Size</p>
                <span>{userDeck?.length}</span>
            </div>
            <Button
                onClick={autoBuild}
                label='FIll Deck'
                disabled={userDeck?.length === selectedOpponent.minDeckSize}
            />
            <Button
                label='Start Battle'
                onClick={() => startBattle()}
                disabled={userDeck?.length !== selectedOpponent.minDeckSize}
            />
        </div>
    )
}

const BattleSetup = () => {
    const { user } = useGlobalContext()
    const [cpuOpponents, setCPUOpponents] = useState({})
    const [selectedOpponent, setSelectedOpponent] = useState('')
    const [selectedOpponentDeck, setSelectedOpponentDeck] = useState('')
    const [alertActive, setAlertActive] = useState(false)

    useEffect(() => {
        const savedState = localStorage.getItem('battleState')
        if (savedState) {
            setAlertActive(true)
        } else {
            const getOpponents = async () => {
                const opponents = await axios.get('/api/cpuOpponents')
                setCPUOpponents(opponents.data)
            }
            getOpponents()
        }
    }, [alertActive])

    const forfeitBattle = async () => {
        localStorage.removeItem('battleState')
        await axios.put('/api/profile/stats', {
            battles: user.stats.battles + 1,
            wins: user.stats.wins,
            losses: user.stats.losses + 1,
            draws: user.stats.draws,
        })
        setAlertActive((current) => !current)
    }

    return (
        <div className='setup page center'>
            <div className='background' />

            {alertActive ? (
                <div className='battle-alert box center'>
                    <h2>You currently have an unfinished battle</h2>
                    <div className='buttons'>
                        <Button label='Rejoin' path='/battle' type='link' />
                        <Button
                            label='Forefeit'
                            onClick={() => forfeitBattle()}
                        />
                    </div>
                    <p>*Forfeiting will count as a loss</p>
                </div>
            ) : (
                <div className='opponent-list'>
                    <div className='header'>
                        <h1>Choose your opponent</h1>
                        <hr />
                    </div>

                    {cpuOpponents.length &&
                        cpuOpponents?.map((opponent) => (
                            <Opponent
                                key={opponent.name}
                                opponent={opponent}
                                selectedOpponent={selectedOpponent}
                                setSelectedOpponent={setSelectedOpponent}
                                selectedOpponentDeck={selectedOpponentDeck}
                                setSelectedOpponentDeck={
                                    setSelectedOpponentDeck
                                }
                            />
                        ))}
                </div>
            )}
        </div>
    )
}

export default BattleSetup
