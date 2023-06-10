import React from 'react'
import { TbPlayCard } from 'react-icons/tb'

import { coinImage } from '@assets'
import { useGlobalContext } from '@context'

import './SelectedOpponent.scss'

// Renders selected opponent information
const SelectedOpponent = ({ selectedOpponent }) => {
    const { user } = useGlobalContext()
    const { name, image, level, minPower, maxPower, rewards } = selectedOpponent

    return (
        <div className='selected-opponent'>
            <h1 className='opponent-name'>{name}</h1>

            <img className='opponent-image' src={image} alt='opponent image' />
            <div className='opponent-info start-column'>
                <div className='info-top start'>
                    <div className='opponent-level center-column'>
                        <h2>Level</h2>
                        <span>{level}</span>
                    </div>
                    <div className='opponent-power center-column'>
                        <h2>Power</h2>
                        <span>
                            {minPower} - {maxPower}
                        </span>
                    </div>
                </div>

                <div className='rewards around-column'>
                    <h2>Possible Rewards</h2>
                    <div className='rewards__wrapper around'>
                        <div className='rewards-xp center'>
                            <span>{rewards.xp} XP</span>
                        </div>
                        <div className='rewards-coin center'>
                            <span>{rewards.coin}</span>
                            <img src={coinImage} alt='coin image' />
                        </div>
                        {!user?.defeatedEnemies.includes(`${name}`) && (
                            <div className='rewards-card center'>
                                <TbPlayCard className='card-icon' />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectedOpponent
