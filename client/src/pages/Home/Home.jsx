import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { useGlobalContext } from '@context'
import { Onboarding } from '@components'
import { classSet } from '@utils'

import './Home.scss'

const Home = () => {
    const { getCurrentUser, user } = useGlobalContext()
    const stage = user?.onboardingStage ?? {}

    const userPacks = user?.inventory.filter((item) => (item.name = 'pack'))
    const packsClasses = classSet(
        userPacks?.length && 'unopened',
        !user && 'hidden'
    )

    return (
        <>
            {stage <= 5 && <Onboarding />}

            <div className='home page start'>
                <div className='home-wrapper '>
                    <NavLink
                        to='/opponentSelect'
                        className='battle-main panel start-column'
                    >
                        <p>Test your skill</p>
                        <h1>Battle</h1>
                    </NavLink>
                    <NavLink
                        to='/collection'
                        className='collection-main panel start-column'
                    >
                        <p>Prepare for battle</p>
                        <h1>Deck</h1>
                    </NavLink>
                    <NavLink
                        to='/market'
                        className='market-main panel start-column'
                    >
                        <p>Purchase packs</p>
                        <h1>Market</h1>
                    </NavLink>
                    <div className='subs start-column'>
                        <NavLink
                            to='/packs'
                            className='packs-sub panel start-column'
                        >
                            <p className={packsClasses}>
                                Unopened Packs: <span>{userPacks?.length}</span>
                            </p>
                            <h2>Packs</h2>
                        </NavLink>
                        <NavLink
                            to='/rules'
                            className='how-to-play-sub panel start-column'
                        >
                            <h2>How To Play</h2>
                        </NavLink>
                        <div className='news-sub panel start-column disabled'>
                            <h2>
                                Coming SOOn!
                                <br />
                                News
                            </h2>
                        </div>
                        <div className='contact-sub panel start-column disabled'>
                            <h2>
                                Coming SOON!
                                <br />
                                Contact
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
