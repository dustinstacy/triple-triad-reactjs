import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useGlobalContext } from '@context'
import { Button, ProductTour } from '@components'
import { uniqueItemsFilter } from '../../utils/uniqueItemsFilter'
import { assignRandomCardValues, getRandomCards } from '../../utils/randomizers'
import { removeObjectByValue } from '../../utils/removeObjectByValue'

import { Carousel, Loader, PackContents } from './components'
import './OpenPacks.scss'

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
