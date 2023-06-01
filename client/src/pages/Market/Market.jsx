import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useGlobalContext } from '../../context/GlobalContext'
import { Button, ProductTour } from '../../components'
import { coinImage } from '../../assets/icons'

import './Market.scss'

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
                    {item.name}
                    <br />
                    Level {item.level}
                    <div className='menu-item-price center'>
                        {item.price} <img src={coinImage} alt='coin' />
                    </div>
                </div>
            ))}
        </div>
    )
}

const ChosenItem = ({ chosenItem }) => {
    const { user } = useGlobalContext()

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
                <p className='chosen-item-details'>{chosenItem.info}</p>
            </div>
        </div>
    )
}

const QuantitySelector = ({
    quantityOptions,
    chosenQuantity,
    setChosenQuantity,
}) => {
    const handleQuantityChange = (quantity) => {
        setChosenQuantity(quantity)
    }

    return (
        <div className='quantity-selector'>
            <h2>ChOOse Quantity :</h2>
            <div className='quantity-buttons'>
                {quantityOptions?.map((quantity) => (
                    <button
                        key={quantity.amount}
                        onClick={() => handleQuantityChange(quantity)}
                        className={`quantity-button ${
                            chosenQuantity.amount === quantity.amount
                                ? 'chosen'
                                : ''
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

const PurchaseBar = ({ marketItems, chosenItem, chosenQuantity }) => {
    const { user, getCurrentUser } = useGlobalContext()
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
            await axios.put('/api/profile/info', {
                coin: coin - finalPrice,
            })

            await axios.put('/api/profile/inventory', {
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
    const { user } = useGlobalContext()
    const stage = user?.onboardingStage

    const [marketItems, setMarketItems] = useState(null)
    const [chosenItem, setChosenItem] = useState({})
    const [chosenQuantity, setChosenQuantity] = useState({})

    useEffect(() => {
        const getMarketItems = async () => {
            const items = await axios.get('/api/items')
            setMarketItems(items.data)
        }
        getMarketItems()
    }, [])

    useEffect(() => {
        marketItems && setChosenItem(marketItems[0])
    }, [marketItems])

    const quantityOptions = [
        { amount: 1, discount: '0' },
        { amount: 5, discount: '10%' },
        { amount: 10, discount: '15%' },
    ]

    useEffect(() => {
        setChosenQuantity(quantityOptions[0])
    }, [chosenItem])

    return (
        <div className='market page center'>
            {stage === 0 && <ProductTour step={1} />}
            {marketItems && (
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
                            marketItems={marketItems}
                        />
                        <div className='chosen-item-display'>
                            <ChosenItem chosenItem={chosenItem} />
                            <QuantitySelector
                                quantityOptions={quantityOptions}
                                chosenQuantity={chosenQuantity}
                                setChosenQuantity={setChosenQuantity}
                            />
                            <PurchaseBar
                                marketItems={marketItems}
                                chosenItem={chosenItem}
                                chosenQuantity={chosenQuantity}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Market
