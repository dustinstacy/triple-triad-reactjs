import React from 'react'

import { addCoin } from '@api'
import { smlogo } from '@assets'
import { Button, ModalOverlay } from '@components'
import { useGlobalContext } from '@context'

import { completeUserStartingData } from '../../api'
import { onboardingStages } from '../../constants'
import './Introduction.scss'

const Introduction = ({ nextStage }) => {
    const { user } = useGlobalContext()

    const handleClick = async () => {
        await completeUserStartingData()
        await addCoin(user, 200)
        nextStage('/market')
    }

    return (
        <ModalOverlay>
            <div className='introduction stage around-column'>
                <h1 className='header'>
                    {onboardingStages[0].header}
                    <img
                        className='logo abs-center'
                        src={smlogo}
                        alt='small logo'
                    />
                </h1>
                <div className='body box start-column'>
                    <p>{onboardingStages[0].body}</p>
                    <Button
                        label={onboardingStages[0].label}
                        onClick={handleClick}
                    />
                </div>
            </div>
        </ModalOverlay>
    )
}

export default Introduction
