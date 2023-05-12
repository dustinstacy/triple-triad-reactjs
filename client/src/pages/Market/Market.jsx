import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { marketItems } from '../../constants/marketItems'
import { coinImage } from '../../assets/icons'

import './Market.scss'

const Market = () => {
    const { getCurrentUser } = useGlobalContext()
    const [chosenItem, setChosenItem] = useState(marketItems[0])

    useEffect(() => {
        getCurrentUser()
        console.log(chosenItem)
    }, [])
    return (
        <div className='market page center'>
            <div className='market-menu box'>
                <div className='menu-header'>
                    <h1>MaRKet</h1>
                    <hr />
                </div>
                <div className='menu-body'>
                    <div className='menu-items'>
                        {marketItems.map((item) => (
                            <div
                                key={'menu-' + item.name}
                                className='menu-item'
                            >
                                {item.name}
                                <div className='menu-item-price center'>
                                    {item.price}{' '}
                                    <img src={coinImage} alt='coin' />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='chosen-item'>
                        <div className='chosen-item-top'>
                            <div className='chosen-item-image'>
                                <img
                                    src={chosenItem.image}
                                    alt={chosenItem.name}
                                />
                            </div>
                            <div className='chosen-item-info'>
                                <h1 className='chosen-item-name'>
                                    {chosenItem.name}
                                </h1>
                                <hr />
                                <p className='chosen-item-details'>
                                    {chosenItem.details}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Market
