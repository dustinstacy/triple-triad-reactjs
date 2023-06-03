import React from 'react'

import { useGlobalContext } from '@context'

import './ChosenItem.scss'

const ChosenItem = ({ chosenItem }) => {
    const { user } = useGlobalContext()
    const { image, info, contents, name } = chosenItem || {}
    console.log(contents?.odds)

    return (
        <div className='chosen-item'>
            <div className='chosen-item-image'>
                <img src={image} alt={name} />
                <div className='owned-inventory'>
                    <span>Owned: &nbsp;</span>
                    {
                        user?.inventory.filter((item) => item.name === name)
                            .length
                    }
                </div>
            </div>
            <div className='chosen-item-info'>
                <h1 className='chosen-item-name'>{name}</h1>
                <hr />
                <p className='chosen-item-details'>{info}</p>

                <div className='chosen-item-odds'>
                    <h4>Odds:</h4>
                    {contents?.odds &&
                        Object.entries(contents?.odds).map(([key, value]) => (
                            <div key={key}>
                                <p>
                                    {key}: &nbsp;{value} %
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default ChosenItem
