import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { addCardToCollection, addCoin, addItemToInventory } from '@api'
import { Button, ModalOverlay } from '@components'
import { useGlobalContext } from '@context'
import { onboardingStages } from '@constants'
import { classSet, createCardData } from '@utils'
import { getRandomCards, assignRandomCardValues } from '@utils/randomizers'

import { completeUserStartingData, incrementOnboardingStage } from './api'
import { ProgressBar } from './components'
import './ProductTour.scss'

// Renders a guided product tour for new users.
// The `step` prop determines the page navigation and button functionality for the tour modal.
const ProductTour = ({ step }) => {
    const navigate = useNavigate()
    const { allCards, allItems, getCurrentUser, user, userCards, userDeck } =
        useGlobalContext()
    const stage = user?.onboardingStage ?? {}

    const [progress, setProgress] = useState(0)
    const [modalOpen, setModalOpen] = useState(true)

    // Definte start cards amound and randomized card odds
    const starterCardCount = 5
    const starterCardOdds = { Common: 80, Uncommon: 20 }

    // Conditionally navigate and update state progress based on the current stage and progress
    useEffect(() => {
        if (stage === 0) {
            navigate('/')
        }
        if (stage <= 1 && progress === 0) {
            setTimeout(() => setProgress(1), 500)
        }
        if (stage === 1) {
            navigate('/market')
        }
        if (stage === 2) {
            setTimeout(() => setProgress(2), 500)
        }
        if (stage === 2 || stage === 3) {
            navigate('/packs')
        }
        if ((stage === 3 || stage === 4) && progress <= 2) {
            setTimeout(() => setProgress(3), 500)
        }
        if (stage === 4) {
            navigate('/collection')
        }
        if (stage === 5) {
            setTimeout(() => setProgress(4))
        }
        if (stage === 5 || stage === 6) {
            navigate('/rules')
        }
        if (stage === 6) {
            setTimeout(() => setProgress(5))
        }
    }, [])

    // Handles the click event of the product tour modal button
    const handleClick = async (step) => {
        setModalOpen(false)
        try {
            const stepFunction = stepFunctions[step]
            if (stepFunction) {
                await stepFunction()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Define step-specific functions used during the product tour
    const stepFunctions = {
        0: async () => {
            await completeUserStartingData()
            await addCoin(user, 200)
            await nextStage('/market')
        },
        3: async () => {
            const starterCards = getRandomCards(
                starterCardCount,
                starterCardOdds,
                allCards
            )
            starterCards.forEach(async (card) => {
                assignRandomCardValues(card)
                const cardData = createCardData(card)
                try {
                    await addCardToCollection(cardData)
                } catch (error) {
                    console.log(error)
                }
            })
            await nextStage('/collection')
        },
        5: async () => {
            const rareCard = allItems.find((item) => item.name === 'Rare Card')
            await addItemToInventory(user.inventory, rareCard)
            await nextStage()
        },
        6: async () => {
            await nextStage()
        },
    }

    // Checks for specific conditions to advance the user's onboarding stage
    useEffect(() => {
        if (user?.inventory.length > 0 && stage === 1) {
            setTimeout(async () => {
                await nextStage('/packs')
            }, 2000)
        }

        if (userCards?.length > 0 && stage === 2) {
            setTimeout(async () => {
                await nextStage()
            }, 1500)
        }

        if (userDeck?.length >= 5 && stage === 4) {
            setTimeout(async () => {
                await nextStage('/rules')
            }, 1500)
        }
    }, [user?.inventory, userCards, userDeck, stage])

    // Advances the user to next onboarding stage
    const nextStage = async (path) => {
        try {
            await incrementOnboardingStage(stage)
            await getCurrentUser()
            path && navigate(`${path}`)
        } catch (error) {
            console.log(error)
        }
    }

    const productTourClasses = classSet(
        'product-tour',
        'around-column',
        modalOpen ? 'open' : 'close'
    )

    return (
        <>
            {modalOpen && (
                <ModalOverlay>
                    <div className={productTourClasses}>
                        <h1>GettIng &nbsp; StarteD</h1>
                        <ProgressBar progress={progress} />
                        <h3>{onboardingStages[step].header}</h3>
                        <p>{onboardingStages[step].body}</p>
                        <Button
                            label={onboardingStages[step].label}
                            onClick={() => handleClick(step)}
                        />
                    </div>
                </ModalOverlay>
            )}
        </>
    )
}

export default ProductTour
