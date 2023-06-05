import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { Button } from '@components'
import { onboardingStages } from '@constants'
import { useGlobalContext } from '@context'
import { getRandomCards, assignRandomCardValues } from '../../utils/randomizers'

import { ProgressBar } from './components'
import './ProductTour.scss'

const ProductTour = ({ step }) => {
    const { allCards, getCurrentUser, user, userCards, userDeck } =
        useGlobalContext()
    const navigate = useNavigate()

    const [modalOpen, setModalOpen] = useState(true)
    const stage = user?.onboardingStage

    const incrementOnboardingStage = async (path) => {
        try {
            setTimeout(async () => {
                await axios.put('/api/profile/onboarding', {
                    onboardingStage: user.onboardingStage + 1,
                })
                await getCurrentUser()
                navigate(`${path}`)
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    const nextStep = async (step) => {
        setTimeout(() => {
            setModalOpen(false)
        }, 500)

        try {
            switch (step) {
                case 0:
                    await axios.post('/api/collection/')
                    await axios.post('/api/deck/')
                    await axios.put('/api/profile/info', {
                        coin: 500,
                    })
                    await getCurrentUser()
                    navigate('/market')
                    break
                case 3:
                    const starterCards = getRandomCards(
                        5,
                        { Common: 90, Uncommon: 10 },
                        allCards
                    )
                    starterCards.forEach(async (card) => {
                        assignRandomCardValues(card)
                        const cardData = {
                            name: card.name,
                            number: card.number,
                            image: card.image,
                            rarity: card.rarity,
                            empower: card.empower,
                            weaken: card.weaken,
                            values: card.values,
                        }
                        try {
                            await axios.put('/api/collection/new', cardData)
                        } catch (error) {
                            console.log(error)
                        }
                    })

                    navigate('/collection')
                    break
                case 5:
                    incrementOnboardingStage('/rules')
                    break
                default:
                    break
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user?.inventory.length > 0) {
            if (user.onboardingStage === 0) {
                incrementOnboardingStage('/packs')
            }
        }
    }, [user?.inventory])

    useEffect(() => {
        if (userCards?.length > 0 && stage === 1) {
            incrementOnboardingStage('/packs')
        }
    }, [userCards])

    useEffect(() => {
        if (userDeck?.length >= 5 && stage === 2) {
            incrementOnboardingStage('/rules')
        }
    }, [userDeck])

    return (
        <>
            <div className={`progress-modal ${modalOpen ? 'open' : 'close'}`}>
                <h1>GettIng &nbsp; StarteD</h1>
                <ProgressBar progress={stage + 1} />
                <h1>{onboardingStages[step].header}</h1>
                <p>{onboardingStages[step].body}</p>
                <Button
                    label={onboardingStages[step].label}
                    onClick={() => nextStep(step)}
                />
            </div>
        </>
    )
}

export default ProductTour
