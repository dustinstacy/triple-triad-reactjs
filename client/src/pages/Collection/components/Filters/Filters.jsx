import React from 'react'

import './Filters.scss'

const Filters = ({
    deckFilter,
    setDeckFilter,
    rarityFilter,
    setRarityFilter,
    valueFilter,
    setValueFilter,
}) => {
    return (
        <div className='filters'>
            <div className='filter'>
                <label htmlFor='deck-filter'>Cards Filter</label>
                <select
                    id='deck-filter'
                    value={deckFilter}
                    onChange={(e) => setDeckFilter(e.target.value)}
                >
                    <option value='Show All'>Show All</option>
                    <option value='In Deck'>In Deck</option>
                    <option value='Not In Deck'>Not In Deck</option>
                </select>
            </div>

            <div className='filter'>
                <label htmlFor='rarity-filter'>Rarity Filter</label>
                <select
                    id='rarity-filter'
                    value={rarityFilter}
                    onChange={(e) => setRarityFilter(e.target.value)}
                >
                    <option value='-'>-</option>
                    <option value='Common'>Common</option>
                    <option value='Uncommon'>Uncommon</option>
                    <option value='Rare'>Rare</option>
                    <option value='Epic'>Epic</option>
                    <option value='Legendary'>Legendary</option>
                </select>
            </div>

            <div className='filter'>
                <label htmlFor='value-filter'>Value Filter</label>
                <select
                    id='value-filter'
                    value={valueFilter}
                    onChange={(e) => setValueFilter(e.target.value)}
                >
                    <option value='-'>-</option>
                    <option value='Up'>Up</option>
                    <option value='Down'>Down</option>
                    <option value='Left'>Left</option>
                    <option value='Right'>Right</option>
                    <option value='Total'>Total</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
