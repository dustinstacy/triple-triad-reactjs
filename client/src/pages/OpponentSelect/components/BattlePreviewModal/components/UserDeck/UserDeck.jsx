import React from 'react'

import { Card } from '@components'
import { useGlobalContext } from '@context'

import './UserDeck.scss'

// Renders the user's deck information.
const UserDeck = ({ selectedOpponent }) => {
    const { userDeck } = useGlobalContext()

    // Calculate the sum of all card values in the user's deck
    const userDeckPower = userDeck.reduce(
        (total, card) =>
            total +
            card.values.reduce(
                (sum, current) => parseInt(sum) + parseInt(current),
                0
            ),
        0
    )

    // Calculate the user's relative deck power based on the number of cards
    // in the user's deck and how many will be used in the battle
    const relativeUserDeckPower = Math.floor(
        (userDeckPower / userDeck.length) * selectedOpponent.minDeckSize
    )

    return (
        <div className='user-deck panel start-column'>
            <h3>Your Deck</h3>
            <div className='deck-wrapper fill around'>
                <div className='deck-info around-column'>
                    <div className='user-deck-power'>
                        <h4>Power</h4>
                        <span>{userDeckPower}</span>
                    </div>
                    <div className='relative-power'>
                        <h4>Relative Power</h4>
                        <span>{relativeUserDeckPower}</span>
                    </div>
                    <div className='user-deck-count'>
                        <h4>Card Count</h4>
                        <span>{userDeck.length}</span>
                    </div>
                </div>
                <div className='deck-image'>
                    <Card card={userDeck[0]} />
                </div>
            </div>
        </div>
    )
}

export default UserDeck
