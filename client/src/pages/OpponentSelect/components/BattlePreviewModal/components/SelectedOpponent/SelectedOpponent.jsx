import React from 'react'

import { coinImage } from '@assets'

import './SelectedOpponent.scss'

// Renders selected opponent information
const SelectedOpponent = ({ selectedOpponent }) => {
    const { name, image, level, minPower, maxPower, rewards } = selectedOpponent

    return (
        <div className='selected-opponent'>
            <h1 className='opponent-name'>{name}</h1>

            <img className='opponent-image' src={image} alt='opponent image' />
            <div className='opponent-info start-column'>
                <div className='info-top start'>
                    <div className='opponent-power center-column'>
                        <h2>Power</h2>
                        <span>{Math.floor(minPower + maxPower / 2)}</span>
                    </div>
                </div>

                <div className='rewards around-column'>
                    <h2>Possible Rewards</h2>
                    <div className='rewards__wrapper center'>
                        <div className='rewards-coin center'>
                            <img src={coinImage} alt='coin image' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectedOpponent
