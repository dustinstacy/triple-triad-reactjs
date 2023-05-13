import React, { useEffect } from 'react'
import { Button } from '../../components'
import './Discovery.scss'
import { uniqueItemsFilter } from '../../utils/uniqueItemsFilter'
import { useGlobalContext } from '../../context/GlobalContext'

const Discovery = () => {
    const { getCurrentUser, user } = useGlobalContext()

    useEffect(() => {
        getCurrentUser()
    }, [])

    const userDiscoveries = [
        ...new Set(user?.inventory.filter((item) => item.type === 'discovery')),
    ]
    const uniqueDiscoveries = uniqueItemsFilter(userDiscoveries)

    return (
        <div className='discovery page center'>
            <div className='panel center'>
                <div className='panel-header'>
                    <h1>ChOOse a DiScovery Kit</h1>
                    <hr />
                </div>
                <div className='user-discoveries center'>
                    {uniqueDiscoveries?.map((discovery) => {
                        return (
                            <img
                                key={discovery.name}
                                src={discovery.image}
                                alt={discovery.name}
                            />
                        )
                    })}
                </div>
                <div className='panel-footer center'>
                    <Button label='Make DiScoVery' />
                </div>
            </div>
        </div>
    )
}

export default Discovery
