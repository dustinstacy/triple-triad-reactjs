import React, { useEffect, useState } from 'react'
import { MdOutlineClose, MdMenu } from 'react-icons/md'
import useMediaQuery from '@mui/material/useMediaQuery'
import { motion } from 'framer-motion'

import { handleToggle } from '../../../../utils/handleToggle'

import { Links } from '..'
import './BurgerMenu.scss'

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

export default BurgerMenu
