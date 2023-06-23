import React from 'react'

import { addCardToCollection, addCoin, addItemToInventory } from '@api'
import { smlogo } from '@assets'
import { Button, ModalOverlay } from '@components'
import { useGlobalContext } from '@context'
import { createCardData } from '@utils'
import { assignRandomCardValues, getRandomCards } from '@utils/randomizers'

import { completeUserStartingData, skipOnboarding } from '../../api'
import { onboardingStages } from '../../constants'
import './Introduction.scss'

const Introduction = ({ nextStage }) => {
    const { allCards, allItems, getCurrentUser, user } = useGlobalContext()

    const starterCardCount = 5
    const starterCardOdds = { Common: 80, Uncommon: 20 }

    const handleBegin = async () => {
        await completeUserStartingData()
        await addCoin(user, 200)
        nextStage('/market')
    }

    const handleSkip = async () => {
        await completeUserStartingData()
        await addCoin(user, 200)
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
        const rareCard = allItems.find((item) => item.name === 'Rare Card')
        await addItemToInventory(user.inventory, rareCard)
        await skipOnboarding(user)
        await getCurrentUser()
    }

    return (
        <ModalOverlay>
            <div className='introduction stage around-column'>
                <div className='header-wrapper'>
                    <h1 className='header'>
                        {onboardingStages[0].header}
                        <img
                            className='logo abs-center'
                            src={smlogo}
                            alt='small logo'
                        />
                    </h1>
                </div>
                <div className='body box start-column'>
                    <p>{onboardingStages[0].body}</p>
                    <div className='buttons center-column'>
                        <a onClick={handleSkip}>Skip</a>
                        <Button
                            label={onboardingStages[0].label}
                            onClick={handleBegin}
                        />
                    </div>
                </div>
            </div>
        </ModalOverlay>
    )
}

export default Introduction
