import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { addCoin, addExperience, updateUserStats } from '@api'
import { coinImage } from '@assets'
import { useGlobalContext } from '@context'
import { Button, Card } from '@components'
import { assignRandomCardValues } from '../../../../utils/randomizers'

import './BattleResults.scss'

const BattleResults = ({ playerOne, playerTwo }) => {
    const { allCards, getCurrentUser } = useGlobalContext()
    const [battleResultsMessage, setBattleResultsMessage] = useState(null)
    const [cardReward, setCardReward] = useState(null)

    const user = playerOne.user
    const opponent = playerTwo.user

    useEffect(() => {
        setBattleResults()
    }, [])

    const setBattleResults = () => {
        if (playerOne.roundsWon > playerTwo.roundsWon) {
            setBattleResultsMessage('Victory')
        } else if (playerOne.roundsWon < playerTwo.roundsWon) {
            setBattleResultsMessage('Defeat')
        } else if (playerOne.roundsWon === playerTwo.roundsWon) {
            setBattleResultsMessage('Draw')
        }
    }

    useEffect(() => {
        if (battleResultsMessage !== null) updateUser(battleResultsMessage)
    }, [battleResultsMessage])

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
                    const cardData = {
                        name: opponentCard.name,
                        number: opponentCard.number,
                        image: opponentCard.image,
                        rarity: opponentCard.rarity,
                        empower: opponentCard.empower,
                        weaken: opponentCard.weaken,
                        values: opponentCard.values,
                    }

                    await axios.put('/api/collection/new', cardData).then(() =>
                        axios.put('/api/profile/info', {
                            defeatedEnemies: [
                                ...user.defeatedEnemies,
                                opponent.name,
                            ],
                        })
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
        <div className='battle-over box'>
            <span className='result'>{battleResultsMessage}</span>
            <div className='rewards'>
                {battleResultsMessage === 'Victory' ? (
                    <>
                        <div className='coin'>
                            <h1>Coin</h1>
                            <div className='coin-reward'>
                                <span>+ {opponent.rewards.coin}</span>
                                <img src={coinImage} alt='coin image' />
                            </div>
                        </div>
                        <div className='xp'>
                            <h1>XP</h1>
                            <span>+ {opponent.rewards.xp}</span>
                        </div>
                        {cardReward && (
                            <div className='card-reward'>
                                <h1>NEW CARD!</h1>
                                <Card card={cardReward} isShowing />
                            </div>
                        )}
                    </>
                ) : battleResultsMessage === 'Draw' ? (
                    <>
                        <div className='coin'>
                            <h1>Coin</h1>
                            <div className='coin-reward'>
                                <span>
                                    + {Math.floor(opponent.rewards.coin / 2)}
                                </span>
                                <img src={coinImage} alt='coin image' />
                            </div>
                        </div>
                        <div className='xp'>
                            <h1>XP</h1>
                            <span>+ {Math.floor(opponent.rewards.xp / 2)}</span>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
            <div className='buttons'>
                <Button
                    label='Select Battle'
                    type='link'
                    path='/opponentSelect'
                />
                <Button label='Main Menu' type='link' path='/' />
            </div>
        </div>
    )
}

export default BattleResults
