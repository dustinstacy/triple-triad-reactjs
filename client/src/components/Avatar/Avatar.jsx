import React from 'react'

import { useToggle } from '@hooks'
import { useGlobalContext } from '@context'
import { classSet } from '@utils/classSet'

import { AvatarMenu } from './components'
import './Avatar.scss'

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

    const avatarClasses = classSet(
        'avatar',
        menu && 'pointer',
        small && 'small',
        medium && 'medium',
        large && 'large'
    )

    return (
        <div className={avatarClasses} style={{ backgroundColor: user?.color }}>
            <img
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
