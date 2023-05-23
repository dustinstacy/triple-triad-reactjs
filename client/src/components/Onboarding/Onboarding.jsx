import React, { useEffect, useState } from 'react'
import './Onboarding.scss'
import { useGlobalContext } from '../../context/GlobalContext'
import { Button } from '../'
import { FaInfoCircle, FaRegWindowClose } from 'react-icons/fa'

const ProgressBar = ({ stages, progress }) => {
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
                            index + 1 <= progress ? ' full' : ''
                        }`}
                    />
                </div>
            ))}
            <div
                className='onboard-bar inner'
                style={{ width: progress * 20 + '%' }}
            />
        </div>
    )
}

const ProgressModal = ({ stage, setModalOpen }) => {
    return (
        <div className='progress-modal'>
            <FaRegWindowClose
                className='close-modal'
                onClick={() => setModalOpen(false)}
            />
            {stage.replace(/(first)/, '$1 ')}
            <Button label='Do This' />
        </div>
    )
}

const Onboarding = () => {
    const { user } = useGlobalContext()
    const [progress, setProgress] = useState(0)
    const [modalOpen, setModalOpen] = useState(true)

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

        setProgress(completedStages)
    }

    useEffect(() => {
        if (user) getProgress()
    }, [user])

    return (
        <div className='onboarding panel'>
            {!modalOpen && (
                <FaInfoCircle
                    className='open-modal'
                    onClick={() => setModalOpen(true)}
                />
            )}

            <h1>GettIng &nbsp; StarteD</h1>
            <ProgressBar stages={stages} progress={progress} />
            {stages.map((stage, index) => {
                if (progress - (index + 1) > 0 && modalOpen) {
                    return (
                        <ProgressModal
                            key={stage}
                            stage={stage}
                            setModalOpen={setModalOpen}
                        />
                    )
                } else {
                    return
                }
            })}
            <Button
                label={`${stages[progress - 1]?.replace(/(first)/, '$1 ')}`}
            />
        </div>
    )
}

export default Onboarding
