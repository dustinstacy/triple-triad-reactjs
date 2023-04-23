import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../../context/GlobalContext'
import { Button, TextInput } from '../../components'
import { blue1, red1 } from '../../assets/backgrounds'
import { rank1 } from '../../assets/ranks'
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
                                handleClick={updateUserImage}
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
                            <div className='stats__rank'>
                                <img src={rank1} alt='rank' />
                                <p>Rank : {user?.rank}</p>
                            </div>
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

                <div>
                    <h1>Customization</h1>
                    <div className='section box'>
                        Backgrounds :
                        <div className='backgrounds'>
                            <div className='backgrounds__blue'>
                                <img src={blue1} alt='blue1' />
                                <p>Blue</p>
                            </div>
                            <div className='backgrounds__blue'>
                                <img src={red1} alt='red1' />
                                <p>Red</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account
