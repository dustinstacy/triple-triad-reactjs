import React, { useState } from 'react'

import { Button, TextInput } from '@components'
import { useGlobalContext } from '@context'

import { updateUser } from './api'
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
            await updateUser(user)
            await getCurrentUser() // Refresh user data after updating
        } else {
            throw new Error('That is incorrect') // Throw error for invalid promo code
        }
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
