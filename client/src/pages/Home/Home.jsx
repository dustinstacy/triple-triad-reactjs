import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

import { useGlobalContext } from '../../context/GlobalContext'
import { onboardingStages } from '../../constants/onboardingStages'
import { Button, Footer } from '../../components'

import './Home.scss'

const ProgressBar = ({ stages, progress }) => {
    return (
        <div className='onboard-bar outer'>
            {stages.map((stage, index) => (
                <div key={stage} className='stage'>
                    <div className='stage__label'>{stage}</div>
                    <div
                        className={`progress-circle ${
                            index + 1 <= progress ? ' full' : ''
                        }`}
                    />
                </div>
            ))}
            <div
                className='onboard-bar inner'
                style={{ width: progress * (100 / (stages.length - 1)) + '%' }}
            />
        </div>
    )
}

const Onboarding = ({ stage }) => {
    const stages = [
        'First Login',
        'First Packs',
        'First Cards',
        'First Deck',
        'First Battle',
    ]

    return (
        <div className='onboarding panel'>
            <h1>GettIng &nbsp; StarteD</h1>
            <ProgressBar stages={stages} progress={stage + 1} />
            <Button
                label={onboardingStages[stage].label}
                path={onboardingStages[stage].path}
                type='link'
            />
        </div>
    )
}

const Home = () => {
    const { user } = useGlobalContext()
    const isLargeScreen = useMediaQuery('(min-width:1200px)')
    const stage = user?.onboardingStage

    return (
        <div className='home page'>
            {/* Will be conditionally rendered based on user's Onboarding progress */}
            <div className='section first'>
                {stage < 6 && <Onboarding stage={stage} />}
            </div>

            <div
                className={`section center gray ${
                    isLargeScreen ? 'right' : ''
                }`}
            >
                <div className='box'>
                    <Button label='Battle' type='link' path='/battleSetup' />
                </div>
            </div>
            <div className={`section center ${isLargeScreen ? 'left' : ''}`}>
                <div className='box'>
                    <Button label='COllectiON' type='link' path='/collection' />
                </div>
            </div>
            <div
                className={`section center gray ${
                    isLargeScreen ? 'right' : ''
                }`}
            >
                <div className='box'>
                    <Button label='MarKet' type='link' path='/packs' />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
