import React, { useEffect, useState } from 'react'

import { ProductTour } from '@components'
import { useGlobalContext } from '@context'

import { CardCollection, DeckBar, Filter, UserPanel } from './components'
import {
    deckOptions,
    rarityOptions,
    valueOptions,
} from './constants/filterOptions'
import './Collection.scss'

// Renders user information, user's card collection with filter options, and deck management capabilities
const Collection = () => {
    const { getCurrentUser, user } = useGlobalContext()
    const stage = user?.onboardingStage ?? {}

    const [deckFilter, setDeckFilter] = useState('')
    const [rarityFilter, setRarityFilter] = useState('')
    const [valueFilter, setValueFilter] = useState('')

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <div className='collection page'>
            {stage === 4 && <ProductTour step={stage} />}

            <UserPanel />
            <DeckBar />
            <div className='header'>
                <h1>Cards</h1>
                <hr />
            </div>
            <div className='filters fill center'>
                <Filter
                    label='Cards Filter'
                    value={deckFilter}
                    setValue={setDeckFilter}
                    options={deckOptions}
                    id='deck-filter'
                />
                <Filter
                    label='Rarity Filter'
                    value={rarityFilter}
                    setValue={setRarityFilter}
                    options={rarityOptions}
                    id='rarity-filter'
                />
                <Filter
                    label='Value Filter'
                    value={valueFilter}
                    setValue={setValueFilter}
                    options={valueOptions}
                    id='value=filter'
                />
            </div>
            <CardCollection
                deckFilter={deckFilter}
                rarityFilter={rarityFilter}
                valueFilter={valueFilter}
            />
        </div>
    )
}

export default Collection
