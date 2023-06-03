import React from 'react'
import { TbPlayCard } from 'react-icons/tb'

import { Avatar, ExperienceBar } from '@components'

import './UserPanel.scss'

const UserSection = ({ userCards, user }) => {
    const { level, stats, username } = user ?? {}
    const cardNames = userCards.map((card) => card.name)
    const uniqueCards = [...new Set(cardNames)]

    return (
        <div className='user-panel center'>
            <div className='panel center'>
                <Avatar user={user} navbar={false} />
                <div className='user'>
                    <div className='user__details'>
                        <div className='top'>
                            <h1>{username}</h1>
                            <h1>LVL &nbsp; {level}</h1>
                        </div>
                        <hr />
                        <ExperienceBar />
                    </div>
                    <div className='user__stats'>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Total MatcHes :</th>
                                    <td>{stats?.battles}</td>
                                </tr>
                                <tr>
                                    <th>Wins :</th>
                                    <td>{stats?.wins}</td>
                                </tr>
                                <tr>
                                    <th>Losses :</th>
                                    <td>{stats?.losses}</td>
                                </tr>
                                <tr>
                                    <th>Draws :</th>
                                    <td>{stats?.draws}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                                <tr>
                                    <th>
                                        Total <TbPlayCard /> :
                                    </th>
                                    <td>{userCards.length}</td>
                                </tr>
                                <tr>
                                    <th>
                                        Unique <TbPlayCard /> :
                                    </th>
                                    <td>{uniqueCards.length}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSection
