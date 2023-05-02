import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components'
import { useGlobalContext } from '../../context/GlobalContext'
import './Home.scss'

const Home = () => {
    const navigate = useNavigate()
    const { user, getCurrentUser } = useGlobalContext()

    useEffect(() => {
        getCurrentUser()
    }, [])

    useEffect(() => {
        if (user?.firstDeck === false) {
            navigate('/firstDeck')
        } else {
            navigate('/home')
        }
    }, [user])

    return (
        <div className='home page'>
            <div className='container'>
                <Button label='Solo' type='link' path='match' />
                <Button label='Deck' type='link' path='deck' />
                <Button label='Packs' type='link' path='packs' />
            </div>
        </div>
    )
}

export default Home
