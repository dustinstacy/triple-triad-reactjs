import React from 'react'

import { Avatar, ExperienceBar } from '@components'

import { UserInventory } from './components'
import './UserSection.scss'

// This component acts as the parent component for all User-related components
const UserSection = ({ user }) => {
    const { username } = user ?? {}
    return (
        <div className='user-section'>
            <hr />
            <UserInventory user={user} />
            <div className='user-info'>
                <h2>{username}</h2>
                <ExperienceBar user={user} />
            </div>

            <Avatar levelShowing menu small />
        </div>
    )
}
export default UserSection
