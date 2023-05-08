import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { MdOutlineClose, MdLogout, MdMenu } from 'react-icons/md'

import axios from 'axios'
import { motion } from 'framer-motion'
import useMediaQuery from '@mui/material/useMediaQuery'

import { useGlobalContext } from '../../context/GlobalContext'
import { handleToggle } from '../../utils/handleToggle'

import { logo } from '../../assets/logos'
import { coinImage } from '../../assets/icons'
import { levels } from '../../constants/levels'
import { navlinks } from '../../constants/navlinks'

import './NavBar.scss'

// The list of links is memoized to avoid unnecessary re-rendering.
// The menu and onClick props are used to add CSS class names and customize functionality of the links.
const Links = ({ menu, onClick }) => {
    const linkItems = useMemo(
        () =>
            navlinks.map((link) => (
                <NavLink
                    className={`${menu}-link center`}
                    key={link.name}
                    to={link.path}
                    onClick={onClick}
                >
                    {link.image}
                    <p>{link.name}</p>
                </NavLink>
            )),
        [menu]
    )

    return <div className={`${menu}-links`}>{linkItems}</div>
}

const BurgerMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const isSmallScreen = useMediaQuery('(min-width:600px)')

    useEffect(() => {
        return () => {
            setIsMenuOpen(false)
        }
    }, [, isSmallScreen])

    return (
        <div className='burger-menu'>
            {!isMenuOpen ? (
                <MdMenu onClick={() => handleToggle(setIsMenuOpen)} />
            ) : (
                <MdOutlineClose onClick={() => handleToggle(setIsMenuOpen)} />
            )}
            <motion.div
                className='menu'
                initial={{ width: 0 }}
                animate={
                    isSmallScreen
                        ? { width: isMenuOpen ? '40vw' : '0' }
                        : { width: isMenuOpen ? '60vw' : '0' }
                }
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                }}
            >
                <Links
                    menu='burger-menu'
                    onClick={() => handleToggle(setIsMenuOpen)}
                />
            </motion.div>
        </div>
    )
}

const UserInventory = ({ user }) => {
    // Destructured using nullish coalescence to return empty object if user is null or undefined
    // Prevents errors generated from attempting to access properties on a null or undefined object
    const { coin } = user ?? {}

    return (
        <div className='user-inventory'>
            <p className='coin center'>
                {coin} <img src={coinImage} alt='coin' />
            </p>
        </div>
    )
}

// This component displays the username, XP progress bar, and current XP / next level XP
// It also handles level up logic by making an API call when user XP exceeds the XP required for their current level.
const UserXP = ({ user }) => {
    const { getCurrentUser } = useGlobalContext()
    const { username, xp, level } = user ?? {}
    const userNextLevel = levels[level]

    const xpPercentage = () => {
        return `${(xp / userNextLevel) * 100}%`
    }

    const handleLevelUp = () => {
        axios
            .put('/api/profile', { level: level + 1 })
            .then(() => getCurrentUser())
    }

    useEffect(() => {
        if (xp >= userNextLevel) {
            handleLevelUp()
        }
    }, [xp, userNextLevel])

    return (
        <div className='user-xp'>
            <h2>{username}</h2>
            <div className='progressBar'>
                <div
                    className='progressBar__inner'
                    style={{ width: xpPercentage() }}
                ></div>
            </div>
            <span className='xp'>
                XP {xp} / {userNextLevel}
            </span>
        </div>
    )
}

const UserImage = ({ user }) => {
    const { image, level } = user ?? {}
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='user-image'>
            <div className='image-inner '>
                <img
                    src={image}
                    alt='user image'
                    onClick={() => handleToggle(setIsOpen)}
                />
                <p className='level box'>LVL &nbsp;{level}</p>
                <UserMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </div>
    )
}

// This component is the menu that is displayed when the user clicks on their image.
const UserMenu = ({ isOpen, setIsOpen }) => {
    const { logout } = useGlobalContext()

    const navigate = useNavigate()

    const handleLogout = () => {
        logout().then(() => {
            handleToggle(setIsOpen)
            navigate('/')
        })
    }

    return (
        isOpen && (
            <div className='user-menu box'>
                <NavLink to='/account' onClick={() => handleToggle(setIsOpen)}>
                    Account
                </NavLink>
                <a className='user-link center' onClick={() => handleLogout()}>
                    Logout <MdLogout />
                </a>
            </div>
        )
    )
}

// This component acts as the parent component for all User-related components
const UserSection = ({ user }) => {
    return (
        <div className='user'>
            <hr />
            <UserInventory user={user} />
            <UserXP user={user} />
            <UserImage user={user} />
        </div>
    )
}

// The landing prop is used to conditionally render the login NavLink on the NavBar component.
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
            <Links menu='navbar' />
            {user ? (
                <UserSection user={user} />
            ) : landing ? null : (
                <NavLink className='navbar__login box' to='/'>
                    Login
                </NavLink>
            )}

            <hr className='gold-border-bottom' />
        </div>
    )
}

export default NavBar
