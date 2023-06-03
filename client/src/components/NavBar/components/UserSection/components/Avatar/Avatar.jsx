import React, { useState } from 'react'

import { handleToggle } from '../../../../../../utils/handleToggle'

import { AvatarMenu } from './components'
import './Avatar.scss'

const Avatar = ({ user, navbar }) => {
    const { image, level } = user ?? {}
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='avatar-container'>
            <div className='inner-container '>
                <img
                    src={image}
                    alt='user image'
                    onClick={navbar ? () => handleToggle(setIsOpen) : null}
                />
                {navbar && (
                    <>
                        <p className='level box'>LVL &nbsp;{level}</p>
                        <AvatarMenu isOpen={isOpen} setIsOpen={setIsOpen} />
                    </>
                )}
            </div>
        </div>
    )
}

export default Avatar
