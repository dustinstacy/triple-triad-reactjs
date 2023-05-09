import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { Avatar, Card, ExperienceBar } from '../../components'
import { TbPlayCard } from 'react-icons/tb'
import axios from 'axios'
import { FaStar, FaRegStar } from 'react-icons/fa'
import './Collection.scss'

const UserSection = ({ userCards, user }) => {
    const { level, stats, username } = user ?? {}
    const cardNames = userCards?.map((card) => card.name)
    const uniqueCards = [...new Set(cardNames)]

    return (
        <div className='user-section center'>
            <Avatar user={user} navbar={false} />
            <div className='user'>
                <div className='user__details'>
                    <div className='top'>
                        <h1>{username ?? 'User'}</h1>
                        <h1>LVL &nbsp; {level ?? ''}</h1>
                    </div>
                    <hr />
                    <ExperienceBar />
                </div>
                <div className='user__stats'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Total MatcHes :</th>
                                <td>{stats?.matches ?? 0}</td>
                            </tr>
                            <tr>
                                <th>Wins :</th>
                                <td>{stats?.wins ?? 0}</td>
                            </tr>
                            <tr>
                                <th>Losses :</th>
                                <td>{stats?.losses ?? 0}</td>
                            </tr>
                            <tr>
                                <th>Draws :</th>
                                <td>{stats?.draws ?? 0}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    Total <TbPlayCard /> :
                                </th>
                                <td>{userCards.length}</td>
                            </tr>
                            <tr>
                                <th>
                                    Unique <TbPlayCard /> :
                                </th>
                                <td>{uniqueCards.length}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {userCards.length && (
                <div className='main-card'>
                    <Card
                        card={userCards[0]}
                        player='p1'
                        turn={true}
                        visibility={true}
                    />
                    <h3>Most CaptuRes</h3>
                </div>
            )}
        </div>
    )
}

const Filters = ({
    deckFilter,
    setDeckFilter,
    rarityFilter,
    setRarityFilter,
    valueFilter,
    setValueFilter,
}) => {
    return (
        <div className='filters'>
            <select
                value={deckFilter}
                onChange={(e) => setDeckFilter(e.target.value)}
            >
                <option value='Show All'>Show All</option>
                <option value='In Deck'>In Deck</option>
                <option value='Not In Deck'>Not In Deck</option>
            </select>
            <select
                value={rarityFilter}
                onChange={(e) => setRarityFilter(e.target.value)}
            >
                <option value='None'>-</option>
                <option value='Common'>Common</option>
                <option value='Uncommon'>Uncommon</option>
                <option value='Rare'>Rare</option>
                <option value='Epic'>Epic</option>
                <option value='Legendary'>Legendary</option>
            </select>
            <select
                value={valueFilter}
                onChange={(e) => setValueFilter(e.target.value)}
            >
                <option value='None'>-</option>
                <option value='Up'>Up</option>
                <option value='Down'>Down</option>
                <option value='Left'>Left</option>
                <option value='Right'>Right</option>
                <option value='Total'>Total</option>
            </select>
        </div>
    )
}

const DeckBar = () => {
    // const autoBuild = async () => {
    //     const emptySlots = 35 - userDeck.length
    //     const totalValueArray = userCards
    //         .filter((card) => !userDeck.find(({ _id }) => card._id === _id))
    //         .sort(
    //             (a, b) =>
    //                 b.values.reduce(
    //                     (sum, current) =>
    //                         parseInt(sum) + parseInt(current.replace(/A/g, 10)),
    //                     0
    //                 ) -
    //                 a.values.reduce(
    //                     (sum, current) =>
    //                         parseInt(sum) + parseInt(current.replace(/A/g, 10)),
    //                     0
    //                 )
    //         )
    //     for (let i = 0; i < emptySlots; i++) {
    //         markSelected(totalValueArray[i])
    //     }
    //     getCurrentUser()
    // }
    // const unSelectAll = () => {
    //     userDeck.forEach((deckCard) => {
    //         removeSelection(deckCard)
    //     })
    //     getCurrentUser()
    // }
}

const CardCollection = ({
    userCards,
    userDeck,
    deckFilter,
    rarityFilter,
    valueFilter,
    valuesArray,
}) => {
    const [filteredCards, setFilteredCards] = useState([])

    useEffect(() => {
        let filtered = [...userCards]

        if (deckFilter === 'Show All') {
            filtered = [...userCards]
        } else if (deckFilter === 'In Deck') {
            filtered = userCards.filter((card) =>
                userDeck.find(({ _id }) => card._id === _id)
            )
        } else if (deckFilter === 'Not In Deck') {
            filtered = userCards.filter(
                (card) => !userDeck.find(({ _id }) => card._id === _id)
            )
        }

        if (rarityFilter == '-') {
            filtered.sort((a, b) => a.number - b.number)
        } else if (rarityFilter) {
            filtered = filtered.filter((card) => card.rarity === rarityFilter)
        }

        if (valueFilter == '-') {
            filtered.sort((a, b) => a.number - b.number)
        } else if (valueFilter) {
            filtered = filtered.sort((a, b) => {
                const aVal = a.values[valuesArray.indexOf(valueFilter)]
                const bVal = b.values[valuesArray.indexOf(valueFilter)]
                return (
                    parseInt(bVal.replace(/A/g, 10)) -
                    parseInt(aVal.replace(/A/g, 10))
                )
            })
        }

        setFilteredCards(filtered)
    }, [userCards, deckFilter, rarityFilter, valueFilter, userDeck])

    return (
        <div className='card-collection'>
            {filteredCards?.map((card) => (
                <Card
                    key={card._id}
                    card={card}
                    visibility={true}
                    selector={true}
                />
            ))}
        </div>
    )
}

const markSelected = async (card) => {
    if (userDeck.length < 35) {
        await axios.put(`/api/collection/${card._id}/selected`)
        await axios.post('/api/deck/add', {
            user: user._id,
            _id: card._id,
            number: card.number,
            name: card.name,
            rarity: card.rarity,
            element: card.element,
            image: card.image,
            values: card.values,
        })
        getCurrentUser()
    } else {
        alert('Your deck is currently full')
    }
}

const removeSelection = async (card) => {
    await axios.put(`/api/collection/${card._id}/removeSelection`)
    await axios.delete(`/api/deck/${card._id}/remove`, {
        user: user._id,
    })
    getCurrentUser()
}

const Collection = () => {
    const { getCurrentUser, user, getUserCards, userCards, userDeck } =
        useGlobalContext()

    const [deckFilter, setDeckFilter] = useState('')
    const [rarityFilter, setRarityFilter] = useState('')
    const [valueFilter, setValueFilter] = useState('')
    const valuesArray = ['Up', 'Right', 'Down', 'Left', 'Total']

    useEffect(() => {
        getCurrentUser()
        getUserCards()
    }, [])

    return (
        <div className='collection page'>
            <UserSection user={user} userCards={userCards ?? []} />
            <Filters
                deckFilter={deckFilter}
                rarityFilter={rarityFilter}
                valueFilter={valueFilter}
                setDeckFilter={setDeckFilter}
                setRarityFilter={setRarityFilter}
                setValueFilter={setValueFilter}
            />
            <DeckBar />
            <CardCollection
                userCards={userCards ?? []}
                userDeck={userDeck ?? []}
                deckFilter={deckFilter}
                rarityFilter={rarityFilter}
                valueFilter={valueFilter}
                valuesArray={valuesArray}
            />
        </div>
    )
}

export default Collection
