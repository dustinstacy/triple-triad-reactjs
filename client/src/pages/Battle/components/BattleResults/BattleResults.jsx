import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {
    addCardToCollection,
    addCoin,
    addExperience,
    updateUserStats,
} from '@api'
import { coinImage } from '@assets'
import { useGlobalContext } from '@context'
import { Button, Card } from '@components'
import { createCardData } from '@utils'
import { assignRandomCardValues } from '../../../../utils/randomizers'

import { updatedDefeatedEnemies } from './api'
import './BattleResults.scss'

// Renders the user's battle results including any rewards gained
const BattleResults = ({ playerOne, playerTwo }) => {
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
        } else if (playerOne.battleScore < playerTwo.battleScore) {
            setBattleResult('Defeat')
        } else if (playerOne.battleScore === playerTwo.battleScore) {
            setBattleResult('Draw')
        }
    }

    useEffect(() => {
        if (battleResult !== null) updateUser(battleResult)
    }, [battleResult])

    // Make appropriate API requests based on battle results
    const updateUser = async (result) => {
        switch (result) {
            case 'Victory':
                await addCoin(user.coin, opponent.rewards.coin)
                await addExperience(user.xp, opponent.rewards.xp)
                await updateUserStats(user.stats, 'win')

                if (!user.defeatedEnemies.includes(opponent.name)) {
                    const opponentCard = allCards.find(
                        (card) => card._id == opponent.rewards.card
                    )
                    assignRandomCardValues(opponentCard)
                    setCardReward(opponentCard)
                    await addCardToCollection(createCardData(opponentCard))
                    await updatedDefeatedEnemies(
                        user.defeatedEnemies,
                        opponent.name
                    )
                }
                break
            case 'Draw':
                await addCoin(user.coin, Math.floor(opponent.rewards.coin / 2))
                await addExperience(
                    user.xp,
                    Math.floor(opponent.rewards.xp / 2)
                )
                await updateUserStats(user.stats, 'draw')
                break
            case 'Defeat':
                await updateUserStats(user.stats, 'loss')
                break
            default:
                break
        }
        await getCurrentUser()
    }

    return (
        <div className='battle-over fill'>
            <span className='result'>{battleResult}</span>
            <div className='rewards center'>
                {battleResult === 'Victory' ? (
                    <>
                        <div className='coin-xp center'>
                            <div className='coin center'>
                                <div className='coin-reward center-column'>
                                    <span>+ {opponent.rewards.coin}</span>
                                    <img src={coinImage} alt='coin image' />
                                </div>
                            </div>

                            <div className='xp center-column'>
                                <span>+ {opponent.rewards.xp}</span>
                                <span>XP</span>
                            </div>
                        </div>

                        {cardReward && (
                            <div className='card-reward center-column'>
                                <h1>NEW CARD!</h1>
                                <Card card={cardReward} isShowing />
                            </div>
                        )}
                    </>
                ) : battleResult === 'Draw' ? (
                    <>
                        <div className='coin center'>
                            <div className='coin-reward center'>
                                <span>
                                    + {Math.floor(opponent.rewards.coin / 2)}
                                </span>
                                <img src={coinImage} alt='coin image' />
                            </div>
                        </div>
                        <div className='xp center'>
                            <span>
                                + {Math.floor(opponent.rewards.xp / 2)} XP
                            </span>
                        </div>
                    </>
                ) : (
                    <></>
                )}
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
