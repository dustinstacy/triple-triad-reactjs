import axios from 'axios'

export const handleLevelUp = async (userLevel) => {
    try {
        await axios.put('/api/profile/stats', { level: userLevel + 1 })
    } catch (error) {
        console.error('Error updating user level:', error)
    }
}
