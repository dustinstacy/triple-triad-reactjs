import axios from 'axios'

// Send a request to update user's profile with Promo rewards
const updateUser = async (user) => {
    try {
        // Update user's coin and XP with succesful promo code
        await axios.put('/api/profile/info', {
            coin: user.coin + 1000000,
        })
        await axios.put('/api/profile/stats', {
            xp: user.xp + 2100,
        })
    } catch (error) {
        console.error('Error updating user profile:', error)
    }
}

export default updateUser
