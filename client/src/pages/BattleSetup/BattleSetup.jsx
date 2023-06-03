import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useGlobalContext } from '@context'
import { Button } from '@components'

import { Opponent } from './components'

import './BattleSetup.scss'

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
                opponents.data.sort((a, b) => a.level - b.level)
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
