import React from 'react'
import axios from 'axios'

import { coinImage } from '@assets'
import { Button } from '@components'
import { useGlobalContext } from '@context'

import './PurchaseBar.scss'

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

export default PurchaseBar
