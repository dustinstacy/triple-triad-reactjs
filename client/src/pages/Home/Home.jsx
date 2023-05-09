import React, { useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useGlobalContext } from '../../context/GlobalContext'

import { Button, Footer } from '../../components'
import './Home.scss'

const Home = () => {
    const { getCurrentUser } = useGlobalContext()
    const isLargeScreen = useMediaQuery('(min-width:1200px)')

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <div className='home page'>
            <div className={`section gray ${isLargeScreen ? 'right' : ''}`}>
                <div className='box'>
                    <Button label='Battle' type='link' path='match' />
                </div>
            </div>
            <div className={`section ${isLargeScreen ? 'left' : ''}`}>
                <div className='box'>
                    <Button label='COllectiON' type='link' path='collection' />
                </div>
            </div>
            <div className={`section gray ${isLargeScreen ? 'right' : ''}`}>
                <div className='box'>
                    <Button label='MarKet' type='link' path='packs' />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
