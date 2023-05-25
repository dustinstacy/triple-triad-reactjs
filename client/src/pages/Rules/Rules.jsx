import React from 'react'

import { useGlobalContext } from '../../context/GlobalContext'
import { ProductTour } from '../../components'

import './Rules.scss'

const Rules = () => {
    const { user } = useGlobalContext()
    const stage = user?.onboardingStage

    return (
        <div className='rules page'>
            {stage === 3 && <ProductTour step={5} />}
            <div className='panel'>
                <h1>HoW To PLay</h1>
                <p>- This is how you play</p>
            </div>
        </div>
    )
}

export default Rules
