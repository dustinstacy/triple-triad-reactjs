import React, { useMemo } from 'react'

import { Card } from '@components'

import { CheckBox } from '..'
import './CardCollection.scss'

const CardCollection = ({
    user,
    userCards,
    userDeck,
    deckFilter,
    rarityFilter,
    valueFilter,
    valuesArray,
    markSelected,
    removeSelection,
}) => {
    const filteredCards = useMemo(() => {
        userCards.forEach((card) => {
            card.color = user.color
        })

        let filtered = [...userCards].sort((a, b) => a.number - b.number)

        if (deckFilter === 'In Deck') {
            filtered = userCards.filter((card) =>
                userDeck.find(({ _id }) => card._id === _id)
            )
        } else if (deckFilter === 'Not In Deck') {
            filtered = userCards.filter(
                (card) => !userDeck.find(({ _id }) => card._id === _id)
            )
        }

        if (rarityFilter && rarityFilter !== '-') {
            filtered = filtered.filter((card) => card.rarity === rarityFilter)
        }

        if (valueFilter == 'Total') {
            filtered = filtered.sort(
                (a, b) =>
                    b.values.reduce(
                        (sum, current) =>
                            parseInt(sum) + parseInt(current.replace(/A/g, 10)),
                        0
                    ) -
                    a.values.reduce(
                        (sum, current) =>
                            parseInt(sum) + parseInt(current.replace(/A/g, 10)),
                        0
                    )
            )
        } else if (valueFilter && valueFilter !== '-') {
            const valueIndex = valuesArray.indexOf(valueFilter)
            filtered = filtered.sort((a, b) => {
                const aValue = a.values[valueIndex]
                const bValue = b.values[valueIndex]
                return (
                    parseInt(bValue.replace(/A/g, 10)) -
                    parseInt(aValue.replace(/A/g, 10))
                )
            })
        }

        return filtered
    }, [userCards, deckFilter, rarityFilter, valueFilter, userDeck])

    return (
        <div className='card-collection'>
            <div className='card-list'>
                {filteredCards?.map((card) => (
                    <div key={card._id} className='card-container'>
                        <Card card={card} faith='p1' isShowing />
                        <CheckBox
                            handleClick={() =>
                                !card.selected
                                    ? markSelected(card)
                                    : removeSelection(card)
                            }
                            selected={card.selected}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardCollection
