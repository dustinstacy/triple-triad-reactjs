import React, { useRef } from 'react'

import { cardback } from '@assets'
import { classSet } from '@utils'

import './Card.scss'

const Card = ({
    card,
    handleClick,
    isDragged,
    isDraggable,
    isShowing,
    isSelected,
    setCardDragged,
}) => {
    const { captured, color, _id, image, values } = card || {}

    const defaultColor = `radial-gradient(circle, rgba(247,208,5,1) 0%,
        rgba(69,121,90,1) 31%, rgba(166,168,44,1) 39%,
        rgba(3,89,121,1) 93%)`

    const cardClasses = classSet(
        'card',
        captured && 'captured',
        isShowing && 'is-showing',
        isSelected && 'is-selected',
        isDragged && 'is-dragged'
    )

    const dragImageRef = useRef(null)

    const handleDragStart = (e, card) => {
        const dragImage = dragImageRef.current
        setCardDragged(card)

        // Position the drag image at the center of the mouse cursor
        const offsetX = e.clientX - e.target.getBoundingClientRect().left
        const offsetY = e.clientY - e.target.getBoundingClientRect().top
        e.dataTransfer.setDragImage(dragImage, offsetX, offsetY)
    }

    const handleDragEnd = (e) => {
        setCardDragged(null)
    }

    return (
        <div
            className={cardClasses}
            id={_id}
            draggable={isDraggable}
            onClick={(e) => handleClick(e, card)}
            onDragStart={(e) => handleDragStart(e, card)}
            onDragEnd={(e) => handleDragEnd(e)}
        >
            <div
                className='card__side card__front'
                style={{ background: color || defaultColor }}
                ref={dragImageRef}
            >
                <img className='card__image fill' src={image} alt={_id} />
                <div className='card__values'>
                    <span className='up center'>{values[0]}</span>
                    <span className='right center'>{values[1]}</span>
                    <span className='down center'>{values[2]}</span>
                    <span className='left center'>{values[3]}</span>
                </div>
            </div>
            <div className='card__side card__back'>
                <img className='card__image' src={cardback} alt={_id} />
            </div>
        </div>
    )
}

export default Card
