import React, { useEffect, useState } from 'react'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import { useGlobalContext } from '../../context/GlobalContext'
import { Button, Card, Loader } from '../../components'
import { uniqueItemsFilter } from '../../utils/uniqueItemsFilter'
import { assignRandomValues, randomRarity } from '../../utils/randomizers'
import { removeObjectByValue } from '../../utils/removeObjectByValue'
import './OpenPacks.scss'

import axios from 'axios'

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

            <BiRightArrow className='arrow-next' onClick={handlePrevious} />
        </div>
    )
}

const PackContents = ({ cards, setPackContents }) => (
    <div className='packs-container center'>
        {cards.map((card) => (
            <Card key={card._id} card={card} faith='p1' isShowing />
        ))}
        <Button label='Go Back' onClick={() => setPackContents(null)} />
    </div>
)

const Packs = () => {
    const { allCards, user } = useGlobalContext()
    const [currentPack, setCurrentPack] = useState(null)
    const [packContents, setPackContents] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const userPacks = [
        ...new Set(user?.inventory.filter((item) => item.type === 'pack')),
    ]
    const uniquePacks = uniqueItemsFilter(userPacks)

    const openPack = async () => {
        setIsLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 5000))

        const chosenPack = userPacks.find(
            (pack) => pack.name === currentPack.name
        )
        const { contents } = chosenPack ?? {}
        const newPacks = [...Array(contents.count)]
        getRandomCards(newPacks, contents.chance)
        newPacks.forEach((card) => {
            assignRandomValues(card)
            axios.post('/api/collection/new', {
                user: user._id,
                number: card.number,
                name: card.name,
                rarity: card.rarity,
                element: card.element,
                image: card.image,
                values: card.values,
            })
        })
        setPackContents(newPacks)

        removeObjectByValue(user.inventory, currentPack.name)
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
        <div className='packs page center'>
            {packContents && !isLoading ? (
                <PackContents
                    cards={packContents}
                    setPackContents={setPackContents}
                />
            ) : isLoading ? (
                <div className='loader-container'>
                    <Loader />
                </div>
            ) : (
                <div className='panel center'>
                    <div className='panel-header'>
                        <h1>ChOOse a PacK</h1>
                        <hr />
                    </div>
                    <div className='user-packs center'>
                        {uniquePacks.length ? (
                            <div className='available-packs'>
                                <Carousel
                                    items={uniquePacks}
                                    userInventory={userPacks}
                                    setCurrentPack={setCurrentPack}
                                />
                                <div className='panel-footer center'>
                                    <Button
                                        label='OpeN PacK'
                                        onClick={() => openPack()}
                                    />
                                </div>
                            </div>
                        ) : (
                            <h2>Head to the Market to purchase more PacKs</h2>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Packs