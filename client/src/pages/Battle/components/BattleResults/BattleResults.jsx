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

    const coinReward = Math.floor(
        opponent.rewards.coin *
            (playerOne.battleScore + 1 - playerTwo.battleScore)
    )
    const xpReward = Math.floor(
        opponent.rewards.xp *
            (playerOne.battleScore + 1 - playerTwo.battleScore)
    )

    useEffect(() => {
        setBattleResults()
    }, [])

    const setBattleResults = () => {
        if (playerOne.battleScore > playerTwo.battleScore) {
            setBattleResult('Victory')
            handleResult('win')
        } else if (playerOne.battleScore < playerTwo.battleScore) {
            setBattleResult('Defeat')
            handleResult('loss')
        } else if (playerOne.battleScore === playerTwo.battleScore) {
            setBattleResult('Draw')
            handleResult('draw')
        }
    }

    const handleResult = async (resultType) => {
        await updateUserStats(user, resultType)
        if (battleResult === 'Defeat') {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
            return
        } else {
            await addCoin(user, coinReward)
            setTimeout(async () => {
                await addExperience(user, xpReward)
                await getCurrentUser()
            }, 1000)
            setTimeout(() => {
                setLoading(false)
            }, 4000)
        }
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
                    <img
                        className='user-image'
                        src={user?.image}
                        alt='user image'
                    />
                    <div className='rewards around-column'>
                        {battleResult === 'Victory' && (
                            <>
                                <XPReward xpReward={xpReward} />
                                <CoinReward coinReward={coinReward} />
                            </>
                        )}
                        {battleResult === 'Draw' && (
                            <>
                                <XPReward xpReward={xpReward} />
                                <CoinReward coinReward={coinReward} />
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
