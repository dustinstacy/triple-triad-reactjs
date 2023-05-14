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
        setslideDirection('previous')
        setTimeout(() => {
            setCurrentItemIndex((index) =>
                index === 0 ? items.length - 1 : index - 1
            )
            setslideDirection('')
        }, 300)
    }

    const handleNext = () => {
        setslideDirection('next')
        setTimeout(() => {
            setCurrentItemIndex((index) =>
                index === items.length - 1 ? 0 : index + 1
            )
            setslideDirection('')
        }, 300)
    }

    const currentItem = items[currentItemIndex]
    const previousItem =
        items[(currentItemIndex + items.length - 1) % items.length]
    const nextItem = items[(currentItemIndex + 1) % items.length]

    return (
        <div className='carousel'>
            <BiLeftArrow className='arrow' onClick={handlePrevious} />
            <div className={`carousel-item previous ${slideDirection}`}>
                <img src={previousItem.image} alt='' />
            </div>
            <div className={`carousel-item current ${slideDirection}`}>
                <img src={currentItem.image} alt={currentItem.name} />
                <h3>{currentItem.name}</h3>
            </div>
            <div className={`carousel-item next ${slideDirection}`}>
                <img src={nextItem.image} alt='' />
            </div>
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
