import React, { useEffect, useState } from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import { ThreeCircles } from 'react-loader-spinner'
import axios from 'axios'

import { coinImage } from '@assets'
import { Button } from '@components'
import { useGlobalContext } from '@context'

import './PurchaseBar.scss'

const PurchaseBar = ({ marketItems, chosenItem, chosenQuantity }) => {
    const { user, getCurrentUser } = useGlobalContext()
    const { inventory, coin } = user ?? {}

    const [loading, setLoading] = useState(false)
    const [purchaseComplete, setPurchaseComplete] = useState(false)

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
            setLoading(true)
            await axios.put('/api/profile/info', {
                coin: coin - finalPrice,
            })

            await axios.put('/api/profile/inventory', {
                inventory: [...inventory, ...finalPurchase],
            })
            getCurrentUser()
            setTimeout(() => {
                setLoading(false)
                setPurchaseComplete(true)
            }, 1500)
        } catch (error) {
            console.error('Error completing purchase:', error)
        }
    }

    useEffect(() => {
        if (purchaseComplete === true) {
            setTimeout(() => {
                setPurchaseComplete(false)
            }, 1500)
        }
    }, [purchaseComplete])

    return (
        <div className='purchase-bar box'>
            {purchaseComplete ? (
                <h1>PURCHASE COMPLETE</h1>
            ) : (
                <>
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
                        label={
                            loading ? (
                                <ThreeCircles
                                    color='#6eddff'
                                    wrapperClass='purchase-loader'
                                    visible={loading}
                                />
                            ) : (
                                'Purchase'
                            )
                        }
                        disabled={!canPurchase}
                        onClick={completePurchase}
                    />
                </>
            )}
        </div>
    )
}

export default PurchaseBar
