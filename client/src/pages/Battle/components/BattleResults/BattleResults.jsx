import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useGlobalContext } from '@context'
import { Button, Card } from '@components'
import { coinImage } from '@assets'
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
        let updatedCoin = {}
        let updatedStats = {}

        switch (result) {
            case 'Victory':
                updatedCoin = {
                    coin: user.coin + opponent.rewards.coin,
                }
                updatedStats = {
                    xp: user.xp + opponent.rewards.xp,
                    battles: user.stats.battles + 1,
                    wins: user.stats.wins + 1,
                    losses: user.stats.losses,
                    draws: user.stats.draws,
                }
                await axios.put('/api/profile/info', updatedCoin)
                await axios
                    .put('/api/profile/stats', updatedStats)
                    .then(() => getCurrentUser())
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
                updatedCoin = {
                    coin: user.coin + Math.floor(opponent.rewards.coin / 2),
                }
                updatedStats = {
                    xp: user.xp + Math.floor(opponent.rewards.xp / 2),
                    battles: user.stats.battles + 1,
                    wins: user.stats.wins,
                    losses: user.stats.losses,
                    draws: user.stats.draws + 1,
                }
                await axios.put('/api/profile/info', updatedCoin)
                await axios
                    .put('/api/profile/stats', updatedStats)
                    .then(() => getCurrentUser())
                break
            case 'Defeat':
                updatedCoin = {
                    coin: user.coin,
                }
                updatedStats = {
                    battles: user.stats.battles + 1,
                    wins: user.stats.wins,
                    losses: user.stats.losses + 1,
                    draws: user.stats.draws,
                }
                await axios.put('/api/profile/info', updatedCoin)
                await axios
                    .put('/api/profile/stats', updatedStats)
                    .then(() => getCurrentUser())
                break
            default:
                break
        }
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
                <Button label='Select Battle' type='link' path='/battleSetup' />
                <Button label='Main Menu' type='link' path='/' />
            </div>
        </div>
    )
}

export default BattleResults
