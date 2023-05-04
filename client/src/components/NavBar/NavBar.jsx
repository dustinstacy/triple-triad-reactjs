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
    const [toggle, setToggle] = useState(false)

    return (
        <div className='dropdown'>
            {!toggle ? (
                <MdMenu onClick={() => setToggle((current) => !current)} />
            ) : (
                <MdOutlineClose
                    onClick={() => setToggle((current) => !current)}
                />
            )}
            <motion.div
                className='dropdown__menu'
                initial={{ width: 0 }}
                animate={
                    window.innerWidth > 600
                        ? { width: toggle ? '25vw' : '0' }
                        : { width: toggle ? '50vw' : '0' }
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
            axios.put('/api/profile', {
                level: user.level + 1,
            })
            getCurrentUser()
        }
    }, [user])

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
                                onClick={() =>
                                    logout().then(
                                        setToggle(false),
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
    )
}

const NavBar = ({ landing }) => {
    const navigate = useNavigate()
    const { user } = useGlobalContext()

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
            {!landing &&
                (user ? (
                    <User />
                ) : (
                    <a className='navbar__login box' href='/'>
                        Login
                    </a>
                ))}

            <hr className='gold-border-bottom' />
        </div>
    )
}

export default NavBar
