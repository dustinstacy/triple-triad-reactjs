import React from 'react'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import './CheckBox.scss'

const CheckBox = ({ handleClick, selected }) => {
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

export default CheckBox
