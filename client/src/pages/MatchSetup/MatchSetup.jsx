import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { useCPUCardContext } from '../../context/CPUCardContext'
import { Button } from '../../components'
import { rank1 } from '../../assets/ranks'
import './MatchSetup.scss'

const MatchSetup = () => {
    const { cpu, cpuDeck } = useCPUCardContext()
    const { user, userDeck, getCurrentUser } = useGlobalContext()

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <div className='setup page'>
            <div className='container'>
                <div className='player box'>
                    <div className='player__info'>
                        <img src={user?.image} alt='player image' />
                        <h2>{user?.username}</h2>
                    </div>
                    <div className='player__stats'>
                        <p>Deck Strength:</p>
                        <span>
                            {userDeck?.reduce(
                                (total, card) =>
                                    total +
                                    card.values.reduce(
                                        (sum, current) =>
                                            parseInt(sum) +
                                            parseInt(
                                                String(
                                                    current.replace(/A/g, 10)
                                                )
                                            ),
                                        0
                                    ),
                                0
                            )}
                        </span>
                    </div>
                    <div className='player__rank'>
                        <img src={rank1} alt='rank6' />
                    </div>
                </div>

                <h1 className='versus'>VS.</h1>

                <div className='player box'>
                    <div className='player__info'>
                        <img src={cpu?.image} alt='player image' />
                        <h2>{cpu?.name}</h2>
                    </div>

                    <div className='player__stats'>
                        <p>Deck Strength:</p>
                        <span>
                            {cpuDeck?.reduce(
                                (total, card) =>
                                    total +
                                    card.values.reduce(
                                        (sum, current) =>
                                            parseInt(sum) +
                                            parseInt(current.replace(/A/g, 10)),
                                        0
                                    ),
                                0
                            )}
                        </span>
                    </div>
                    <div className='player__rank'>
                        <img src={rank1} alt='rank1' />
                    </div>
                </div>

                <Button label='Start Match' type='link' path='match' />
            </div>
        </div>
    )
}

export default MatchSetup
