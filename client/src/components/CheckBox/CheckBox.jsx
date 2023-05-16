import React from 'react'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import './CheckBox.scss'

export function CheckBox({ handleClick, selected }) {
    return (
        <div className='checkbox' onClick={handleClick}>
            {selected ? (
                <ImCheckboxChecked className='check' />
            ) : (
                <ImCheckboxUnchecked className='uncheck' />
            )}
        </div>
    )
}
