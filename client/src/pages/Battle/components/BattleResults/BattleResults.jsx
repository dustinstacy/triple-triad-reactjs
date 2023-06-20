import React, { useEffect, useState } from 'react'

import { addCoin, addExperience, updateUserStats } from '@api'
import { useGlobalContext } from '@context'

import { BattleResultsButtons, CoinReward, XPReward } from './components'
import { resultsFrame } from './images'
import './BattleResults.scss'

// Renders the user's battle results including any rewards gained
const BattleResults = ({ playerOne, playerTwo, opponentDeck }) => {
    const { getCurrentUser } = useGlobalContext()

    const [battleResult, setBattleResult] = useState(null)
    const [loading, setLoading] = useState(true)

    const user = playerOne.user
    const opponent = playerTwo.user

    useEffect(() => {
        setBattleResults()
    }, [])

    const setBattleResults = () => {
        if (playerOne.battleScore > playerTwo.battleScore) {
            setBattleResult('Victory')
            handleResult('win', opponent.rewards)
        } else if (playerOne.battleScore < playerTwo.battleScore) {
            setBattleResult('Defeat')
            handleResult('loss')
        } else if (playerOne.battleScore === playerTwo.battleScore) {
            setBattleResult('Draw')
            handleResult('draw', opponent.rewards)
        }
    }

    const handleResult = async (resultType, rewards) => {
        await updateUserStats(user, resultType)
        await addCoin(
            user,
            resultType === 'win' ? rewards.coin : Math.floor(rewards.coin / 2)
        )
        setTimeout(async () => {
            await addExperience(
                user,
                resultType === 'win' ? rewards.xp : Math.floor(rewards.xp / 2)
            )
            await getCurrentUser()
        }, 1000)
    }

    useEffect(() => {
        if (battleResult === 'Defeat') {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 4000)
        }
    }, [battleResult])

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
                    <img
                        className='user-image'
                        src={user?.image}
                        alt='user image'
                    />
                    <div className='rewards around-column'>
                        {battleResult === 'Victory' && (
                            <>
                                <XPReward xpReward={opponent?.rewards.xp} />
                                <CoinReward
                                    coinReward={opponent?.rewards.coin}
                                />
                            </>
                        )}
                        {battleResult === 'Draw' && (
                            <>
                                <XPReward xpReward={opponent?.rewards.xp / 2} />
                                <CoinReward
                                    coinReward={opponent?.rewards.coin / 2}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
            <BattleResultsButtons
                loading={loading}
                opponent={opponent}
                opponentDeck={opponentDeck}
            />
        </div>
    )
}

export default BattleResults
