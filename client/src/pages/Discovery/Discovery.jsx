import React, { useEffect } from 'react'

import './Discovery.scss'
import { useGlobalContext } from '../../context/GlobalContext'

const Discovery = () => {
    const { getCurrentUser } = useGlobalContext()

    useEffect(() => {
        getCurrentUser()
    }, [])
    return <div className='discovery page'>Discovery</div>
}

export default Discovery
