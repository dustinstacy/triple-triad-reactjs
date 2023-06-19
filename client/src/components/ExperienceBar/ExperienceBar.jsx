import React, { useEffect, useState } from 'react'

import { ModalOverlay } from '@components'
import { useGlobalContext } from '@context'
import { userLevels } from '@constants'

import { handleLevelUp } from './api'
import { LevelUpScreen } from './components'
import './ExperienceBar.scss'

// This component displays the XP progress bar and current XP / next level XP
// It also handles level up logic by making an API call when user XP exceeds the XP required for their current level.
const ExperienceBar = () => {
    const { getCurrentUser, user } = useGlobalContext()
    const { xp, level } = user ?? {}
    const [newLevelAlert, setNewLevelAlert] = useState(false)

    const userPrevLevel = userLevels[level - 1]
    const userNextLevel = userLevels[level]

    // Determine percent experience gained towards next level to update CSS styling
    const xpPercentage = () => {
        return `${
            ((xp - userPrevLevel) / (userNextLevel - userPrevLevel)) * 100
        }%`
    }

    // Check if user leveled up whenever their xp or next level xp changes
    useEffect(() => {
        const checkLevelUp = async () => {
            if (xp >= userNextLevel) {
                await handleLevelUp(user)
                await getCurrentUser()
                setNewLevelAlert(true)
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
                XP {xp - userPrevLevel} / {userNextLevel - userPrevLevel}
            </span>
            {!newLevelAlert && (
                <ModalOverlay>
                    <LevelUpScreen setNewLevelAlert={setNewLevelAlert} />
                </ModalOverlay>
            )}
        </div>
    )
}

export default ExperienceBar
