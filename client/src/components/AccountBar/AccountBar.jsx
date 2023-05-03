import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import axios from 'axios'
import { motion } from 'framer-motion'

import { useGlobalContext } from '../../context/GlobalContext'
import { coin, home } from '../../assets/icons'
import { levels } from '../../constants/levels'
import { navlinks } from '../../constants/navlinks'
import './AccountBar.scss'

const AccountBar = () => {
    const { user, logout, getCurrentUser } = useGlobalContext()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const [toggle, setToggle] = useState(false)

    const userNextLevel = levels[user?.level]

    const xpPercentage = () => {
        const percentage = (user.xp / userNextLevel) * 100 + '%'
        return percentage
    }

    useEffect(() => {
        if (user?.xp >= userNextLevel) {
            axios.put('/api/profile', {
                level: user.level + 1,
            })
            getCurrentUser()
        }
    }, [user])

    const dropDownNavigate = (link) => {
        setToggle(false)
        navigate(link.path)
    }

    return (
        <div className='accountBar'>
            <div style={{ display: 'flex' }}>
                {user &&
                    pathname !== '/' &&
                    pathname !== '/match' &&
                    pathname !== '/home' &&
                    pathname !== '/firstDeck' &&
                    pathname !== '/matchEnd' && (
                        <div className='accountBar__home'>
                            <img
                                src={home}
                                alt='home'
                                onClick={() => navigate('/home')}
                            />
                        </div>
                    )}
            </div>

            <div style={{ display: 'flex' }}>
                {user ? (
                    pathname === '/home' ||
                    pathname === '/solo' ||
                    pathname === '/account' ? (
                        <>
                            <div className='accountBar__player'>
                                <div className='info'>
                                    <h2>{user.username}</h2>

                                    <div className='progressBar'>
                                        <span>
                                            xp: {user.xp} / {userNextLevel}
                                        </span>
                                        <div
                                            className='progressBar__inner'
                                            style={{ width: xpPercentage() }}
                                        ></div>
                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            lineHeight: '1',
                                        }}
                                    >
                                        <p>Lvl. {user.level}</p>
                                        <p>
                                            {user.coin}{' '}
                                            <img src={coin} alt='coin' />
                                        </p>
                                    </div>
                                </div>

                                <div className='image'>
                                    <img src={user.image} alt='user image' />
                                </div>

                                <GiHamburgerMenu
                                    className='dropdown'
                                    onClick={() =>
                                        setToggle((current) => !current)
                                    }
                                />
                            </div>

                            {toggle && (
                                <motion.div
                                    className='dropdown__menu'
                                    initial={{ width: 0 }}
                                    animate={
                                        window.innerWidth > 600
                                            ? { width: '20vw' }
                                            : { width: '50vw' }
                                    }
                                    transition={{
                                        duration: 0.5,
                                        ease: 'easeInOut',
                                    }}
                                >
                                    <ul className='dropdown__links'>
                                        {navlinks.map((link) => (
                                            <li
                                                className='dropdown__link'
                                                key={link.name}
                                                onClick={() =>
                                                    dropDownNavigate(link)
                                                }
                                            >
                                                {link.name}
                                            </li>
                                        ))}
                                        <li
                                            className='logout'
                                            onClick={() => {
                                                logout(),
                                                    setToggle(false),
                                                    navigate('/')
                                            }}
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                </motion.div>
                            )}
                        </>
                    ) : (
                        <></>
                    )
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

export default AccountBar
