import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { MdOutlineClose, MdMenu } from 'react-icons/md'

import { motion } from 'framer-motion'
import useMediaQuery from '@mui/material/useMediaQuery'

import { useGlobalContext } from '../../context/GlobalContext'
import { handleToggle } from '../../utils/handleToggle'

import { ExperienceBar, Avatar } from '../../components'
import { logo } from '../../assets/logos'
import { coinImage } from '../../assets/icons'
import { navlinks } from '../../constants/navlinks'

import './NavBar.scss'

// The list of links is memoized to avoid unnecessary re-rendering.
// The menu and onClick props are used to add CSS class names and customize functionality of the links.
const Links = ({ menu, onClick, user }) => {
    return (
        <div className={`${menu}-links`}>
            {navlinks.map((link) => (
                <NavLink
                    className={`${menu}-link center ${
                        !user && link.path !== '/' ? 'disabled' : ''
                    }`}
                    key={link.name}
                    to={link.path}
                    onClick={onClick}
                >
                    {link.image}
                    <p>{link.name}</p>
                </NavLink>
            ))}
        </div>
    )
}

const BurgerMenu = ({ user }) => {
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
                    user={user}
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

// This component acts as the parent component for all User-related components
const UserSection = ({ user }) => {
    const { username } = user ?? {}
    return (
        <div className='user'>
            <hr />
            <UserInventory user={user} />
            <div className='user-info'>
                <h2>{username}</h2>
                <ExperienceBar user={user} />
            </div>

            <Avatar user={user} navbar={true} />
        </div>
    )
}

// The landing prop is used to conditionally render the login NavLink on the NavBar component.
const NavBar = ({ landing }) => {
    const { user } = useGlobalContext()
    const navigate = useNavigate()

    return (
        <div className='navbar'>
            <BurgerMenu user={user} />
            <img
                src={logo}
                alt='logo'
                className='navbar__logo'
                onClick={() => navigate('/')}
            />
            <Links menu='navbar' user={user} />
            {user ? (
                <UserSection user={user} />
            ) : landing ? null : (
                <NavLink className='navbar__login box' to='/login'>
                    Login
                </NavLink>
            )}

            <hr className='gold-border' />
        </div>
    )
}

export default NavBar
