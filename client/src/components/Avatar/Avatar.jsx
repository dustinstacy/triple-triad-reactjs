import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContext'
import { handleToggle } from '../../utils/handleToggle'
import { MdLogout } from 'react-icons/md'

import './Avatar.scss'

// This component is the menu that is displayed when the user clicks on their image.
const AvatarMenu = ({ isOpen, setIsOpen }) => {
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
            <div className='avatar-menu box'>
                <NavLink to='/account' onClick={() => handleToggle(setIsOpen)}>
                    Account
                </NavLink>
                <a
                    className='avatar-link center'
                    onClick={() => handleLogout()}
                >
                    Logout <MdLogout />
                </a>
            </div>
        )
    )
}

const Avatar = ({ user, menuAvailable }) => {
    const { image, level } = user ?? {}
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='avatar-image'>
            <div className='image-inner '>
                <img
                    src={image}
                    alt='user image'
                    onClick={
                        menuAvailable ? () => handleToggle(setIsOpen) : null
                    }
                />
                <p className='level box'>LVL &nbsp;{level}</p>
                <AvatarMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </div>
    )
}

export default Avatar
