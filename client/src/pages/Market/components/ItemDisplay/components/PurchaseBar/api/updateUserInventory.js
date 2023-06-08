import axios from 'axios'

// Add final purchase to user's inventory
const updateUserInventory = async (inventory, finalPurchase) => {
    await axios.put('/api/profile/inventory', {
        inventory: [...inventory, ...finalPurchase],
    })
}

export default updateUserInventory
