import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useGlobalContext } from '@context'
import { Button } from '@components'

import './OpponentMenu.scss'

const OpponentMenu = ({ selectedOpponent, selectedOpponentDeck }) => {
    const { getCurrentUser, userCards, userDeck } = useGlobalContext()
    const navigate = useNavigate()
    let errorDisplayed = false

    const unSelectedCards = userCards.filter(
        (card) => !userDeck.find(({ _id }) => card._id === _id)
    )

    const userDeckPower = userDeck.reduce(
        (total, card) =>
            total +
            card.values.reduce(
                (sum, current) => parseInt(sum) + parseInt(current),
                0
            ),
        0
    )

    const markSelected = async (card) => {
        if (
            userDeck.length < selectedOpponent.minDeckSize &&
            unSelectedCards.length
        ) {
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

    const autoBuild = async () => {
        const emptySlots = selectedOpponent.minDeckSize - userDeck.length
        const totalValueArray = userCards
            .filter((card) => !userDeck.find(({ _id }) => card._id === _id))
            .sort(
                (a, b) =>
                    b.values.reduce((sum, current) => sum + current, 0) -
                    a.values.reduce((sum, current) => sum + current, 0)
            )
        for (let i = 0; i < emptySlots; i++) {
            markSelected(totalValueArray[i])
        }
        getCurrentUser()
    }

    const startBattle = () => {
        navigate('/battle', {
            state: {
                opponent: selectedOpponent,
                opponentDeck: selectedOpponentDeck,
            },
        })
    }

    return (
        <div className='opponent-menu box'>
            Your Deck:
            <div className='user-deck__power'>
                <p>Relative Power</p>
                <span>
                    {userDeck.length >= selectedOpponent.minDeckSize
                        ? Math.floor(
                              (userDeckPower / userDeck.length) *
                                  selectedOpponent.minDeckSize
                          )
                        : '-'}
                </span>
            </div>
            <div className='user-deck__size'>
                <p>Size</p>
                <span>{userDeck?.length}</span>
            </div>
            <Button
                onClick={autoBuild}
                label='FIll Deck'
                disabled={
                    userDeck?.length === 35 || unSelectedCards?.length === 0
                }
            />
            <Button
                label='Start Battle'
                onClick={() => startBattle()}
                disabled={userDeck?.length < selectedOpponent.minDeckSize}
            />
        </div>
    )
}

export default OpponentMenu
