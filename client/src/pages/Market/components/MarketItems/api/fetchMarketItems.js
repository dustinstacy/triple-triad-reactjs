import axios from 'axios'

// Fetches market items from the server
const fetchMarketItems = async () => {
    try {
        const response = await axios.get('/api/items')
        return response.data
    } catch (error) {
        console.error('Error fetching market items:', error)
        return null
    }
}

export default fetchMarketItems
