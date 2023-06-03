import React from 'react'

import { useGlobalContext } from '@context'

import './ChosenItem.scss'

const ChosenItem = ({ chosenItem }) => {
    const { user } = useGlobalContext()

    return (
        <div className='chosen-item'>
            <div className='chosen-item-image'>
                <img src={chosenItem.image} alt={chosenItem.name} />
                <div className='owned-inventory'>
                    <span>Owned: &nbsp;</span>
                    {
                        user?.inventory.filter(
                            (item) => item.name === chosenItem.name
                        ).length
                    }
                </div>
            </div>
            <div className='chosen-item-info'>
                <h1 className='chosen-item-name'>{chosenItem.name}</h1>
                <hr />
                <p className='chosen-item-details'>{chosenItem.info}</p>
            </div>
        </div>
    )
}

export default ChosenItem
