import React from 'react'
import { cardback } from '../../assets/card'
import './Card.scss'

const Card = ({ card, owner, faith, handleClick, isShowing }) => {
    const { _id, power, image, values, selected } = card

    return (
        <div
            className={`card ${faith === 'p1' ? 'blue' : 'red'} ${
                !isShowing && 'transparent'
            }`}
            id={_id}
            owner={owner}
            onClick={(e) => handleClick(e)}
        >
            <img
                className='card__image'
                src={isShowing ? image : cardback}
                alt={_id}
            />

            {isShowing && (
                <div className='card__values'>
                    <span className='up'>{values[0]}</span>
                    <span className='right'>{values[1]}</span>
                    <span className='down'>{values[2]}</span>
                    <span className='left'>{values[3]}</span>
                </div>
            )}
        </div>
    )
}

export default Card
