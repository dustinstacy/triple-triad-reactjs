import React from 'react'

import { ModalOverlay } from '@components'

import {
    Introduction,
    HowToGetCards,
    HowToOpenPacks,
    HowToBuildADeck,
    HowToPlay,
    CompletionReward,
} from './components'
import './Onboarding.scss'

const Onboarding = () => {
    return (
        <ModalOverlay>
            <Introduction />
            <HowToGetCards />
            <HowToOpenPacks />
            <HowToBuildADeck />
            <HowToPlay />
            <CompletionReward />
        </ModalOverlay>
    )
}

export default Onboarding
