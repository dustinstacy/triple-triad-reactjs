import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@components'

import './BattleResultsButtons.scss'

const BattleResultsButtons = ({ loading, opponent, opponentDeck }) => {
    const navigate = useNavigate()
    // Navigate to battle intro page with stored opponent and opponent deck state
    const rematch = () => {
        removeStateFromLocalStorage()
        navigate('/battleIntro', {
            state: {
                opponent: opponent,
                opponentDeck: opponentDeck,
            },
        })
    }

    const selectOpponent = () => {
        removeStateFromLocalStorage()
        navigate('/opponentSelect')
    }

    const mainMenu = () => {
        removeStateFromLocalStorage()
        navigate('/')
    }

    const removeStateFromLocalStorage = () => {
        localStorage.removeItem('battleState')
    }

    return (
        <div className='results-buttons'>
            {!loading && (
                <>
                    <Button label='Select Opponent' onClick={selectOpponent} />
                    <Button label='Rematch' onClick={rematch} />
                    <Button label='Main Menu' onClick={mainMenu} />
                </>
            )}
        </div>
    )
}

export default BattleResultsButtons
