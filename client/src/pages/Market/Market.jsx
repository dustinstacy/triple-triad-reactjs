import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { coinImage } from '@assets'
import { useGlobalContext } from '@context'
import { ProductTour } from '@components'

import {
    ChosenItem,
    MarketMenuBar,
    PurchaseBar,
    QuantitySelector,
} from './components'
import './Market.scss'

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
