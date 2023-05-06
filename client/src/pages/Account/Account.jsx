import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../../context/GlobalContext'
import { Button, NavBar, TextInput } from '../../components'
import './Account.scss'

const Account = () => {
    const { user, getCurrentUser } = useGlobalContext()
    const [userImage, setUserImage] = useState('')

    useEffect(() => {
        getCurrentUser()
    }, [])

    const updateUserImage = () => {
        axios.put('./api/profile', {
            image: userImage,
        })
        setUserImage('')
    }

    useEffect(() => {
        getCurrentUser()
    }, [setUserImage])

    return (
        <div className='account page'>
            <div className='container'>
                <div>
                    <h1>Account Details</h1>
                    <div className='section box'>
                        <p className='custom-image'>
                            Account Image :{' '}
                            <img src={user?.image} alt='user image' />
                        </p>
                        <div className='image-input'>
                            <TextInput
                                type='text'
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
                        <p>Password : ************</p>
                        <a>Edit Details</a>
                    </div>
                </div>

                <div>
                    <h1>Stats</h1>
                    <div className='section box'>
                        <div className='stats'>
                            <div className='stats__info'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Record :</th>
                                            <td>
                                                {user?.stats.wins} -{' '}
                                                {user?.stats.losses} -{' '}
                                                {user?.stats.draws}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Matches :</th>
                                            <td>{user?.stats.matches}</td>
                                        </tr>
                                        <tr>
                                            <th>Wins :</th>
                                            <td>{user?.stats.wins}</td>
                                        </tr>
                                        <tr>
                                            <th>Losses :</th>
                                            <td>{user?.stats.losses}</td>
                                        </tr>
                                        <tr>
                                            <th>Draws :</th>
                                            <td>{user?.stats.draws}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account
