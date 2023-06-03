import React from 'react'

import { coinImage } from '@assets'

import './UserInventory.scss'

const UserInventory = ({ user }) => {
    // Destructured using nullish coalescence to return empty object if user is null or undefined
    // Prevents errors generated from attempting to access properties on a null or undefined object
    const { coin } = user ?? {}

    return (
        <div className='user-inventory'>
            <p className='coin center'>
                {coin} <img src={coinImage} alt='coin' />
            </p>
        </div>
    )
}

export default UserInventory
