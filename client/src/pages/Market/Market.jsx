import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../../context/GlobalContext'
import { Button } from '../../components'
import { marketItems } from '../../constants/marketItems'
import { coinImage } from '../../assets/icons'

import './Market.scss'
import ProductTour from '../../components/ProductTour/ProductTour'

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

const ChosenItem = ({ chosenItem, user }) => {
    return (
        <div className='chosen-item'>
            <div className='chosen-item-image'>
                <img src={chosenItem.image} alt={chosenItem.name} />
                <div className='owned-inventory'>
                    <span>Owned: &nbsp;</span>
                    {
                        user?.inventory.filter(
                            (item) => item.name === chosenItem.name
                        ).length
                    }
                </div>
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
                {chosenQuantity.discount !== '0' &&
                    chosenQuantity.discount + ' Discount'}
            </div>
        </div>
    )
}

const PurchaseBar = ({ chosenItem, chosenQuantity, user, getCurrentUser }) => {
    const { inventory, coin } = user ?? {}

    const calculatePrice = (item, quantity, discount) => {
        let totalPrice = item.price * quantity
        if (quantity > 1) {
            totalPrice *= (100 - parseFloat(discount)) / 100
        }
        return totalPrice
    }

    const finalPrice = calculatePrice(
        chosenItem,
        chosenQuantity.amount,
        chosenQuantity.discount
    )

    const purchasedItem = marketItems[marketItems.indexOf(chosenItem)]

    const finalPurchase = Array.from(
        { length: chosenQuantity.amount },
        () => purchasedItem
    )

    const canPurchase = finalPrice <= (coin || 0)

    const completePurchase = async () => {
        try {
            await axios.put('/api/profile', {
                coin: coin - finalPrice,
            })

            await axios.put('api/profile/inventory', {
                inventory: [...inventory, ...finalPurchase],
            })
            getCurrentUser()
        } catch (error) {
            console.error('Error completing purchase:', error)
        }
    }

    return (
        <div className='purchase-bar box'>
            <div className='total'>
                Total :
                <div className='amount center'>
                    {chosenQuantity.discount !== '0' && (
                        <span className='previous-amount'>
                            {chosenItem.price * chosenQuantity.amount}
                        </span>
                    )}
                    {finalPrice}
                    <img src={coinImage} alt='coin' />
                </div>
            </div>
            <Button
                label='Purchase'
                disabled={!canPurchase}
                onClick={completePurchase}
            />
        </div>
    )
}

const Market = () => {
    const { getCurrentUser, user } = useGlobalContext()
    const stage = user?.onboardingStage
    const [chosenItem, setChosenItem] = useState(marketItems[0])
    const [chosenQuantity, setChosenQuantity] = useState(
        chosenItem.quantities[0]
    )

    useEffect(() => {
        setChosenQuantity(chosenItem.quantities[0])
    }, [chosenItem])

    return (
        <div className='market page center'>
            {stage === 0 && <ProductTour step={1} />}
            <div className='market-menu'>
                <div className='market-menu-header'>
                    <h1>MaRKet</h1>
                    <hr />
                    <p className='coin center'>
                        {user?.coin} <img src={coinImage} alt='coin' />
                    </p>
                </div>

                <div className='market-menu-body'>
                    <MarketMenuBar
                        chosenItem={chosenItem}
                        setChosenItem={setChosenItem}
                    />
                    <div className='chosen-item-display'>
                        <ChosenItem chosenItem={chosenItem} user={user} />
                        <QuantitySelector
                            chosenItem={chosenItem}
                            chosenQuantity={chosenQuantity}
                            setChosenQuantity={setChosenQuantity}
                        />
                        <PurchaseBar
                            chosenItem={chosenItem}
                            chosenQuantity={chosenQuantity}
                            user={user}
                            getCurrentUser={getCurrentUser}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Market
