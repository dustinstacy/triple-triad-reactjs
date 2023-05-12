import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { Button } from '../../components'
import { marketItems } from '../../constants/marketItems'
import { coinImage } from '../../assets/icons'

import './Market.scss'

const MarketMenuBar = ({ chosenItem, setChosenItem }) => {
    return (
        <div className='menu-bar'>
            {marketItems.map((item, i) => (
                <div
                    key={item.name}
                    onClick={() => setChosenItem(marketItems[i])}
                    className={`menu-item ${
                        chosenItem === item ? 'chosen' : ''
                    }`}
                >
                    {item.name}
                    <div className='menu-item-price center'>
                        {item.price} <img src={coinImage} alt='coin' />
                    </div>
                </div>
            ))}
        </div>
    )
}

const ChosenItem = ({ chosenItem }) => {
    return (
        <div className='chosen-item'>
            <div className='chosen-item-image'>
                <img src={chosenItem.image} alt={chosenItem.name} />
            </div>
            <div className='chosen-item-info'>
                <h1 className='chosen-item-name'>{chosenItem.name}</h1>
                <hr />
                <p className='chosen-item-details'>{chosenItem.details}</p>
            </div>
        </div>
    )
}

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
                        key={quantity.amount}
                        onClick={() => handleQuantityChange(quantity)}
                        className={`quantity-button ${
                            chosenQuantity === quantity ? 'chosen' : ''
                        }`}
                    >
                        {quantity.amount}
                    </button>
                ))}
            </div>

            <div className='discount'>
                {' '}
                {chosenQuantity.discount !== '0' &&
                    chosenQuantity.discount + 'Discount'}
            </div>
        </div>
    )
}

const PurchaseBar = ({ chosenItem, chosenQuantity }) => {
    const calulatePrice = (item, quantity, discount) => {
        let totalPrice = chosenItem.price * chosenQuantity.amount
        if (quantity > 1) {
            totalPrice = totalPrice * ((100 - parseFloat(discount)) / 100)
        }
        return totalPrice
    }

    return (
        <div className='purchase-bar box'>
            <div className='total'>
                Total :
                <div className='amount center'>
                    {calulatePrice(
                        chosenItem,
                        chosenQuantity.amount,
                        chosenQuantity.discount
                    )}
                    <img src={coinImage} alt='coin' />
                </div>
            </div>
            <Button label='Purchase' />
        </div>
    )
}

const Market = () => {
    const { getCurrentUser } = useGlobalContext()
    const [chosenItem, setChosenItem] = useState(marketItems[0])
    const [chosenQuantity, setChosenQuantity] = useState(
        chosenItem.quantities[0]
    )

    useEffect(() => {
        getCurrentUser()
    }, [])

    useEffect(() => {
        setChosenQuantity(chosenItem.quantities[0])
    }, [chosenItem])

    return (
        <div className='market page center'>
            <div className='market-menu box'>
                <div className='market-menu-header'>
                    <h1>MaRKet</h1>
                    <hr />
                </div>

                <div className='market-menu-body'>
                    <MarketMenuBar
                        chosenItem={chosenItem}
                        setChosenItem={setChosenItem}
                        setChosenQuantity={setChosenQuantity}
                    />
                    <div className='chosen-item-display'>
                        <ChosenItem chosenItem={chosenItem} />
                        <QuantitySelector
                            chosenItem={chosenItem}
                            chosenQuantity={chosenQuantity}
                            setChosenQuantity={setChosenQuantity}
                        />
                        <PurchaseBar
                            chosenItem={chosenItem}
                            chosenQuantity={chosenQuantity}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Market
