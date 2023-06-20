import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { addCoin, addExperience, updateUserStats } from '@api'
import { useGlobalContext } from '@context'
import { Button } from '@components'

import { CoinReward, XPReward } from './components'
import { resultsFrame } from './images'
import './BattleResults.scss'

// Renders the user's battle results including any rewards gained
const BattleResults = ({ playerOne, playerTwo, opponentDeck }) => {
    const navigate = useNavigate()
    const { getCurrentUser } = useGlobalContext()

    const [battleResult, setBattleResult] = useState(null)

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

    // Navigate to battle intro page with stored opponent and opponent deck state
    const rematch = () => {
        navigate('/battleIntro', {
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
                    <img
                        className='user-image'
                        src={user?.image}
                        alt='user image'
                    />
                    <div className='rewards around-column'>
                        {battleResult === 'Victory' && (
                            <>
                                <XPReward xpReward={opponent.rewards.xp} />
                                <CoinReward
                                    coinReward={opponent.rewards.coin}
                                />
                            </>
                        )}
                        {battleResult === 'Draw' && (
                            <>
                                <XPReward xpReward={opponent.rewards.xp / 2} />
                                <CoinReward
                                    coinReward={opponent.rewards.coin / 2}
                                />
                            </>
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
                <Button label='Rematch' onClick={rematch} />
                <Button label='Main Menu' type='link' path='/' />
            </div>
        </div>
    )
}

export default BattleResults
