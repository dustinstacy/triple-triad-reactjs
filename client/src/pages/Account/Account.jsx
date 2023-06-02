import React, { useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import axios from 'axios'
import { useGlobalContext } from '../../context/GlobalContext'
import { Button, TextInput } from '../../components'
import './Account.scss'

const AccountDetails = () => {
    const { user, getCurrentUser } = useGlobalContext()

    const [userImage, setUserImage] = useState('')
    const [edittingUser, setEdittingUser] = useState(false)
    const [newUsername, setNewUsername] = useState('')
    const [newEmail, setNewEmail] = useState('')

    const updateUserImage = async () => {
        await axios.put('./api/profile/info', {
            image: userImage,
        })
        setUserImage('')
        getCurrentUser()
    }

    const editUser = () => {
        setEdittingUser(true)
        setNewUsername(user.username)
        setNewEmail(user.email)
    }

    const handleSubmit = async () => {
        if (newUsername !== user.username) {
            await axios.put('/api/profile/info', { username: newUsername })
        }
        if (newEmail !== user.email) {
            await axios.put('/api/profile/info', { email: newEmail })
        }
        setEdittingUser(false)
        getCurrentUser()
    }

    const handleCancel = () => {
        setEdittingUser(false)
        setNewUsername(user.username)
        setNewEmail(user.email)
    }

    return (
        <div>
            <h1>Account Details</h1>
            <div className='account-details section box'>
                <div className='user center'>
                    <p className='user-image'>
                        Account image :{' '}
                        <img src={user?.image} alt='user image' />
                    </p>
                    <div className='user-info'>
                        <div className='info-input'>
                            {edittingUser ? (
                                <TextInput
                                    value={newUsername}
                                    onChange={(e) =>
                                        setNewUsername(e.target.value)
                                    }
                                    label='Enter new username'
                                />
                            ) : (
                                <>
                                    <p>Username :</p> {user?.username}{' '}
                                </>
                            )}
                        </div>
                        <div className='info-input'>
                            {edittingUser ? (
                                <TextInput
                                    value={newEmail}
                                    onChange={(e) =>
                                        setNewEmail(e.target.value)
                                    }
                                    label='Enter new email'
                                />
                            ) : (
                                <>
                                    <p>Email :</p> {user?.email}
                                </>
                            )}
                        </div>
                        {edittingUser ? (
                            <div className='edit-buttons'>
                                <Button
                                    label='Submit'
                                    onClick={() => handleSubmit()}
                                />
                                <Button
                                    label='Cancel'
                                    onClick={() => handleCancel()}
                                />
                            </div>
                        ) : (
                            <a className='edit' onClick={() => editUser()}>
                                Edit Details <BiEdit />
                            </a>
                        )}
                    </div>
                </div>
                <div className='image-input'>
                    <TextInput
                        value={userImage}
                        onChange={(e) => setUserImage(e.target.value)}
                        label='paste new image url here'
                    />
                    <Button
                        label='Submit'
                        type='submit'
                        onClick={updateUserImage}
                    />
                </div>
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
