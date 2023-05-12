import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { Button } from '../../components'
import { marketItems } from '../../constants/marketItems'
import { coinImage } from '../../assets/icons'

import './Market.scss'

const QuantitySelector = ({
    chosenItem,
    chosenQuantity,
    setChosenQuantity,
}) => {
    const handleQuantityChange = (quantity) => {
        setChosenQuantity(quantity)
    }

    const quantityOptions = chosenItem.quantities

    return (
        <div className='quantity-selector'>
            <h2>ChOOse Quantity :</h2>
            <div className='quantity-buttons'>
                {quantityOptions.map((quantity) => (
                    <button
                        key={quantity}
                        onClick={() => handleQuantityChange(quantity)}
                        className={`quantity-button ${
                            chosenQuantity === quantity ? 'chosen' : ''
                        }`}
                    >
                        {quantity}
                    </button>
                ))}
            </div>
        </div>
    )
}

const Market = () => {
    const { getCurrentUser } = useGlobalContext()
    const [chosenItem, setChosenItem] = useState(marketItems[0])
    const [chosenQuantity, setChosenQuantity] = useState(1)

    useEffect(() => {
        getCurrentUser()
    }, [])

    useEffect(() => {
        console.log(chosenItem)
    }, [chosenItem])

    return (
        <div className='market page center'>
            <div className='market-menu box'>
                <div className='menu-header'>
                    <h1>MaRKet</h1>
                    <hr />
                </div>
                <div className='menu-body'>
                    <div className='menu-items'>
                        {marketItems.map((item, i) => (
                            <div
                                key={'menu-' + item.name}
                                className='menu-item'
                                onClick={() => setChosenItem(marketItems[i])}
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
                        <QuantitySelector
                            chosenItem={chosenItem}
                            chosenQuantity={chosenQuantity}
                            setChosenQuantity={setChosenQuantity}
                        />
                        <div className='purchase-bar box'>
                            <div className='total'>
                                Total :
                                <div className='amount center'>
                                    {chosenItem.price}
                                    <img src={coinImage} alt='coin' />
                                </div>
                            </div>
                            <Button label='Purchase' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Market
