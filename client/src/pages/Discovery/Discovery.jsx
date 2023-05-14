import React, { useEffect, useState } from 'react'
import { Button } from '../../components'
import './Discovery.scss'
import { uniqueItemsFilter } from '../../utils/uniqueItemsFilter'
import { useGlobalContext } from '../../context/GlobalContext'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'

const Carousel = ({ items, userInventory }) => {
    const [currentItemIndex, setCurrentItemIndex] = useState(0)
    const [slideDirection, setslideDirection] = useState('')

    const handlePrevious = () => {
        setslideDirection('left')
        setTimeout(() => {
            setCurrentItemIndex((index) =>
                index === 0 ? items.length - 1 : index - 1
            )
            setslideDirection('')
        }, 500)
    }

    const handleNext = () => {
        setslideDirection('right')
        setTimeout(() => {
            setCurrentItemIndex((index) =>
                index === items.length - 1 ? 0 : index + 1
            )
            setslideDirection('')
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

    return (
        <div className='carousel'>
            <BiLeftArrow className='arrow' onClick={handlePrevious} />
            {carouselPositions.map((position) => (
                <div
                    key={position.position}
                    className={`carousel-item ${position.position} ${slideDirection}`}
                >
                    <div className='carousel-item-image'>
                        <img
                            src={position.value.image}
                            alt={position.value.name}
                        />
                    </div>
                    <div className='carousel-item-info'>
                        <h1 className='carousel-item-name'>
                            {position.value.name}
                        </h1>
                        <hr />
                        <p className='carousel-item-details'>
                            {/* Placeholder text until user inventory has all necessary data */}
                            Enter item description here.
                            {position.value.details}
                        </p>
                        <div className='available-inventory'>
                            <span>Available: &nbsp;</span>
                            {
                                userInventory.filter(
                                    (item) => item.name === position.value.name
                                ).length
                            }
                        </div>
                    </div>
                </div>
            ))}

            <BiRightArrow className='arrow' onClick={handleNext} />
        </div>
    )
}

const Discovery = () => {
    const { getCurrentUser, user } = useGlobalContext()

    useEffect(() => {
        getCurrentUser()
    }, [])

    const userDiscoveries = [
        ...new Set(user?.inventory.filter((item) => item.type === 'discovery')),
    ]
    const uniqueDiscoveries = uniqueItemsFilter(userDiscoveries)

    return (
        <div className='discovery page center'>
            <div className='panel center'>
                <div className='panel-header'>
                    <h1>ChOOse a DiScovery Kit</h1>
                    <hr />
                </div>
                <div className='user-discoveries center'>
                    {uniqueDiscoveries.length && (
                        <Carousel
                            items={uniqueDiscoveries}
                            userInventory={userDiscoveries}
                        />
                    )}
                </div>
                <div className='panel-footer center'>
                    <Button label='Make DiScoVery' />
                </div>
            </div>
        </div>
    )
}

export default Discovery
