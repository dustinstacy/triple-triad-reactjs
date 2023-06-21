import React from 'react'

import { redScore, blueScore } from '../../../Score/images'
import './RoundScores.scss'

const RoundScores = ({ p1Score, p2Score, round }) => {
    return (
        <div className='round-row between'>
            <div className='p2-round-score'>
                {p2Score !== '' && (
                    <>
                        <span>{p2Score}</span>

                        <img
                            className='abs-center'
                            src={redScore}
                            alt='red score'
                        />
                    </>
                )}
            </div>

            <div className='round panel'>
                <h3>{round}</h3>
            </div>
            <div className='p1-round-score'>
                {p1Score !== '' && (
                    <>
                        <span>{p1Score}</span>
                        <img
                            className='abs-center'
                            src={blueScore}
                            alt='red score'
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default RoundScores
