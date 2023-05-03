import React, { useEffect } from 'react'
import { Button, AccountBar } from '../../components'
import { useGlobalContext } from '../../context/GlobalContext'
import './Home.scss'

const Home = () => {
    const { getCurrentUser } = useGlobalContext()

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <div className='home page'>
            <AccountBar />
            <div className='container'>
                <Button label='Solo' type='link' path='match' />
                <Button label='Deck' type='link' path='deck' />
                <Button label='Packs' type='link' path='packs' />
            </div>
        </div>
    )
}

export default Home
