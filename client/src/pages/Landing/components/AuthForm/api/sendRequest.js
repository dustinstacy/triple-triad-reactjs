import axios from 'axios'

// Sends a request to the appropriate endpoint based on the value of the 'register' prop.
const sendRequest = async (formData, register) => {
    // Deconstruct the formData object to extract values needed for the POST request
    const { username, email, password, confirmPassword } = formData

    // Set the data object based on the value of register prop
    const data = register
        ? { username, email, password, confirmPassword }
        : { username, password }

    const endpoint = register ? '/api/auth/register' : '/api/auth/login'
    await axios.post(endpoint, data)
}

export default sendRequest
