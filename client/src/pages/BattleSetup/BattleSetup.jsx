import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import './BattleSetup.scss'
import { coinImage } from '../../assets/icons'
import { getRandomCards } from '../../utils/randomizers'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components'
import axios from 'axios'

const Opponent = ({
    opponent,
    selectedOpponent,
    setSelectedOpponent,
    selectedOpponentDeck,
    setSelectedOpponentDeck,
}) => {
    const { allCards, user, getCurrentUser } = useGlobalContext()
    const [opponentDeck, setOpponentDeck] = useState([])

    const getOpponentDeck = () => {
        const randomDeck = Array.from({ length: 15 })
        const updatedDeck = getRandomCards(randomDeck, opponent, allCards)
        setOpponentDeck(updatedDeck)
    }

    const selectOpponent = () => {
        setSelectedOpponent(opponent)
        setSelectedOpponentDeck((prevDeck) => opponentDeck)
    }

    useEffect(() => {
        getCurrentUser().then(() => getOpponentDeck())
    }, [])

    return (
        <>
            {user?.level >= opponent.level ? (
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
                                {opponent?.minPower} - {opponent?.maxPower}
                            </span>
                        </p>
                        <p>
                            Required Deck Size <br />
                            {opponent?.minDeckSize}
                        </p>
                    </div>
                    <div className='opponent__rewards center'>
                        <p>Possible Rewards: </p>
                        <div className='rewards center'>
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
                    {userDeck?.reduce(
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
                <span>{userDeck?.length}</span>
            </div>
            <Button
                onClick={autoBuild}
                label='FIll Deck'
                disabled={userDeck?.length === selectedOpponent.size}
            />
            <Button
                label='Start Battle'
                onClick={() => startBattle()}
                disabled={userDeck?.length !== selectedOpponent.size}
            />
        </div>
    )
}

const BattleSetup = () => {
    const [cpuOpponents, setCPUOpponents] = useState({})
    const [selectedOpponent, setSelectedOpponent] = useState('')
    const [selectedOpponentDeck, setSelectedOpponentDeck] = useState('')

    useEffect(() => {
        const getOpponents = async () => {
            const opponents = await axios.get('/api/cpuOpponents')
            setCPUOpponents(opponents.data)
        }
        getOpponents()
    }, [])

    useEffect(() => {
        console.log(cpuOpponents)
    }, [cpuOpponents])

    return (
        <div className='setup page center'>
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
                            setSelectedOpponentDeck={setSelectedOpponentDeck}
                        />
                    ))}
            </div>
        </div>
    )
}

export default BattleSetup
