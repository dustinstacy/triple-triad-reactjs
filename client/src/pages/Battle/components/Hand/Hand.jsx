import React, { useState } from 'react'
import { BiArrowFromBottom, BiArrowFromTop } from 'react-icons/bi'
import { Card } from '../../../../components'

import './Hand.scss'

const Hand = ({ player, battleState, cardSelected, setCardSelected }) => {
    const { hand, name } = player
    const [cardsRaised, setCardsRaised] = useState(false)

    const selectCard = (card) => {
        if (card === cardSelected) {
            setCardSelected(null)
        } else {
            setCardSelected(card)
        }
    }

    return (
        <div
            className={`${name === 'p1' ? 'p1 hand' : 'p2 hand'} ${
                cardsRaised ? 'raised' : ''
            }`}
        >
            {name === 'p1' &&
                (cardsRaised ? (
                    <BiArrowFromTop
                        className='down-arrow'
                        onClick={() => setCardsRaised((current) => !current)}
                    />
                ) : (
                    <BiArrowFromBottom
                        className='up-arrow'
                        onClick={() => setCardsRaised((current) => !current)}
                    />
                ))}
            {hand?.map((card, index) => (
                <Card
                    key={card?._id + index}
                    card={card}
                    isShowing={name == 'p1' ?? false}
                    isSelected={cardSelected?._id === card?._id}
                    handleClick={
                        battleState.isP1Turn ? () => selectCard(card) : ''
                    }
                />
            ))}
        </div>
    )
}

export default Hand
