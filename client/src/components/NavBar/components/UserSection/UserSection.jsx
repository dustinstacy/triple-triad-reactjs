import React from 'react'

import { ExperienceBar } from '@components'

import { Avatar, UserInventory } from './components'
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

            <Avatar user={user} navbar={true} />
        </div>
    )
}
export default UserSection
