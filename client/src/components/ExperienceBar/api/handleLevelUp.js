import axios from 'axios'

const handleLevelUp = async () => {
    try {
        await axios.put('/api/profile/stats', { level: level + 1 })
    } catch (error) {
        console.error('Error updating user level:', error)
    }
}

export default handleLevelUp
