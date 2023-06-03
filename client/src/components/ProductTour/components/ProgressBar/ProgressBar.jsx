import React from 'react'

import './ProgressBar.scss'

const ProgressBar = ({ stages, progress }) => {
    return (
        <div className='onboard-bar outer'>
            {stages.map((stage, index) => (
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
                style={{ width: progress * (100 / (stages.length - 1)) + '%' }}
            />
        </div>
    )
}

export default ProgressBar
