import React from 'react'

import { useToggle } from '@hooks'
import { useGlobalContext } from '@context'
import { classSet } from '@utils'

import { AvatarMenu } from './components'
import './Avatar.scss'

// levelShowing: Indicates whether the user's level should be displayed
// menu: Indicates whether the avatar has an onClick menu
// small, medium, large: Indicates the avatar's size
const Avatar = ({
    levelShowing = false,
    menu = false,
    small = false,
    medium = false,
    large = false,
}) => {
    const { user } = useGlobalContext()
    const { image, level } = user ?? {}

    const [isOpen, toggleIsOpen] = useToggle(false)

    // Dynamically set CSS classes based on props
    const avatarClasses = classSet(
        'avatar',
        'primary-border',
        menu && 'pointer',
        small && 'small',
        medium && 'medium',
        large && 'large'
    )

    return (
        <div className={avatarClasses} style={{ backgroundColor: user?.color }}>
            <img
                className='fill'
                src={image}
                alt='user image'
                onClick={menu ? () => toggleIsOpen() : null}
            />
            {levelShowing && (
                <span className='level box'>LVL &nbsp;{level}</span>
            )}
            {menu && <AvatarMenu isOpen={isOpen} toggleIsOpen={toggleIsOpen} />}
        </div>
    )
}

export default Avatar
