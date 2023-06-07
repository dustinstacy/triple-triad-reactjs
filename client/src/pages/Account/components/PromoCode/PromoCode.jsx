import React, { useState } from 'react'
import axios from 'axios'

import { Button, TextInput } from '@components'
import { useGlobalContext } from '@context'

import './PromoCode.scss'

const PromoCode = () => {
    const { user, getCurrentUser } = useGlobalContext()

    const [promoCode, setPromoCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleInputChange = (e) => {
        setError('') // Clear any previous errors
        setPromoCode(e.target.value)
    }

    const handleSubmit = async (e) => {
        setLoading(true)

        try {
            await checkPromoCode()
        } catch (error) {
            setError(error.message) // Set the error message for display
        } finally {
            setLoading(false)
        }
    }

    const checkPromoCode = async () => {
        if (promoCode === import.meta.env.VITE_PROMO) {
            await updateUser()
        } else {
            throw new Error('That is incorrect') // Throw error for invalid promo code
        }
    }

    const updateUser = async () => {
        // Update user's coin and XP with succesful promo code
        await axios.put('/api/profile/info', {
            coin: user.coin + 1000000,
        })
        await axios.put('/api/profile/stats', {
            xp: user.xp + 2100,
        })
        getCurrentUser() // Refresh user data after updating
    }

    return (
        <div className='promo-code'>
            <h1>Promo Code</h1>
            <div className='box center-column'>
                <TextInput
                    label='Enter promo code here'
                    name='promoCode'
                    value={promoCode}
                    onChange={handleInputChange}
                    loading={loading}
                />
                {error && <p className='error'>{error}</p>}
                <Button
                    label='Try that one'
                    onClick={handleSubmit}
                    disabled={promoCode.length === 0 || loading}
                />
            </div>
        </div>
    )
}

export default PromoCode
