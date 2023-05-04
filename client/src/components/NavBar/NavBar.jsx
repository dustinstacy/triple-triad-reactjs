import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { MdOutlineClose, MdLogout, MdMenu } from 'react-icons/md'
import axios from 'axios'
import { motion } from 'framer-motion'

import { useGlobalContext } from '../../context/GlobalContext'
import { logo } from '../../assets/logos'
import { coin } from '../../assets/icons'
import { levels } from '../../constants/levels'
import { navlinks } from '../../constants/navlinks'
import './NavBar.scss'

const NavBar = ({ landing }) => {
    const { user, logout, getCurrentUser } = useGlobalContext()
    const navigate = useNavigate()

    const [toggleBurger, setToggleBurger] = useState(false)
    const [toggleUserOptions, setToggleUserOptions] = useState(false)

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
                {!toggleBurger ? (
                    <MdMenu
                        onClick={() => setToggleBurger((current) => !current)}
                    />
                ) : (
                    <MdOutlineClose
                        onClick={() => setToggleBurger((current) => !current)}
                    />
                )}
                <motion.div
                    className='dropdown__menu'
                    initial={{ width: 0 }}
                    animate={
                        window.innerWidth > 600
                            ? { width: toggleBurger ? '25vw' : '0' }
                            : { width: toggleBurger ? '50vw' : '0' }
                    }
                    transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                    }}
                >
                    <div className='links'>
                        {navlinks.map((link) => (
                            <a key={link.name} href={link.path}>
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
            </div>

            <div className='navbar__logo'>
                <img src={logo} alt='logo' onClick={() => navigate('/home')} />
            </div>

            <div className='navbar__links'>
                {navlinks.map((link) => (
                    <NavLink
                        className='navbar-link center'
                        key={link.name}
                        to={link.path}
                    >
                        {link.image}
                        <p>{link.name}</p>
                    </NavLink>
                ))}
            </div>

            {!landing && user ? (
                <div className='navbar__user'>
                    <hr />

                    <div className='inventory'>
                        <p className='coin center'>
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
                        <div className='image-inner '>
                            <img
                                src={user?.image}
                                alt='user image'
                                onClick={() =>
                                    setToggleUserOptions((current) => !current)
                                }
                            />
                            <p className='level box'>LVL {user?.level}</p>
                            {toggleUserOptions && (
                                <div className='user-menu box'>
                                    <a href='/account'>Account</a>
                                    <a
                                        className='image-link center'
                                        onClick={() =>
                                            logout().then(
                                                setToggleUserOptions(false),
                                                navigate('/')
                                            )
                                        }
                                    >
                                        Logout <MdLogout />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <a className='login' href='/'>
                    Login
                </a>
            )}

            <hr className='gold-border-bottom' />
        </div>
    )
}

export default NavBar
