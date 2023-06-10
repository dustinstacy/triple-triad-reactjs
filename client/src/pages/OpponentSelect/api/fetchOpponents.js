import axios from 'axios'

// Get all CPU opponents from the server
const fetchOpponents = async () => {
    const response = await axios.get('/api/cpuOpponents')
    return response.data
}

export default fetchOpponents
