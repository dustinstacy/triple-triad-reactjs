import React, { useEffect } from 'react'
import { Button } from '../../components'
import { useGlobalContext } from '../../context/GlobalContext'
import './Home.scss'

const Home = () => {
    const { getCurrentUser } = useGlobalContext()

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <div className='home page'>
            <div className='container center'>
                <Button label='Battle' type='link' path='match' />
                <Button label='Collection' type='link' path='collection' />
                <Button label='Packs' type='link' path='packs' />
            </div>
        </div>
    )
}

export default Home
