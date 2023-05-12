import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'

import './Market.scss'

const Market = () => {
    const { getCurrentUser } = useGlobalContext()

    useEffect(() => {
        getCurrentUser()
    }, [])
    return (
        <div className='market page center'>
            <div className='market-menu box'>
                <div className='menu-header'>
                    <h1>MaRKet</h1>
                    <hr />
                </div>
                <div className='menu-body'>
                    <div className='menu-items'></div>
                    <div className='chosen-item'></div>
                </div>
            </div>
        </div>
    )
}

export default Market
