import React, { useEffect, useState } from 'react'

import { ModalOverlay } from '@components'
import { useGlobalContext } from '@context'
import { userLevels } from '@constants'

import { handleLevelUp } from './api'
import { LevelUpScreen } from './components'
import './ExperienceBar.scss'

const ExperienceBar = () => {
    const { getCurrentUser, user } = useGlobalContext()
    const { xp, level } = user ?? {}
    const [newLevelAlert, setNewLevelAlert] = useState(false)
    const [startXP, setStartXP] = useState(xp)
    const [animatedXP, setAnimatedXP] = useState(xp - userLevels[level - 1])

    const userPrevLevel = userLevels[level - 1]
    const userNextLevel = userLevels[level]

    const xpPercentage = () => {
        return `${
            ((xp - userPrevLevel) / (userNextLevel - userPrevLevel)) * 100
        }%`
    }

    useEffect(() => {
        const checkLevelUp = async () => {
            if (xp >= userNextLevel) {
                await handleLevelUp(user)
                await getCurrentUser()
                setTimeout(async () => {
                    setNewLevelAlert(true)
                }, 1500)
            }
        }

        checkLevelUp()
    }, [xp, userNextLevel])

    useEffect(() => {
        if (startXP !== xp) {
            const startTime = Date.now()
            const duration = 1000 // 1 second
            const targetXP = xp

            const animateXP = () => {
                const currentTime = Date.now()
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / duration, 1)
                let updatedXP

                if (animatedXP >= userNextLevel) {
                    updatedXP = animatedXP % userNextLevel
                    if (updatedXP === 0) {
                        setStartXP(xp)
                    }
                } else {
                    updatedXP = Math.round(
                        startXP + (targetXP - startXP) * progress
                    )
                }

                setAnimatedXP(updatedXP - userPrevLevel)

                if (progress < 1) {
                    requestAnimationFrame(animateXP)
                }
            }

            requestAnimationFrame(animateXP)
        }
    }, [xp])

    return (
        <div className='experience-bar center-column'>
            <div className='progress-bar'>
                <div
                    className='progress-bar__inner'
                    style={{ width: xpPercentage() }}
                ></div>
            </div>
            <span>
                XP {animatedXP} / {userNextLevel - userPrevLevel}
            </span>
            {newLevelAlert && (
                <ModalOverlay>
                    <LevelUpScreen setNewLevelAlert={setNewLevelAlert} />
                </ModalOverlay>
            )}
        </div>
    )
}

export default ExperienceBar
