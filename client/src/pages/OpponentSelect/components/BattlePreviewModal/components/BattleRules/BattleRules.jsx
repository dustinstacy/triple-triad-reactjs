import React from 'react'

import './BattleRules.scss'

// Render battle rules for selected opponent
const BattleRules = ({ selectedOpponent }) => {
    return (
        <div className='battle-rules panel'>
            <h3>Rounds:</h3>
            <p>{selectedOpponent.rounds}</p>
            <h3>Rules:</h3>
            <p>{selectedOpponent.rules}</p>
            <h3>Req. Card Count:</h3>
            <p>{selectedOpponent.cardCount}</p>
        </div>
    )
}

export default BattleRules
