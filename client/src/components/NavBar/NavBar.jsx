import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import axios from 'axios'
import { motion } from 'framer-motion'

import { useGlobalContext } from '../../context/GlobalContext'
import { logo } from '../../assets/logos'
import { coin } from '../../assets/icons'
import { levels } from '../../constants/levels'
import { navlinks } from '../../constants/navlinks'
import './NavBar.scss'

const NavBar = () => {
    const { user, logout, getCurrentUser } = useGlobalContext()
    const navigate = useNavigate()

    const [toggle, setToggle] = useState(false)

    const userNextLevel = levels[user?.level]

    const xpPercentage = () => {
        const percentage = (user?.xp / userNextLevel) * 100 + '%'
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

    return (
        <div className='navbar'>
            <div className='dropdown'>
                <GiHamburgerMenu
                    onClick={() => setToggle((current) => !current)}
                />
                {toggle && (
                    <motion.div
                        className='dropdown__menu'
                        initial={{ width: 0 }}
                        animate={
                            window.innerWidth > 600
                                ? { width: '25vw' }
                                : { width: '50vw' }
                        }
                        transition={{
                            duration: 0.5,
                            ease: 'easeIn',
                        }}
                    >
                        <div className='links'>
                            {navlinks.map((link) => (
                                <a
                                    key={link.name}
                                    onClick={() => navigate(`${link.path}`)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                onClick={() => {
                                    logout(), setToggle(false), navigate('/')
                                }}
                            >
                                Logout
                            </a>
                        </div>
                    </motion.div>
                )}
            </div>
            <div className='navbar__logo'>
                <img src={logo} alt='logo' />
            </div>

            <div className='navbar__links'>
                {navlinks.map((link) => (
                    <a key={link.name} onClick={() => navigate(`${link.path}`)}>
                        {link.name}
                    </a>
                ))}
            </div>

            <div className='navbar__user'>
                <hr />
                <div className='inventory'>
                    <p className='coin'>
                        {user?.coin} <img src={coin} alt='coin' />
                    </p>
                </div>
                <div className='info'>
                    <h2>{user?.username}</h2>
                    <div className='progressBar'>
                        <div
                            className='progressBar__inner'
                            style={{ width: xpPercentage() }}
                        ></div>
                    </div>
                    <span className='xp'>
                        XP &nbsp; {user?.xp} / {userNextLevel}
                    </span>
                </div>

                <div className='image'>
                    <div className='image-inner'>
                        <img src={user?.image} alt='user image' />
                        <p className='level'>LVL {user?.level}</p>
                    </div>
                </div>
            </div>

            <hr className='border-bottom' />
        </div>
    )
}

export default NavBar
