import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

import { logo } from '@assets'
import { useGlobalContext } from '@context'

import { BurgerMenu, Links, UserSection } from './components'
import './NavBar.scss'

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
