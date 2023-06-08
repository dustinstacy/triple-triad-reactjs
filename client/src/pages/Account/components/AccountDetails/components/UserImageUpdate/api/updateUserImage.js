import axios from 'axios'

// Send a request to update the user's profile image with the supplied newUserImage
const updateUserImage = async (newUserImage) => {
    try {
        await axios.put('./api/profile/info', {
            image: newUserImage,
        })
    } catch (error) {
        console.error('Error updating user image:', error)
    }
}

export default updateUserImage
