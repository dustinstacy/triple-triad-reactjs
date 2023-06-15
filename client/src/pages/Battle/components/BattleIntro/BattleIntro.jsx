import React from 'react'

import './BattleIntro.scss'

// Renders matchup screen prior to battle
const BattleIntro = ({ playerOne, playerTwo }) => {
    return (
        <div className='battle-intro fill between-column'>
            <div className='p2-intro start'>
                <img
                    src={playerTwo?.image}
                    style={{ background: playerTwo?.color }}
                    alt='p2 image'
                />
                <h2>{playerTwo?.name}</h2>
            </div>
            <div className='center versus'>
                <h1>VS</h1>
            </div>
            <div className='p1-intro end '>
                <h2>{playerOne?.username}</h2>
                <img
                    src={playerOne?.image}
                    style={{ background: playerOne?.color }}
                    alt='p2 image'
                />
            </div>
        </div>
    )
}

export default BattleIntro
