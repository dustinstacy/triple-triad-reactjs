import React, { useState } from 'react'

import { Button, TextInput } from '@components'
import { useGlobalContext } from '@context'

import { updateUserImage } from './api'
import './UserImageUpdate.scss'

const UserImageUpdate = () => {
    const { getCurrentUser } = useGlobalContext()

    const [newUserImage, setNewUserImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleInputChange = (e) => {
        setError('') // Clear any previous errors
        setNewUserImage(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            await validateURL(newUserImage)
        } catch (error) {
            setError(error.message) // Set the error message for display
        } finally {
            setLoading(false)
        }
    }

    // Validate that the entered string is a image url
    const validateURL = async (str) => {
        const imageRegex = /\.(jpeg|jpg|gif|png)$/i

        if (!imageRegex.test(str)) {
            throw new Error('Invalid image URL')
        } else {
            await updateUserImage(str)
            await getCurrentUser() // Refresh user data after updating
        }
    }

    return (
        <div className='image-input center'>
            <TextInput
                label='paste new image url here'
                name='newUserImage'
                value={newUserImage}
                onChange={handleInputChange}
                loading={loading}
            />
            {error && <p className='error'>{error}</p>}
            <Button
                label='Update Image'
                type='submit'
                onClick={handleSubmit}
                disabled={newUserImage.length === 0}
            />
        </div>
    )
}

export default UserImageUpdate
