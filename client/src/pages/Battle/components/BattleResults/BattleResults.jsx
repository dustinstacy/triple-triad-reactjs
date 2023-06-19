import React, { useEffect, useState } from 'react'

import {
    addCardToCollection,
    addCoin,
    addExperience,
    updateUserStats,
} from '@api'
import { coinImage } from '@assets'
import { useGlobalContext } from '@context'
import { Button, ExperienceBar } from '@components'
import { createCardData } from '@utils'
import { assignRandomCardValues } from '../../../../utils/randomizers'

import { updatedDefeatedEnemies } from './api'
import { resultsFrame } from './images'
import './BattleResults.scss'

// Renders the user's battle results including any rewards gained
const BattleResults = ({ playerOne, playerTwo, opponentDeck }) => {
    const { allCards, getCurrentUser } = useGlobalContext()
    const [battleResult, setBattleResult] = useState(null)
    const [cardReward, setCardReward] = useState(null)

    const user = playerOne.user
    const opponent = playerTwo.user

    useEffect(() => {
        setBattleResults()
    }, [])

    const setBattleResults = () => {
        if (playerOne.battleScore > playerTwo.battleScore) {
            setBattleResult('Victory')
            handleVictory()
        } else if (playerOne.battleScore < playerTwo.battleScore) {
            setBattleResult('Defeat')
            handleDefeat()
        } else if (playerOne.battleScore === playerTwo.battleScore) {
            setBattleResult('Draw')
            handleDraw()
        }
    }

    const handleVictory = async () => {
        await updateUserStats(user, 'win')
        await addCoin(user.coin, opponent.rewards.coin)
        if (!user.defeatedEnemies.includes(opponent.name)) {
            const opponentCard = allCards.find(
                (card) => card._id == opponent.rewards.card
            )
            assignRandomCardValues(opponentCard)
            setCardReward(opponentCard)
            await addCardToCollection(createCardData(opponentCard))
            await updatedDefeatedEnemies(user.defeatedEnemies, opponent.name)
        }
        setTimeout(async () => {
            await addExperience(user, opponent.rewards.xp)
            await getCurrentUser()
        }, 1000)
    }

    const handleDefeat = async () => {
        await updateUserStats(user, 'loss')
    }

    const handleDraw = async () => {
        await updateUserStats(user, 'draw')
        await addCoin(user.coin, Math.floor(opponent.rewards.coin / 2))
        setTimeout(async () => {
            await addExperience(user, Math.floor(opponent.rewards.xp / 2))
            await getCurrentUser()
        }, 1000)
    }

    // Make appropriate API requests based on battle results
    const updateUser = async (result) => {
        switch (result) {
            case 'Victory':
                break
        }
        await getCurrentUser()
    }

    // Navigate to battle page with stored opponent and opponent deck statee
    const rematch = () => {
        navigate('/battle', {
            state: {
                opponent: opponent,
                opponentDeck: opponentDeck,
            },
        })
    }

    return (
        <div className='battle-over fill center'>
            <img
                className='results-frame abs-center'
                src={resultsFrame}
                alt='results-frame'
            />
            <div className='panel fill center-column'>
                <div className='results-wrapper around-column'>
                    <span className='result'>{battleResult}</span>
                    <div className='rewards start-column'>
                        {battleResult === 'Victory' ? (
                            <>
                                <div className='results-xp center-column'>
                                    <div className='xp-wrapper center'>
                                        <div className='gained-xp center'>
                                            +{Math.floor(opponent.rewards.xp)}
                                            <span>XP</span>
                                        </div>
                                    </div>
                                    <ExperienceBar />
                                </div>
                            </>
                        ) : battleResult === 'Draw' ? (
                            <>
                                <div className='results-xp center-column'>
                                    <div className='xp-wrapper center'>
                                        <div className='gained-xp center'>
                                            +
                                            {Math.floor(
                                                opponent.rewards.xp / 2
                                            )}
                                            <span>XP</span>
                                        </div>
                                    </div>
                                    <ExperienceBar />
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            <div className='buttons'>
                <Button
                    label='Select Opponent'
                    type='link'
                    path='/opponentSelect'
                />
                <Button label='Main Menu' type='link' path='/' />
            </div>
        </div>
    )
}

export default BattleResults
