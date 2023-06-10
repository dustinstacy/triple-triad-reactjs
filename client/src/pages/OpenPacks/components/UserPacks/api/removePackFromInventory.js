import axios from 'axios'

import { removeObjectByValue } from '@utils/removeObjectByValue'

const removePackFromInventory = async (inventory, currentPack) => {
    removeObjectByValue(inventory, currentPack.name)
    await axios.put('/api/profile/inventory', {
        inventory: inventory,
    })
}

export default removePackFromInventory
