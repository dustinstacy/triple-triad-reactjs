import React, { useEffect, useState } from 'react'
import './Onboarding.scss'
import { useGlobalContext } from '../../context/GlobalContext'

const ProgressBar = () => {
    const { user } = useGlobalContext()
    const [progress, setProgress] = useState(0)

    const stages = [
        'firstLogin',
        'firstPurchase',
        'firstPack',
        'firstDeck',
        'firstBattle',
    ]

    const getProgress = () => {
        let completedStages = 0

        stages.forEach((stage) => {
            const stageCompleted = Object.entries(user?.onboarding).find(
                ([key, val]) => key === stage && val === true
            )

            if (stageCompleted) {
                completedStages++
            }
        })

        setProgress(completedStages * 20)
    }

    useEffect(() => {
        if (user) getProgress()
    }, [user])

    return (
        <div className='onboard-bar outer'>
            {stages.map((stage, index) => (
                <div key={stage} className='stage'>
                    <div className='stage__label'>{`${stage.replace(
                        /(first)/,
                        '$1 '
                    )}`}</div>
                    <div
                        className={`progress-circle ${
                            index + 1 <= progress / 20 ? ' full' : ''
                        }`}
                    />
                </div>
            ))}
            <div
                className='onboard-bar inner'
                style={{ width: progress + '%' }}
            />
        </div>
    )
}

const Onboarding = () => {
    return (
        <div className='onboarding'>
            <h1>GettIng &nbsp; StarteD</h1>
            <ProgressBar />
        </div>
    )
}

export default Onboarding
