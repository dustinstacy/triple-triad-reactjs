import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

import { logo } from '@assets'
import { useGlobalContext } from '@context'

import { BurgerMenu, Links, UserSection } from './components'
import './NavBar.scss'

// Navigation Bar component that includes page links and user information
// Displays a login button based on the value of the `landing` prop
const NavBar = ({ landing }) => {
    const { user } = useGlobalContext()
    const navigate = useNavigate()

    return (
        <div className='navbar background-gradient'>
            <BurgerMenu />
            <img
                src={logo}
                alt='logo'
                className='navbar__logo'
                onClick={() => navigate('/')}
            />
            <Links menu='navbar' />
            {user ? (
                <UserSection />
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
