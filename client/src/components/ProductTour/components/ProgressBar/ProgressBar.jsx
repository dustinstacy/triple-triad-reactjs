import React from 'react'

import './ProgressBar.scss'

const ProgressBar = ({ progress }) => {
    const progressStages = [
        'First Login',
        'First Pack',
        'First Card',
        'First Deck',
        'How To Play',
    ]

    return (
        <div className='onboard-bar outer'>
            {progressStages.map((stage, index) => (
                <div key={stage} className='stage'>
                    <div className='stage__label'>{stage}</div>
                    <div
                        className={`progress-circle ${
                            index + 1 <= progress ? ' full' : ''
                        }`}
                    />
                </div>
            ))}
            <div
                className='onboard-bar inner'
                style={{
                    width: progress * (100 / (progressStages.length - 1)) + '%',
                }}
            />
        </div>
    )
}

export default ProgressBar
