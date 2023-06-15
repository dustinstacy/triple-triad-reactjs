import React, { useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner'

import { Button } from '@components'
import { useGlobalContext } from '@context'
import { calculateDeckPower } from '@utils'

import { addAllToDeck, removeAllFromDeck } from './api'
import { sortByTotalCardValue } from '../../utils'
import './DeckBar.scss'

// Renders the user's deck statistics and provides options to automatically manage the deck
const DeckBar = () => {
    const { userCards, userDeck, getCurrentUser } = useGlobalContext()
    const [fillDeckLoading, setFillDeckLoading] = useState(false)
    const [clearDeckLoading, setClearDeckLoading] = useState(false)

    // Calculate sum of all card values in user's deck
    const userDeckPower = calculateDeckPower(userDeck)

    // Sorts all cards not in the user's deck and creates an array from the
    // strongest cards equal in length to the remaining space in the deck.
    // Then handles the API requests to add the cards to the deck and updates the user data upon completion
    const autoBuild = async () => {
        setFillDeckLoading(true)
        const emptySlots = Math.min(35, userCards.length) - userDeck.length
        const unselectedCards = userCards.filter(
            (card) => !userDeck.find(({ _id }) => card._id === _id)
        )
        const totalValueArray = sortByTotalCardValue(unselectedCards)
        const newDeckCardsArray = totalValueArray.slice(0, emptySlots)
        await addAllToDeck(newDeckCardsArray)
        await getCurrentUser()
        setFillDeckLoading(false)
    }

    // Removes all cards from the user's deck using an API request
    // and updates the user data upon completion
    const emptyDeck = async () => {
        setClearDeckLoading(true)
        await removeAllFromDeck(userDeck)
        await getCurrentUser()
        setClearDeckLoading(false)
    }

    // Determine the label for the fill deck button based on the fillDeckLoading state
    const fillDeckLabel = fillDeckLoading ? (
        <ThreeCircles
            color='#ffffff'
            wrapperClass='purchase-loader'
            visible={fillDeckLoading}
            height={'24px'}
        />
    ) : (
        'Fill Deck'
    )

    // Determine the label for the clear deck button based on the clearDeckLoading state
    const clearDeckLabel = clearDeckLoading ? (
        <ThreeCircles
            color='#ffffff'
            wrapperClass='purchase-loader'
            visible={clearDeckLoading}
            height={'24px'}
        />
    ) : (
        'Clear Deck'
    )

    return (
        <div className='deck center'>
            <div className='deck-stats center'>
                <div className='count center-column'>
                    <p>Cards in Deck</p>
                    <p>
                        <span>{userDeck.length}</span>
                    </p>
                </div>
                <div className='strength center-column'>
                    <p>Power</p>
                    {userDeckPower}
                </div>
            </div>

            <div className='section'>
                <Button
                    onClick={autoBuild}
                    label={fillDeckLabel}
                    disabled={fillDeckLoading || clearDeckLoading}
                />
                <Button
                    onClick={emptyDeck}
                    label={clearDeckLabel}
                    disabled={clearDeckLoading || fillDeckLoading}
                />
            </div>
        </div>
    )
}
export default DeckBar
