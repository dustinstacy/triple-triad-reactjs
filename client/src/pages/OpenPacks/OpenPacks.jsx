import React, { useEffect, useState } from 'react'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import { useGlobalContext } from '../../context/GlobalContext'
import { Button, Card, Loader, ProductTour } from '../../components'
import { uniqueItemsFilter } from '../../utils/uniqueItemsFilter'
import { assignRandomCardValues, getRandomCards } from '../../utils/randomizers'
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

const PackContents = ({ cards, setPackContents }) => (
    <div className='packs-container center'>
        {cards.map((card) => (
            <Card key={card._id} card={card} isShowing />
        ))}
        <Button label='Go Back' onClick={() => setPackContents(null)} />
    </div>
)

const Packs = () => {
    const { allCards, getGlobalState, getCurrentUser, user } =
        useGlobalContext()
    const stage = user?.onboardingStage

    const [currentPack, setCurrentPack] = useState(null)
    const [packContents, setPackContents] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const userPacks = [
        ...new Set(user?.inventory.filter((item) => item.type === 'pack')),
    ]
    const uniquePacks = uniqueItemsFilter(userPacks).sort(
        (a, b) => b.level - a.level
    )

    const openPack = async () => {
        setIsLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 5000))

        const chosenPack = userPacks.find(
            (pack) => pack.name === currentPack.name
        )

        const { contents } = chosenPack ?? {}
        const newCards = getRandomCards(contents.count, contents.odds, allCards)
        newCards.forEach(async (card) => {
            assignRandomCardValues(card)
            const cardData = {
                name: card.name,
                number: card.number,
                image: card.image,
                rarity: card.rarity,
                empower: card.empower,
                weaken: card.weaken,
                values: card.values,
            }
            try {
                await axios.put('/api/collection/new', cardData)
            } catch (error) {
                console.log(error)
            }
        })
        newCards.forEach((card) => (card.color = 'gray'))
        setPackContents(newCards)

        removeObjectByValue(user.inventory, currentPack.name)
        await axios
            .put('/api/profile/inventory', {
                inventory: user.inventory,
            })
            .then(() => getCurrentUser())

        setIsLoading(false)
    }

    useEffect(() => {
        getGlobalState()
    }, [])

    return (
        <div className='packs page center'>
            {stage === 1 && <ProductTour step={2} />}
            {stage === 2 && <ProductTour step={3} />}

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
