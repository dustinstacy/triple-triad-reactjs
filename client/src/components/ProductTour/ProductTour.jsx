import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContext'
import { onboardingStages } from '../../constants/onboardingStages'
import { Button } from '../../components'
import { getRandomCards, assignRandomValues } from '../../utils/randomizers'

import './ProductTour.scss'
import axios from 'axios'

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

const ProductTour = ({ step }) => {
    const { allCards, getCurrentUser, user, userCards, userDeck } =
        useGlobalContext()
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(true)
    const stage = user?.onboardingStage

    const stages = [
        'First Login',
        'First Packs',
        'First Cards',
        'First Deck',
        'How To Play',
    ]

    const nextStep = async (step) => {
        if (step === 0) {
            await axios
                .put('api/profile', {
                    coin: 3000,
                })
                .then(() => {
                    getCurrentUser()
                    navigate('/market')
                })
        }

        if (step === 1) {
            setModalOpen(false)
        }

        if (step === 2) {
            setModalOpen(false)
        }

        if (step === 3) {
            const starterCards = [...Array(15)]
            getRandomCards(starterCards, 'common', allCards)
            starterCards.forEach((card) => {
                assignRandomValues(card)
                axios.post('/api/collection/new', {
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
            navigate('/collection')
        }

        if (step === 4) {
            setModalOpen(false)
        }

        if (step === 5) {
            setModalOpen(false)
            axios.put('/api/profile/onboarding', {
                onboardingStage: user.onboardingStage + 1,
            })
        }
    }

    useEffect(() => {
        if (user?.inventory.length > 0) {
            if (user.onboardingStage === 0) {
                axios.put('/api/profile/onboarding', {
                    onboardingStage: user.onboardingStage + 1,
                })
                setTimeout(() => {
                    getCurrentUser()
                    navigate('/packs')
                }, 1000)
            }
        }
    }, [user?.inventory])

    useEffect(() => {
        if (userCards.length > 0 && stage === 1) {
            setTimeout(() => {
                axios.put('api/profile/onboarding', {
                    onboardingStage: user.onboardingStage + 1,
                })
            }, 5000)
        }
    }, [userCards])

    useEffect(() => {
        if (userDeck.length === 15 && stage === 2) {
            setTimeout(() => {
                axios
                    .put('api/profile/onboarding', {
                        onboardingStage: user.onboardingStage + 1,
                    })
                    .then(() => navigate('/rules'))
            })
        }
    }, userDeck)

    return (
        <>
            {modalOpen && (
                <div className='progress-modal'>
                    <h1>GettIng &nbsp; StarteD</h1>
                    <ProgressBar stages={stages} progress={stage + 1} />
                    <h1>{onboardingStages[step].header}</h1>
                    <p>{onboardingStages[step].body}</p>
                    <Button
                        label={onboardingStages[step].label}
                        onClick={() => nextStep(step)}
                    />
                </div>
            )}
        </>
    )
}

export default ProductTour
