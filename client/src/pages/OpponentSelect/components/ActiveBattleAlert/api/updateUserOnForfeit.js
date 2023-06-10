import axios from 'axios'

// Update user's stats when they choose to forfeit an active battle
const updateUserOnForfeit = async (userStats) => {
    await axios.put('/api/profile/stats', {
        battles: userStats.battles + 1,
        wins: userStats.wins,
        losses: userStats.losses + 1,
        draws: userStats.draws,
    })
}

export default updateUserOnForfeit
