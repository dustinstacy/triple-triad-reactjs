import React, { useEffect, useState } from 'react'
import './Onboarding.scss'
import { useGlobalContext } from '../../context/GlobalContext'
import { Button } from '../'
import { progressModals } from '../../constants/progressModals'
import { FaInfoCircle, FaRegWindowClose } from 'react-icons/fa'
import { starterCards } from '../../constants/starterCards'
import axios from 'axios'
import { assignRandomValues } from '../../utils/randomizers'

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
                style={{ width: progress * 25 + '%' }}
            />
        </div>
    )
}

const ProgressModal = ({ progress, setModalOpen }) => {
    return (
        <div className='progress-modal'>
            <FaRegWindowClose
                className='close-modal'
                onClick={() => setModalOpen(false)}
            />
            <h1>{progressModals[progress].header}</h1>
            <p>{progressModals[progress].body}</p>
            <Button
                label={progressModals[progress].label}
                path={progressModals[progress].path}
                type='link'
            />
        </div>
    )
}

const Onboarding = () => {
    const { user, userCards, userDeck } = useGlobalContext()
    const [progress, setProgress] = useState(0)
    const [modalOpen, setModalOpen] = useState(true)

    const currentOnboarding = user.onboarding
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
        if (user) {
            getProgress()
        }
        if (user?.onboarding.firstLogin === false) {
            axios.put('api/profile/onboarding', {
                firstLogin: true,
            })
            axios.put('api/profile', {
                coin: user.coin + 3000,
            })
            starterCards.forEach((card) => {
                assignRandomValues(card)
                axios.post('api/collection/new', {
                    user: user._id,
                    name: card.name,
                    number: card.number,
                    image: card.image,
                    rarity: card.rarity,
                    values: card.values,
                    empower: card.empower,
                    weaken: card.weaken,
                })
            })
        }
        if (
            user?.inventory.length > 0 &&
            user.onboarding.firstPurchase === false
        ) {
            currentOnboarding.firstPurchase = true
            axios.put('api/profile/onboarding', currentOnboarding)
        }
        if (userCards.length > 0 && user.onboarding.firstPack === false) {
            currentOnboarding.firstPack = true
            axios.put('api/profile/onboarding', currentOnboarding)
        }
        if (userDeck.length > 0 && user.onboarding.firstDeck === false) {
            currentOnboarding.firstDeck = true
            axios.put('api/profile/onboarding', currentOnboarding)
        }
        if (user.stats.battles > 1 && user.onboarding.firstBattle === false) {
            currentOnboarding.firstBattle = true
            axios.put('api/profile/onboarding', currentOnboarding)
        }
    }, [user, userCards, userDeck, currentOnboarding])

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
                if (progress === index && modalOpen) {
                    return (
                        <ProgressModal
                            key={stage}
                            progress={progress}
                            setModalOpen={setModalOpen}
                        />
                    )
                } else {
                    return
                }
            })}
            <Button
                label={progressModals[progress].label}
                path={progressModals[progress].path}
                type='link'
            />
        </div>
    )
}

export default Onboarding
