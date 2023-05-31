import React from 'react'
import { blueScore, redScore } from './images'

import './Score.scss'

const Score = ({ player }) => {
    const { name, score } = player
    const playerScore = [...new Array(score)]

    return (
        <div className={`${name}-score`}>
            {playerScore.map((count, i) => (
                <div key={'count' + i}>
                    {name === 'p1' ? (
                        <img src={blueScore} alt='blue score' />
                    ) : (
                        <img src={redScore} alt='red score' />
                    )}
                </div>
            ))}
        </div>
    )
}

export default Score
