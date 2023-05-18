import React from 'react'
import { cardback } from '../../assets/card'
import './Card.scss'

const Card = ({ card, handleClick, isShowing, isSelected }) => {
    const { _id, image, user, values } = card

    return (
        <div
            className={`card ${isShowing ? 'flipped' : ''} ${
                isSelected ? 'selected' : ''
            }`}
            id={_id}
            owner={user}
            faith={user === 'cpu' ? 'cpu' : 'p1'}
            onClick={(e) => handleClick(e)}
        >
            <div
                className={`card__side card__front ${
                    user === 'cpu' ? 'red' : 'blue'
                }`}
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
