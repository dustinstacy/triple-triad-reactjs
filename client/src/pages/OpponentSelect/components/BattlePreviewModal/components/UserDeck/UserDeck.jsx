import React from 'react'

import { Button } from '@components'
import { useGlobalContext } from '@context'

import './UserDeck.scss'
import { calculateDeckPower } from '@utils'

// Renders the user's deck information.
const UserDeck = ({ selectedOpponent }) => {
    const { userDeck } = useGlobalContext()

    // Calculate the sum of all card values in the user's deck
    const userDeckPower = calculateDeckPower(userDeck)

    return (
        <div className='user-deck panel start-column'>
            <h3>Your Deck</h3>
            <div className='deck-wrapper fill around'>
                <div className='deck-info around-column'>
                    <div className='user-deck-power'>
                        <h4>Power</h4>
                        <span>{userDeckPower || 0}</span>
                    </div>
                    <div className='user-deck-count'>
                        <h4>Card Count</h4>
                        <span>{userDeck.length}</span>
                    </div>
                    <Button
                        label='Optimize Deck'
                        type='link'
                        path='/collection'
                    />
                </div>
            </div>
        </div>
    )
}

export default UserDeck
