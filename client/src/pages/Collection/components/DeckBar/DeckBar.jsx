import React from 'react'

import { Button } from '@components'

import './DeckBar.scss'

const DeckBar = ({
    userCards,
    userDeck,
    getCurrentUser,
    markSelected,
    removeSelection,
}) => {
    const autoBuild = async () => {
        const emptySlots = 35 - userDeck.length
        const totalValueArray = userCards
            .filter((card) => !userDeck.find(({ _id }) => card._id === _id))
            .sort(
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
        for (let i = 0; i < emptySlots; i++) {
            markSelected(totalValueArray[i])
        }
        getCurrentUser()
    }

    const unSelectAll = () => {
        userDeck.forEach((deckCard) => {
            removeSelection(deckCard)
        })
        getCurrentUser()
    }

    return (
        <div className='deck center'>
            <div className='counter'>
                <p>Cards in Deck</p>
                <p>
                    <span
                        className={userDeck?.length < 15 ? 'invalid' : 'valid'}
                    >
                        {userDeck.length}
                    </span>
                    / 35
                </p>
            </div>
            <div className='strength'>
                <p>Power</p>
                {userDeck.reduce(
                    (total, card) =>
                        total +
                        card.values.reduce(
                            (sum, current) => parseInt(sum) + parseInt(current),
                            0
                        ),
                    0
                )}
            </div>

            <div className='section'>
                <Button onClick={autoBuild} label='FIll Deck' />
                <Button onClick={unSelectAll} label='Clear Deck' />
            </div>
        </div>
    )
}
export default DeckBar
