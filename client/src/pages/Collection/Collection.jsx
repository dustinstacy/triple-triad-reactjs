import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../../context/GlobalContext'
import {
    Avatar,
    Button,
    Card,
    ExperienceBar,
    ProductTour,
} from '../../components'
import { TbPlayCard } from 'react-icons/tb'

import './Collection.scss'
import { CheckBox } from '../../components/CheckBox/CheckBox'

const UserSection = ({ userCards, user }) => {
    const { level, stats, username } = user ?? {}
    const cardNames = userCards.map((card) => card.name)
    const uniqueCards = [...new Set(cardNames)]

    return (
        <div className='user-section center'>
            <Avatar user={user} navbar={false} />
            <div className='user'>
                <div className='user__details'>
                    <div className='top'>
                        <h1>{username}</h1>
                        <h1>LVL &nbsp; {level}</h1>
                    </div>
                    <hr />
                    <ExperienceBar />
                </div>
                <div className='user__stats'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Total MatcHes :</th>
                                <td>{stats?.battles}</td>
                            </tr>
                            <tr>
                                <th>Wins :</th>
                                <td>{stats?.wins}</td>
                            </tr>
                            <tr>
                                <th>Losses :</th>
                                <td>{stats?.losses}</td>
                            </tr>
                            <tr>
                                <th>Draws :</th>
                                <td>{stats?.draws}</td>
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
            <div className='filter'>
                <label htmlFor='deck-filter'>Cards Filter</label>
                <select
                    id='deck-filter'
                    value={deckFilter}
                    onChange={(e) => setDeckFilter(e.target.value)}
                >
                    <option value='Show All'>Show All</option>
                    <option value='In Deck'>In Deck</option>
                    <option value='Not In Deck'>Not In Deck</option>
                </select>
            </div>

            <div className='filter'>
                <label htmlFor='rarity-filter'>Rarity Filter</label>
                <select
                    id='rarity-filter'
                    value={rarityFilter}
                    onChange={(e) => setRarityFilter(e.target.value)}
                >
                    <option value='-'>-</option>
                    <option value='Common'>Common</option>
                    <option value='Uncommon'>Uncommon</option>
                    <option value='Rare'>Rare</option>
                    <option value='Epic'>Epic</option>
                    <option value='Legendary'>Legendary</option>
                </select>
            </div>

            <div className='filter'>
                <label htmlFor='value-filter'>Value Filter</label>
                <select
                    id='value-filter'
                    value={valueFilter}
                    onChange={(e) => setValueFilter(e.target.value)}
                >
                    <option value='-'>-</option>
                    <option value='Up'>Up</option>
                    <option value='Down'>Down</option>
                    <option value='Left'>Left</option>
                    <option value='Right'>Right</option>
                    <option value='Total'>Total</option>
                </select>
            </div>
        </div>
    )
}

const DeckBar = ({
    userCards,
    userDeck,
    getCurrentUser,
    markSelected,
    removeSelection,
}) => {
    const autoBuild = async () => {
        const emptySlots = 15 - userDeck.length
        const totalValueArray = userCards
            .filter((card) => !userDeck.find(({ _id }) => card._id === _id))
            .sort(
                (a, b) =>
                    b.values.reduce(
                        (sum, current) =>
                            parseInt(sum) + parseInt(current.replace(/A/g, 10)),
                        0
                    ) -
                    a.values.reduce(
                        (sum, current) =>
                            parseInt(sum) + parseInt(current.replace(/A/g, 10)),
                        0
                    )
            )
        for (let i = 0; i < emptySlots; i++) {
            markSelected(totalValueArray[i])
        }
        getCurrentUser()
    }

    const unSelectAll = () => {
        userDeck.forEach((deckCard) => {
            removeSelection(deckCard)
        })
        getCurrentUser()
    }

    return (
        <div className='deck center'>
            <div className='counter'>
                <p>Cards in Deck</p>
                <p>
                    <span
                        className={userDeck?.length < 15 ? 'invalid' : 'valid'}
                    >
                        {userDeck.length}
                    </span>
                    / 15
                </p>
            </div>
            <div className='strength'>
                <p>Power</p>
                {userDeck.reduce(
                    (total, card) =>
                        total +
                        card.values.reduce(
                            (sum, current) => parseInt(sum) + parseInt(current),
                            0
                        ),
                    0
                )}
            </div>

            <div className='section'>
                <Button onClick={autoBuild} label='FIll Deck' />
                <Button onClick={unSelectAll} label='Clear Deck' />
            </div>
        </div>
    )
}

const CardCollection = ({
    user,
    userCards,
    userDeck,
    deckFilter,
    rarityFilter,
    valueFilter,
    valuesArray,
    markSelected,
    removeSelection,
}) => {
    const filteredCards = useMemo(() => {
        userCards.forEach((card) => {
            card.color = user.color
        })

        let filtered = [...userCards].sort((a, b) => a.number - b.number)

        if (deckFilter === 'In Deck') {
            filtered = userCards.filter((card) =>
                userDeck.find(({ _id }) => card._id === _id)
            )
        } else if (deckFilter === 'Not In Deck') {
            filtered = userCards.filter(
                (card) => !userDeck.find(({ _id }) => card._id === _id)
            )
        }

        if (rarityFilter && rarityFilter !== '-') {
            filtered = filtered.filter((card) => card.rarity === rarityFilter)
        }

        if (valueFilter == 'Total') {
            filtered = filtered.sort(
                (a, b) =>
                    b.values.reduce(
                        (sum, current) =>
                            parseInt(sum) + parseInt(current.replace(/A/g, 10)),
                        0
                    ) -
                    a.values.reduce(
                        (sum, current) =>
                            parseInt(sum) + parseInt(current.replace(/A/g, 10)),
                        0
                    )
            )
        } else if (valueFilter && valueFilter !== '-') {
            const valueIndex = valuesArray.indexOf(valueFilter)
            filtered = filtered.sort((a, b) => {
                const aValue = a.values[valueIndex]
                const bValue = b.values[valueIndex]
                return (
                    parseInt(bValue.replace(/A/g, 10)) -
                    parseInt(aValue.replace(/A/g, 10))
                )
            })
        }

        return filtered
    }, [userCards, deckFilter, rarityFilter, valueFilter, userDeck])

    return (
        <div className='card-collection'>
            <div className='card-list'>
                {filteredCards?.map((card) => (
                    <div key={card._id} className='card-container'>
                        <Card card={card} faith='p1' isShowing />
                        <CheckBox
                            handleClick={() =>
                                !card.selected
                                    ? markSelected(card)
                                    : removeSelection(card)
                            }
                            selected={card.selected}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

const Collection = () => {
    const { getCurrentUser, user, userCards, userDeck } = useGlobalContext()
    const stage = user?.onboardingStage
    const [deckFilter, setDeckFilter] = useState('')
    const [rarityFilter, setRarityFilter] = useState('')
    const [valueFilter, setValueFilter] = useState('')
    const valuesArray = ['Up', 'Right', 'Down', 'Left', 'Total']

    useEffect(() => {
        getCurrentUser()
    }, [])

    const markSelected = async (card) => {
        if (userDeck.length < 15) {
            await axios.put(`/api/collection/${card._id}/select`)
            const cardData = {
                _id: card._id,
                image: card.image,
                empower: card.empower,
                weaken: card.weaken,
                values: card.values,
            }
            await axios.put(`/api/deck/add`, cardData)
            getCurrentUser()
        } else {
            alert('Your deck is currently full')
        }
    }

    const removeSelection = async (card) => {
        await axios.put(`/api/collection/${card._id}/unselect`)
        await axios.put(`/api/deck/${card._id}/remove`)
        getCurrentUser()
    }

    return (
        <div className='collection page'>
            {stage === 2 && <ProductTour step={4} />}

            <UserSection user={user} userCards={userCards ?? []} />
            <DeckBar
                user={user}
                userCards={userCards}
                userDeck={userDeck}
                getCurrentUser={getCurrentUser}
                markSelected={markSelected}
                removeSelection={removeSelection}
            />
            <div className='header'>
                <h1>Cards</h1>
                <hr />
            </div>
            <Filters
                deckFilter={deckFilter}
                rarityFilter={rarityFilter}
                valueFilter={valueFilter}
                setDeckFilter={setDeckFilter}
                setRarityFilter={setRarityFilter}
                setValueFilter={setValueFilter}
            />
            <CardCollection
                user={user}
                userCards={userCards ?? []}
                userDeck={userDeck ?? []}
                deckFilter={deckFilter}
                rarityFilter={rarityFilter}
                valueFilter={valueFilter}
                valuesArray={valuesArray}
                markSelected={markSelected}
                removeSelection={removeSelection}
            />
        </div>
    )
}

export default Collection
