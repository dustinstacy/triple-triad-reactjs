import React from 'react'

import { coinImage } from '@assets'
import { useGlobalContext } from '@context'

import './UserInventory.scss'

// Section to display user inventory items and counts
const UserInventory = () => {
    const { user } = useGlobalContext()
    const { coin } = user ?? {}

    return (
        <div className='user-inventory'>
            <div className='coin center'>
                <p className='coin-amount'>{coin}</p>
                <img src={coinImage} alt='coin' />
            </div>
        </div>
    )
}

export default UserInventory
