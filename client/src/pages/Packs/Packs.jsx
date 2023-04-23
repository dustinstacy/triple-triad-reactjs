import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../../context/GlobalContext'
import { assignRandomValues } from '../../utils/assignRandomValues'
import { Card } from '../../components'
import { smallPack, mediumPack, largePack } from '../../assets/packs'
import './Packs.scss'

const Packs = () => {
    const { allCards, user, getCurrentUser } = useGlobalContext()
    const [pack, setPack] = useState('')
    const [packContents, setPackContents] = useState([])
    const [userSmallPacks, setUserSmallPacks] = useState([])
    const [userMediumPacks, setUserMediumPacks] = useState([])
    const [userLargePacks, setUserLargePacks] = useState([])

    useEffect(() => {
        getCurrentUser()
    }, [])

    useEffect(() => {
        user &&
            (setUserSmallPacks([
                ...user.packs.filter((pack) => pack.name === 'small'),
            ]),
            setUserMediumPacks([
                ...user.packs.filter((pack) => pack.name === 'medium'),
            ]),
            setUserLargePacks([
                ...user.packs.filter((pack) => pack.name === 'large'),
            ]))
    }, [getCurrentUser])

    const openPack = async () => {
        let packSize
        if (pack === 'small') {
            packSize = 3
        }
        if (pack === 'medium') {
            packSize = 5
        }
        if (pack === 'large') {
            packSize = 10
        }
        const newPack = [...Array(packSize)]
        getRandomCards(newPack)
        newPack.forEach((card) => {
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
        setPackContents(newPack)
        if (pack === 'small') {
            userSmallPacks.pop()
        }
        if (pack === 'medium') {
            userMediumPacks.pop()
        }
        if (pack === 'large') {
            userLargePacks.pop()
        }
        const userPacks = [
            ...userSmallPacks,
            ...userMediumPacks,
            ...userLargePacks,
        ]
        axios.put('/api/profile/packs', {
            packs: userPacks,
        })
        setPack(null)
    }

    const randomRarity = () => {
        const num = Math.random()
        if (num < 0.5) return 'Common'
        else if (num <= 0.75) return 'Uncommon'
        else if (num <= 0.9) return 'Rare'
        else if (num <= 0.975) return 'Epic'
        else return 'Legendary'
    }

    const getRandomCards = (pack) => {
        pack.forEach((_, i) => {
            const rarity = randomRarity()
            const currentRarityCards = allCards.filter(
                (card) => card.rarity === rarity
            )
            const randomCard =
                currentRarityCards[
                    Math.floor(Math.random() * currentRarityCards.length)
                ]
            pack.splice(i, 1, randomCard)
        })
    }

    return (
        <div className='packs page'>
            <div className='contents'>
                <div className='container'>
                    {packContents.map((card, i) => (
                        <Card
                            key={card._id}
                            card={card}
                            player='p1'
                            visibility={true}
                        />
                    ))}
                </div>

                {pack && (
                    <button className='open box' onClick={(e) => openPack(e)}>
                        Open Pack
                    </button>
                )}
            </div>
            <div className='packs__bar'>
                <div className='inventory'>
                    <div className='pack'>
                        <div className='count'>
                            <img src={smallPack} alt='Small Pack' />
                            <span>x {userSmallPacks.length}</span>
                        </div>

                        <button
                            className={`box ${pack === 'small' && 'active'} ${
                                userSmallPacks.length === 0 && 'disabled'
                            }`}
                            onClick={() => {
                                setPack('small'), setPackContents([])
                            }}
                        >
                            {pack === 'small' ? 'Selected' : 'Select'}
                        </button>
                    </div>
                    <div className='pack'>
                        <div className='count'>
                            <img src={mediumPack} alt='Medium Pack' />
                            <span>x {userMediumPacks.length}</span>
                        </div>

                        <button
                            className={`box ${pack === 'medium' && 'active'} ${
                                userMediumPacks.length === 0 && 'disabled'
                            }`}
                            onClick={() => {
                                setPack('medium'), setPackContents([])
                            }}
                        >
                            {pack === 'medium' ? 'Selected' : 'Select'}
                        </button>
                    </div>
                    <div className='pack'>
                        <div className='count'>
                            <img src={largePack} alt='Large Pack' />
                            <span>x {userLargePacks.length}</span>
                        </div>

                        <button
                            className={`box ${pack === 'large' && 'active'} ${
                                userLargePacks.length === 0 && 'disabled'
                            }`}
                            onClick={() => {
                                setPack('large'), setPackContents([])
                            }}
                        >
                            {pack === 'large' ? 'Selected' : 'Select'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Packs
