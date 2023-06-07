import React from 'react'
import { NavLink } from 'react-router-dom'

import { navlinks } from '@constants'

import './Links.scss'

// The list of links is memoized to avoid unnecessary re-rendering.
// The menu and onClick props are used to add CSS class names and customize functionality of the links.
const Links = ({ menu, onClick, user }) => {
    const publicLinks = ['/', '/rules']

    return (
        <div className={`${menu}-links`}>
            {navlinks.map((link) => (
                <NavLink
                    className={`${menu}-link center ${
                        (!user && !publicLinks.includes(link.path)) ||
                        user?.onboardingStage < 3
                            ? 'disabled'
                            : ''
                    }`}
                    key={link.name}
                    to={link.path}
                    onClick={onClick}
                >
                    {link.image}
                    <span>{link.name}</span>
                </NavLink>
            ))}
        </div>
    )
}

export default Links
