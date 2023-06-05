import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { ProductTour } from '@components'
import { useGlobalContext } from '@context'

import { CardCollection, DeckBar, Filters, UserPanel } from './components'
import './Collection.scss'

const Collection = () => {
    const { getCurrentUser, user, userCards, userDeck } = useGlobalContext()
    const stage = user?.onboardingStage
    const [deckFilter, setDeckFilter] = useState('')
    const [rarityFilter, setRarityFilter] = useState('')
    const [valueFilter, setValueFilter] = useState('')
    const valuesArray = ['Up', 'Right', 'Down', 'Left', 'Total']
    let errorDisplayed = false

    useEffect(() => {
        getCurrentUser()
    }, [])

    const markSelected = async (card) => {
        if (userDeck.length < 35 && userDeck.length < userCards.length + 1) {
            await axios.put(`/api/collection/${card._id}/select`)
            const cardData = {
                _id: card._id,
                image: card.image,
                empower: card.empower,
                weaken: card.weaken,
                values: card.values,
            }
            await axios.put(`/api/deck/add`, cardData)
            getCurrentUser()
        } else {
            if (!errorDisplayed) {
                errorDisplayed = true
                alert('Your deck is currently full')
            }
        }
    }

    const removeSelection = async (card) => {
        await axios.put(`/api/collection/${card._id}/unselect`)
        await axios.put(`/api/deck/${card._id}/remove`)
        getCurrentUser()
    }

    return (
        <div className='collection page'>
            {stage === 2 && <ProductTour step={4} />}

            <UserPanel user={user} userCards={userCards ?? []} />
            <DeckBar
                user={user}
                userCards={userCards}
                userDeck={userDeck}
                getCurrentUser={getCurrentUser}
                markSelected={markSelected}
                removeSelection={removeSelection}
            />
            <div className='header'>
                <h1>Cards</h1>
                <hr />
            </div>
            <Filters
                deckFilter={deckFilter}
                rarityFilter={rarityFilter}
                valueFilter={valueFilter}
                setDeckFilter={setDeckFilter}
                setRarityFilter={setRarityFilter}
                setValueFilter={setValueFilter}
            />
            <CardCollection
                user={user}
                userCards={userCards ?? []}
                userDeck={userDeck ?? []}
                deckFilter={deckFilter}
                rarityFilter={rarityFilter}
                valueFilter={valueFilter}
                valuesArray={valuesArray}
                markSelected={markSelected}
                removeSelection={removeSelection}
            />
        </div>
    )
}

export default Collection
