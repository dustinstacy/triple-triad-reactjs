import axios from 'axios'

// Deduct final purchase price from user's coin
const deductUserCoin = async (coin, finalPrice) => {
    await axios.put('/api/profile/info', {
        coin: coin - finalPrice,
    })
}

export default deductUserCoin
