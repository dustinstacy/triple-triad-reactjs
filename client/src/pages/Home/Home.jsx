import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'

import { Button, Footer } from '../../components'
import './Home.scss'

const Home = () => {
    const { getCurrentUser } = useGlobalContext()

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <div className='home page'>
            <section className='battle container right'>
                <div className='box'>
                    <Button label='Battle' type='link' path='match' />
                </div>
            </section>
            <section className='collection container left'>
                <div className='box'>
                    <Button label='COllectiON' type='link' path='collection' />
                </div>
            </section>
            <section className='store container right'>
                <div className='box'>
                    <Button label='MarKet' type='link' path='packs' />
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Home
