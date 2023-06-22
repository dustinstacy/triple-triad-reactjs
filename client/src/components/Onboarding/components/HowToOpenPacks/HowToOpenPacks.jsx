import React, { useEffect, useState } from 'react'

import { smlogo } from '@assets'
import { Button, ModalOverlay } from '@components'
import { useGlobalContext } from '@context'
import { useToggle } from '@hooks'

import { onboardingStages } from '../../constants'
import { packOdds, openPack, cardValues } from '../../images'
import './HowToOpenPacks.scss'

const HowToOpenPacks = ({ nextStage }) => {
    const { user, userCards } = useGlobalContext()
    const stage = user?.onboardingStage
    const [step, setStep] = useState(1)
    const [modalOpen, toggleModalOpen, setModalOpen] = useToggle(true)

    const incrementStep = () => {
        setStep((step) => step + 1)
    }

    useEffect(() => {
        if (userCards?.length > 0 && stage === 2) {
            setTimeout(() => {
                setModalOpen(true)
                setStep(4)
            }, 1000)
        }
    }, [, userCards])

    return (
        <>
            {modalOpen && (
                <ModalOverlay>
                    <div className='open-pack stage around-column'>
                        <div className='header-wrapper'>
                            <h1 className='header'>
                                {onboardingStages[2].header}
                                <img
                                    className='logo abs-center'
                                    src={smlogo}
                                    alt='small logo'
                                />
                            </h1>
                        </div>
                        {step === 1 && (
                            <div className='body box start-column'>
                                <p>{onboardingStages[2].body[0]}</p>
                                <Button
                                    label={onboardingStages[2].label[0]}
                                    onClick={incrementStep}
                                />
                            </div>
                        )}
                        {step === 2 && (
                            <div className='body box center'>
                                <p>{onboardingStages[2].body[1]}</p>
                                <img src={packOdds} alt='pack odds' />
                                <Button
                                    label={onboardingStages[2].label[0]}
                                    onClick={incrementStep}
                                />
                            </div>
                        )}
                        {step === 3 && (
                            <div className='body box center'>
                                <p>{onboardingStages[2].body[2]}</p>
                                <img src={openPack} alt='pack odds' />
                                <Button
                                    label={onboardingStages[2].label[1]}
                                    onClick={() => toggleModalOpen()}
                                />
                            </div>
                        )}
                        {step === 4 && (
                            <div className='body box center'>
                                <p>{onboardingStages[2].body[3]}</p>
                                <img src={cardValues} alt='cardValues' />
                                <Button
                                    label={onboardingStages[2].label[0]}
                                    onClick={() => nextStage('/collection')}
                                />
                            </div>
                        )}
                    </div>
                </ModalOverlay>
            )}
        </>
    )
}

export default HowToOpenPacks
