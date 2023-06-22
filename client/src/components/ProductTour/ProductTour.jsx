import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, ModalOverlay } from '@components'
import { useGlobalContext } from '@context'
import { classSet, createCardData } from '@utils'
import { getRandomCards, assignRandomCardValues } from '@utils/randomizers'

import { ProgressBar } from './components'
import './ProductTour.scss'

// Renders a guided product tour for new users.
// The `step` prop determines the page navigation and button functionality for the tour modal.
const ProductTour = ({ step }) => {
    // Definte start cards amound and randomized card odds
    const starterCardCount = 5
    const starterCardOdds = { Common: 80, Uncommon: 20 }

    // Define step-specific functions used during the product tour
    const stepFunctions = {
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
}

export default ProductTour
