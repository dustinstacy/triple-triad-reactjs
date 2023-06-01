import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../../context/GlobalContext'
import { Button, TextInput } from '../../components'
import './Account.scss'

const AccountDetails = () => {
    const { user, getCurrentUser } = useGlobalContext()

    const [userImage, setUserImage] = useState('')

    const updateUserImage = () => {
        axios.put('./api/profile/info', {
            image: userImage,
        })
        setUserImage('')
    }

    useEffect(() => {
        getCurrentUser()
    }, [setUserImage])
    return (
        <div>
            <h1>Account Details</h1>
            <div className='section box'>
                <p className='custom-image'>
                    Account Image : <img src={user?.image} alt='user image' />
                </p>
                <div className='image-input'>
                    <TextInput
                        type='text'
                        name={userImage}
                        value={userImage}
                        setState={setUserImage}
                        label='paste new image url here'
                    />
                    <Button
                        label='Submit'
                        type='submit'
                        onClick={updateUserImage}
                    />
                </div>
                <br />
                <p>Username : {user?.username}</p>
                <p>Email : {user?.email}</p>
                <a>Edit Details</a>
            </div>
        </div>
    )
}

const PromoCode = () => {
    const { user, getCurrentUser } = useGlobalContext()
    const [promoCode, setPromoCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        setPromoCode(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (promoCode === 'ZELLSBELLS') {
                await axios.put('/api/profile/info', {
                    coin: user.coin + 1000000,
                })
                await axios.put('/api/profile/stats', {
                    xp: user.xp + 2100,
                })
                getCurrentUser()
            } else {
                throw new Error("That doesn't seem to work")
            }
        } catch (error) {
            if (error) {
                setErrors(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Promo Code</h1>
            <div className='promo-code section box'>
                <TextInput
                    label='Enter promo code here'
                    name='promoCode'
                    value={promoCode}
                    onChange={handleInputChange}
                    loading={loading}
                />
                {errors.length && <p>{errors}</p>}

                <Button
                    label='Try that one'
                    onClick={(e) => handleSubmit(e)}
                    disabled={promoCode.length === 0}
                />
            </div>
        </div>
    )
}

const Account = () => {
    return (
        <div className='account page center'>
            <AccountDetails />
            <PromoCode />
        </div>
    )
}

export default Account
