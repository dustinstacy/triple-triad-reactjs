import React, { useEffect, useState } from 'react'

import badgeImage from '@assets/page-images/roundResult.png'

import './RoundResult.scss'

const RoundResult = ({ playerOne, playerTwo }) => {
    const [imagesLoaded, setImagesLoaded] = useState(false)

    useEffect(() => {
        setImagesLoaded(false)
    }, [])

    const handleImagesLoaded = () => {
        setImagesLoaded(true)
    }

    return (
        <div
            className='round-result fill around'
            style={{ display: imagesLoaded ? 'flex' : 'none' }}
        >
            <div className='p2-battle-score center-column'>
                {playerTwo?.battleScore}
                <img src={playerTwo.user?.image} alt='p2 image' />
            </div>
            <img
                className='round-image'
                src={badgeImage}
                alt='round result background image'
                onLoad={handleImagesLoaded}
            />
            <div className='p1-battle-score center-column'>
                {playerOne.battleScore}
                <img src={playerOne.user.image} alt='p1 image' />
            </div>
        </div>
    )
}

export default RoundResult
