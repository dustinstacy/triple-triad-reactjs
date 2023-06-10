import React from 'react'

import './BattleRules.scss'

// Render battle rules for selected opponent
const BattleRules = ({ selectedOpponent }) => {
    // Calculate maximum number of rounds required for the selected opponent
    const roundsDisplay =
        selectedOpponent.minDeckSize / 5 +
        ' Round' +
        (selectedOpponent.minDeckSize > 5 ? 's' : '')

    return (
        <div className='battle-rules panel'>
            <h3>Battle Rules:</h3>
            <ul className='rules-list'>
                <li className='rule'>Standard</li>
                <li className='rule'>{roundsDisplay}</li>
            </ul>
        </div>
    )
}

export default BattleRules
