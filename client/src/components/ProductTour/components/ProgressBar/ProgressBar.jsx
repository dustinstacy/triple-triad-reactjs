import React from 'react'

import { classSet } from '@utils'

import './ProgressBar.scss'

// Tracks and displays user's onboarding progress
const ProgressBar = ({ progress }) => {
    const progressStages = [
        'First Login',
        'First Pack',
        'First Card',
        'First Deck',
        'How To Play',
    ]

    const circleClasses = (index) =>
        classSet('progress-circle', index + 1 <= progress && 'full')

    return (
        <div className='progress-bar-outer'>
            {progressStages.map((stage, index) => (
                <div key={stage} className='stage'>
                    <div className='stage__label'>{stage}</div>
                    <div className={circleClasses(index)} />
                </div>
            ))}
            <div
                className='progress-bar-inner'
                style={{
                    width: progress * (100 / (progressStages.length - 1)) + '%',
                }}
            />
        </div>
    )
}

export default ProgressBar
