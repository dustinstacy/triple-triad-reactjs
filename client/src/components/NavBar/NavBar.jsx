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

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
        setIsOpen((isOpen) => !isOpen)
    }

    return (
        <div className='burger-menu'>
            {!isOpen ? (
                <MdMenu onClick={() => handleToggle()} />
            ) : (
                <MdOutlineClose onClick={() => handleToggle()} />
            )}
            <motion.div
                className='menu'
                initial={{ width: 0 }}
                animate={
                    window.innerWidth > 600
                        ? { width: isOpen ? '25vw' : '0' }
                        : { width: isOpen ? '50vw' : '0' }
                }
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                }}
            >
                <div className='links'>
                    {navlinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

const Links = () => {
    return (
        <div className='links'>
            {navlinks.map((link) => (
                <NavLink className='link center' key={link.name} to={link.path}>
                    {link.image}
                    <p>{link.name}</p>
                </NavLink>
            ))}
        </div>
    )
}

const User = () => {
    const { user, getCurrentUser, logout } = useGlobalContext()
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false)
    const userNextLevel = levels[user?.level]
    const xpPercentage = () => {
        const percentage = (user?.xp / userNextLevel) * 100 + '%'
        return percentage
    }

    useEffect(() => {
        if (user?.xp >= userNextLevel) {
            axios
                .put('/api/profile', {
                    level: user.level + 1,
                })
                .then(() => {
                    getCurrentUser()
                })
        }
    }, [user, getCurrentUser, userNextLevel])

    const handleLogout = () => {
        logout().then(() => {
            setToggle(false)
            navigate('/')
        })
    }

    return (
        <div className='user'>
            <hr />

            <div className='user__inventory'>
                <p className='coin center'>
                    {user?.coin} <img src={coin} alt='coin' />
                </p>
            </div>

            <div className='user__info'>
                <h2>{user?.username}</h2>
                <div className='progressBar'>
                    <div
                        className='progressBar__inner'
                        style={{ width: xpPercentage() }}
                    ></div>
                </div>
                <span className='xp'>
                    XP {user?.xp} / {userNextLevel}
                </span>
            </div>

            <div className='user__image'>
                <div className='image-inner '>
                    <img
                        src={user?.image}
                        alt='user image'
                        onClick={() => setToggle((current) => !current)}
                    />
                    <p className='level box'>LVL {user?.level}</p>
                    {toggle && (
                        <div className='user-menu box'>
                            <a href='/account'>Account</a>
                            <a
                                className='user-link center'
                                onClick={() => handleLogout()}
                            >
                                Logout <MdLogout />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const NavBar = ({ landing }) => {
    const { user } = useGlobalContext()
    const navigate = useNavigate()

    return (
        <div className='navbar'>
            <BurgerMenu />
            <img
                src={logo}
                alt='logo'
                className='navbar__logo'
                onClick={() => navigate('/home')}
            />
            <Links />
            {user ? (
                <User />
            ) : (
                !landing && (
                    <a className='navbar__login box' href='/'>
                        Login
                    </a>
                )
            )}

            <hr className='gold-border-bottom' />
        </div>
    )
}

export default NavBar
