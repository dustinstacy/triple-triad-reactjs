import React, { useEffect, useState } from 'react'
import { Button, Card, Loader } from '../../components'
import './Discovery.scss'
import { uniqueItemsFilter } from '../../utils/uniqueItemsFilter'
import { useGlobalContext } from '../../context/GlobalContext'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import { assignRandomValues } from '../../utils/assignRandomValues'
import { randomRarity } from '../../utils/randomRarity'
import { removeObjectByValue } from '../../utils/removeObjectByValue'

import axios from 'axios'

const Carousel = ({ items, userInventory, setCurrentDiscovery }) => {
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
        setCurrentDiscovery(current)
    }, [current, setCurrentDiscovery])

    return (
        <div className='carousel'>
            <BiLeftArrow className='arrow' onClick={handlePrevious} />
            {carouselPositions.map(({ position, value }) => (
                <div
                    key={position}
                    className={`carousel-item ${position} ${slideDirection}`}
                >
                    <div className='carousel-item-image'>
                        <img src={value.image} alt={value.name} />
                    </div>
                    <div className='carousel-item-info'>
                        <h1 className='carousel-item-name'>{value.name}</h1>
                        <hr />
                        <p className='carousel-item-details'>
                            {/* Placeholder text until user inventory has all necessary data */}
                            Enter item description here.
                            {value.details}
                        </p>
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

            <BiRightArrow className='arrow' onClick={handleNext} />
        </div>
    )
}

const MadeDiscovery = ({ cards, setMadeDiscovery }) => (
    <div className='discovery-container center'>
        {cards.map((card) => (
            <Card key={card._id} card={card} player='p1' visibility />
        ))}
        <Button label='Go Back' onClick={() => setMadeDiscovery(null)} />
    </div>
)

const Discovery = () => {
    const { allCards, getCurrentUser, user } = useGlobalContext()
    const [currentDiscovery, setCurrentDiscovery] = useState(null)
    const [madeDiscovery, setMadeDiscovery] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        !user && getCurrentUser()
    }, [getCurrentUser, user])

    const userDiscoveries = [
        ...new Set(user?.inventory.filter((item) => item.type === 'discovery')),
    ]
    const uniqueDiscoveries = uniqueItemsFilter(userDiscoveries)

    const openPack = async () => {
        setIsLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 5000))

        const userDiscovery = userDiscoveries.find(
            (discovery) => discovery.name === currentDiscovery.name
        )
        const { contents } = userDiscovery ?? {}
        const newDiscoveries = [...Array(contents.count)]
        getRandomCards(newDiscoveries, contents.chance)
        newDiscoveries.forEach((discovery) => {
            assignRandomValues(discovery)
            axios.post('/api/collection/new', {
                user: user._id,
                number: discovery.number,
                name: discovery.name,
                rarity: discovery.rarity,
                element: discovery.element,
                image: discovery.image,
                values: discovery.values,
            })
        })
        setMadeDiscovery(newDiscoveries)

        removeObjectByValue(user.inventory, currentDiscovery.name)
        axios.put('api/profile/inventory', {
            inventory: user.inventory,
        })

        setIsLoading(false)
    }

    const getRandomCards = (array, chance) => {
        array.forEach((_, i) => {
            const rarity = randomRarity(chance)
            const currentRarityCards = allCards.filter(
                (card) => card.rarity === rarity
            )
            const randomCard =
                currentRarityCards[
                    Math.floor(Math.random() * currentRarityCards.length)
                ]
            array.splice(i, 1, randomCard)
        })
    }

    return (
        <div className='discovery page center'>
            {madeDiscovery && !isLoading ? (
                <MadeDiscovery
                    cards={madeDiscovery}
                    setMadeDiscovery={setMadeDiscovery}
                />
            ) : isLoading ? (
                <div className='loader-container'>
                    <Loader />
                </div>
            ) : (
                <div className='panel center'>
                    <div className='panel-header'>
                        <h1>ChOOse a DiScovery Kit</h1>
                        <hr />
                    </div>
                    <div className='user-discoveries center'>
                        {uniqueDiscoveries.length ? (
                            <div className='available-discoveries'>
                                <Carousel
                                    items={uniqueDiscoveries}
                                    userInventory={userDiscoveries}
                                    setCurrentDiscovery={setCurrentDiscovery}
                                />
                                <div className='panel-footer center'>
                                    <Button
                                        label='Make DiScoVery'
                                        onClick={() => openPack()}
                                    />
                                </div>
                            </div>
                        ) : (
                            <h2>
                                Head to the Market to purchase more diScoveries
                            </h2>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Discovery
