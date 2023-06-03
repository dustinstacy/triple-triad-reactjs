import React, { useEffect, useState } from 'react'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'

import './Carousel.scss'

const Carousel = ({ items, userInventory, setCurrentPack }) => {
    const [currentItemIndex, setCurrentItemIndex] = useState(0)
    const [slideDirection, setSlideDirection] = useState('')

    const handlePrevious = () => {
        setSlideDirection('left')
        setTimeout(() => {
            setCurrentItemIndex((index) =>
                index === 0 ? items.length - 1 : index - 1
            )
            setSlideDirection('')
        }, 500)
    }

    const handleNext = () => {
        setSlideDirection('right')
        setTimeout(() => {
            setCurrentItemIndex((index) =>
                index === items.length - 1 ? 0 : index + 1
            )
            setSlideDirection('')
        }, 500)
    }

    const current = items[currentItemIndex]
    const previous = items[(currentItemIndex + items.length - 1) % items.length]
    const next = items[(currentItemIndex + 1) % items.length]

    const carouselPositions = [
        { position: 'previous', value: previous },
        { position: 'current', value: current },
        { position: 'next', value: next },
    ]

    useEffect(() => {
        setCurrentPack(current)
    }, [current, setCurrentPack])

    return (
        <div className='carousel'>
            <BiLeftArrow className='arrow-previous' onClick={handleNext} />
            {carouselPositions.map(({ position, value }) => (
                <div
                    key={position}
                    className={`carousel-item ${position} ${slideDirection}`}
                >
                    <div className='carousel-item-image'>
                        <img src={value.image} alt={value.name} />
                    </div>
                    <div className='carousel-item-info'>
                        <h1 className='carousel-item-name'>
                            {value.name}
                            <span>LVL &nbsp; {value.level}</span>
                        </h1>
                        <hr />
                        <p className='carousel-item-details'>{value.info}</p>
                        <div className='available-inventory'>
                            <span>Available: &nbsp;</span>
                            {
                                userInventory.filter(
                                    (item) => item.name === value.name
                                ).length
                            }
                        </div>
                    </div>
                </div>
            ))}

            <BiRightArrow className='arrow-next' onClick={handlePrevious} />
        </div>
    )
}

export default Carousel
