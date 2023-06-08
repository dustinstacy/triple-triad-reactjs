import React, { useEffect, useState } from 'react'

import { useGlobalContext } from '@context'

import { fetchMarketItems } from './api'
import { Item } from './components'
import './MarketItems.scss'

// Renders the market items section
// chosenItem: State used to track the currently chosen item
// setChosenItem: Function to update the chosen item state based on user selection
const MarketItems = ({ chosenItem, setChosenItem }) => {
    const { user } = useGlobalContext()
    const [marketItems, setMarketItems] = useState([])

    // Fetches and sets market items, and sets the first item as the chosen item
    useEffect(() => {
        const fetchAndSetMarketItems = async () => {
            try {
                const items = await fetchMarketItems()
                setMarketItems(items)
                if (items.length > 0) {
                    setChosenItem(items[0])
                }
            } catch (error) {
                console.error('Error fetching market items:', error)
            }
        }

        if (marketItems.length === 0) {
            fetchAndSetMarketItems()
        }
    }, [marketItems.length, setChosenItem])

    // Sort market items by level
    const filteredItems = marketItems.sort((a, b) => a.level - b.level)

    return (
        <div className='items'>
            {filteredItems.map((item, index) =>
                item.level > user?.level ? (
                    <div key={item.name} className='locked-item center'>
                        <span>Unlocks at</span> level {item.level}
                    </div>
                ) : (
                    <Item
                        key={item.name}
                        item={item}
                        index={index}
                        chosenItem={chosenItem}
                        setChosenItem={setChosenItem}
                        marketItems={marketItems}
                    />
                )
            )}
        </div>
    )
}

export default MarketItems
