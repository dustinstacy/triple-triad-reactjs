import React from 'react'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import { cardback } from '../../assets/card'
import './Card.scss'

const Card = ({ card, player, turn, handleClick, visibility, page }) => {
    return (
        <div
            className={`card ${player === 'p1' ? 'blue' : 'red'} ${
                !turn ? 'not__user' : ''
            } ${card.power} ${!visibility && 'transparent'}`}
            id={card._id}
            onClick={(e) => handleClick(e)}
            owner={player}
        >
            <img
                className='card__image'
                src={visibility ? card.image : cardback}
                alt={card._id}
            />
            {page !== 'collection' && visibility && (
                <div className='card__values'>
                    <span className='up'>{card.values[0]}</span>
                    <span className='right'>{card.values[1]}</span>
                    <span className='down'>{card.values[2]}</span>
                    <span className='left'>{card.values[3]}</span>
                </div>
            )}
            {page === 'collection' && (
                <div className='checkbox'>
                    {card.selected ? (
                        <ImCheckboxChecked className='check' />
                    ) : (
                        <ImCheckboxUnchecked className='uncheck' />
                    )}
                </div>
            )}
        </div>
    )
}

export default Card
