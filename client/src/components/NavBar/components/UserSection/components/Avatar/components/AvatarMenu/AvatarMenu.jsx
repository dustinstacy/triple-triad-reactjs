import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { MdLogout } from 'react-icons/md'

import { useGlobalContext } from '@context'
import { handleToggle } from '../../../../../../../../utils/handleToggle'

import './AvatarMenu.scss'

// This component is the menu that is displayed when the user clicks on their image.
const AvatarMenu = ({ isOpen, setIsOpen }) => {
    const { logout } = useGlobalContext()

    const navigate = useNavigate()

    const handleLogout = () => {
        logout().then(() => {
            handleToggle(setIsOpen)
            navigate('/login')
        })
    }

    return (
        isOpen && (
            <div className='avatar-menu box'>
                <NavLink to='/account' onClick={() => handleToggle(setIsOpen)}>
                    Account
                </NavLink>
                <a
                    className='avatar-menu-link center'
                    onClick={() => handleLogout()}
                >
                    Logout <MdLogout />
                </a>
            </div>
        )
    )
}

export default AvatarMenu
