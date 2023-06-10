import React from 'react'
import { cardback } from '@assets'
import './Card.scss'

const Card = ({ card, handleClick, isShowing, isSelected }) => {
    const { color, _id, image, values } = card || {}

    const defaultColor =
        'radial-gradient(circle, rgba(247,208,5,1) 0%, rgba(69,121,90,1) 31%, rgba(166,168,44,1) 39%, rgba(3,89,121,1) 93%)'

    return (
        <div
            className={`card ${isShowing ? 'flipped' : ''} ${
                isSelected ? 'selected' : ''
            }`}
            id={_id}
            onClick={(e) => handleClick(e)}
        >
            <div
                className='card__side card__front'
                style={{ background: color || defaultColor }}
            >
                <img className='card__image' src={image} alt={_id} />
                <div className='card__values'>
                    <span className='up'>{values[0]}</span>
                    <span className='right'>{values[1]}</span>
                    <span className='down'>{values[2]}</span>
                    <span className='left'>{values[3]}</span>
                </div>
            </div>
            <div className='card__side card__back'>
                <img className='card__image' src={cardback} alt={_id} />
            </div>
        </div>
    )
}

export default Card
