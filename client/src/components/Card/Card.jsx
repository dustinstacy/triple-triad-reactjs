import React from 'react'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import { cardback } from '../../assets/card'
import './Card.scss'

const Card = ({ card, player, turn, handleClick, visibility, selector }) => {
    const { _id, power, image, values, selected } = card

    return (
        <div
            className={`card ${player === 'p1' ? 'blue' : 'red'} ${
                !turn ? 'not__user' : ''
            } ${power} ${!visibility && 'transparent'}`}
            id={_id}
            owner={player}
        >
            <img
                className='card__image'
                src={visibility ? image : cardback}
                alt={_id}
            />

            <div className='card__values'>
                <span className='up'>{values[0]}</span>
                <span className='right'>{values[1]}</span>
                <span className='down'>{values[2]}</span>
                <span className='left'>{values[3]}</span>
            </div>

            {selector && (
                <div className='checkbox' onClick={(e) => handleClick(e)}>
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
