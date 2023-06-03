import React from 'react'

import './QuantitySelector.scss'

const QuantitySelector = ({
    quantityOptions,
    chosenQuantity,
    setChosenQuantity,
}) => {
    const handleQuantityChange = (quantity) => {
        setChosenQuantity(quantity)
    }

    return (
        <div className='quantity-selector'>
            <h2>ChOOse Quantity :</h2>
            <div className='quantity-buttons'>
                {quantityOptions?.map((quantity) => (
                    <button
                        key={quantity.amount}
                        onClick={() => handleQuantityChange(quantity)}
                        className={`quantity-button ${
                            chosenQuantity.amount === quantity.amount
                                ? 'chosen'
                                : ''
                        }`}
                    >
                        {quantity.amount}
                    </button>
                ))}
            </div>

            <div className='discount'>
                {chosenQuantity.discount !== '0' &&
                    chosenQuantity.discount + ' Discount'}
            </div>
        </div>
    )
}

export default QuantitySelector
