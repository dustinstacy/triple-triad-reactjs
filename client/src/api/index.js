import axios from 'axios'

import { removeObjectByValue } from '@utils'

export const addCardToCollection = async (cardData) => {
    await axios.put('/api/collection/new', cardData)
}

export const addExperience = async (userXP, xp) => {
    await axios.put('/api/profile/stats', {
        xp: userXP + xp,
    })
}

export const addCoin = async (userCoin, amount) => {
    await axios.put('/api/profile/info', {
        coin: userCoin + amount,
    })
}

export const addItemToInventory = async (inventory, item) => {
    let updatedInventory = [...inventory]

    if (Array.isArray(item)) {
        updatedInventory.push(...item)
    } else {
        updatedInventory.push(item)
    }

    await axios.put('/api/profile/inventory', {
        inventory: updatedInventory,
    })
}

export const deductCoin = async (userCoin, amount) => {
    const updatedCoin = userCoin - amount
    await axios.put('/api/profile/info', {
        coin: updatedCoin.toString(), // Explicitly set to string to account for 0
    })
}

export const removeItemFromInventory = async (inventory, item) => {
    removeObjectByValue(inventory, 'name', item.name)
    await axios.put('/api/profile/inventory', {
        inventory: inventory,
    })
}

export const updateUserInfo = async (property, value) => {
    try {
        await axios.put('./api/profile/info', {
            [property]: value,
        })
    } catch (error) {
        console.error('Error updating user', error)
    }
}

// Update user's stats when they choose to forfeit an active battle
export const updateUserStats = async (userStats, result) => {
    let results
    switch (result) {
        case 'win':
            results = [1, 1, 0, 0]
            break
        case 'loss':
            results = [1, 0, 1, 0]
            break
        case 'draw':
            results = [1, 0, 0, 1]
            break
        default:
            break
    }

    await axios.put('/api/profile/stats', {
        battles: userStats.battles + results[0],
        wins: userStats.wins + results[1],
        losses: userStats.losses + results[2],
        draws: userStats.draws + results[3],
    })
}
