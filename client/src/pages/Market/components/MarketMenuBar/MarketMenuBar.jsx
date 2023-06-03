import React from 'react'

import { coinImage } from '@assets'
import { useGlobalContext } from '@context'

import './MarketMenuBar.scss'

const MarketMenuBar = ({ marketItems, chosenItem, setChosenItem }) => {
    const { user } = useGlobalContext()
    const filteredItems = marketItems.sort((a, b) => a.level - b.level)

    return (
        <div className='menu-bar'>
            {filteredItems.map((item, i) => (
                <div
                    key={item.name}
                    onClick={() => setChosenItem(marketItems[i])}
                    className={`menu-item ${
                        chosenItem === item ? 'chosen' : ''
                    } ${item.level > user?.level ? 'disabled' : ''}`}
                >
                    <div className='item'>
                        <img src={item.image} alt='item image' />
                        <div className='item-text'>
                            {item.name}
                            <br />
                            Level {item.level}
                        </div>
                    </div>

                    <div className='menu-item-price center'>
                        {item.price} <img src={coinImage} alt='coin' />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MarketMenuBar
