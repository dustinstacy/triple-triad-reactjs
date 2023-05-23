import React, { useState, useEffect } from 'react'
import { AuthForm, NavBar } from '../../components'
import { logo } from '../../assets/logos'
import './Landing.scss'
import { useGlobalContext } from '../../context/GlobalContext'
import { useNavigate } from 'react-router-dom'

const Landing = ({ register }) => {
    const { user } = useGlobalContext()
    const navigate = useNavigate()
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    })

    const handleResize = () => {
        setDimensions({
            height: window.innerHeight,
            width: window.innerWidth,
        })
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize, false)
        if (user) navigate('/')
    }, [])

    return (
        <div className='landing page center'>
            <NavBar landing />
            <div className='auth box'>
                <img
                    className={`${register ? 'logo-register' : 'logo'}`}
                    src={logo}
                    alt='logo'
                />
                <AuthForm register={register} />
            </div>
            {dimensions.width > 1200 &&
            dimensions.height !== window.screen.availHeight ? (
                <div className='tip__fullscreen'>
                    *Press F11 for fullscreen experience.
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default Landing
