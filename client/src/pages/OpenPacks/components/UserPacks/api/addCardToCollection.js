import axios from 'axios'

const addCardToCollection = async (cardData) => {
    await axios.put('/api/collection/new', cardData)
}

export default addCardToCollection
