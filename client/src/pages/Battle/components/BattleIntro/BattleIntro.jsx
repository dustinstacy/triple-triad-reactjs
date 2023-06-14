import React from 'react'

import './BattleIntro.scss'

const BattleIntro = ({ playerOne, playerTwo }) => {
    return (
        <div className='battle-intro fill between-column'>
            <div
                className='p2-intro start box'
                style={{ background: playerTwo.color }}
            >
                <img src={playerTwo.image} alt='p2 image' />
                <h2>{playerTwo.name}</h2>
            </div>
            <h1 className='center background-gradient abs-center'>VS</h1>
            <div
                className='p1-intro end box'
                style={{ background: playerOne.color }}
            >
                <h2>{playerOne.username}</h2>
                <img src={playerOne.image} alt='p2 image' />
            </div>
        </div>
    )
}

export default BattleIntro
