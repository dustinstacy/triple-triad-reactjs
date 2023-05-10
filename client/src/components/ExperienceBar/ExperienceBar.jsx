import React, { useEffect } from 'react'
import axios from 'axios'

import { useGlobalContext } from '../../context/GlobalContext'
import { levels } from '../../constants/levels'

import './ExperienceBar.scss'

// This component displays the XP progress bar and current XP / next level XP
// It also handles level up logic by making an API call when user XP exceeds the XP required for their current level.
const ExperienceBar = () => {
    const { getCurrentUser, user } = useGlobalContext()
    const { xp, level } = user ?? {}
    const userNextLevel = levels[level]

    const xpPercentage = () => {
        return `${(xp / userNextLevel) * 100}%`
    }

    const handleLevelUp = () => {
        axios
            .put('/api/profile', { level: level + 1 })
            .then(() => getCurrentUser())
    }

    useEffect(() => {
        if (xp >= userNextLevel) {
            handleLevelUp()
        }
    }, [xp, userNextLevel])

    return (
        <div className='experience-bar'>
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
