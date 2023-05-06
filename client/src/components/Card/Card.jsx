import React from 'react'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import { cardback } from '../../assets/card'
import './Card.scss'

const Card = ({ card, player, turn, handleClick, visibility, page }) => {
    const { _id, power, image, values, selected } = card

    return (
        <div
            className={`card ${player === 'p1' ? 'blue' : 'red'} ${
                !turn ? 'not__user' : ''
            } ${power} ${!visibility && 'transparent'}`}
            id={_id}
            onClick={(e) => handleClick(e)}
            owner={player}
        >
            <img
                className='card__image'
                src={visibility ? image : cardback}
                alt={_id}
            />
            {page !== 'collection' && visibility && (
                <div className='card__values'>
                    <span className='up'>{values[0]}</span>
                    <span className='right'>{values[1]}</span>
                    <span className='down'>{values[2]}</span>
                    <span className='left'>{values[3]}</span>
                </div>
            )}
            {page === 'collection' && (
                <div className='checkbox'>
                    {selected ? (
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
