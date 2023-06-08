import React, { useEffect } from 'react'

import { useGlobalContext } from '@context'
import { userLevels } from '@constants'

import './ExperienceBar.scss'

// This component displays the XP progress bar and current XP / next level XP
// It also handles level up logic by making an API call when user XP exceeds the XP required for their current level.
const ExperienceBar = () => {
    const { getCurrentUser, user } = useGlobalContext()
    const { xp, level } = user ?? {}
    const userNextLevel = userLevels[level]

    // Determine percent experience gained towards next level to update CSS styling
    const xpPercentage = () => {
        return `${(xp / userNextLevel) * 100}%`
    }

    // Check if user leveled up whenever their xp or next level xp changes
    useEffect(() => {
        const checkLevelUp = async () => {
            if (xp >= userNextLevel) {
                await handleLevelUp()
                await getCurrentUser()
            }
        }
        checkLevelUp()
    }, [xp, userNextLevel])

    return (
        <div className='experience-bar center-column'>
            <div className='progress-bar'>
                <div
                    className='progress-bar__inner'
                    style={{ width: xpPercentage() }}
                ></div>
            </div>
            <span>
                XP {xp} / {userNextLevel}
            </span>
        </div>
    )
}

export default ExperienceBar
