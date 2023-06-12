// Combines multiple class names into a single string
// and filters out any falsy values.
export const classSet = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

export const createCardData = (card) => {
    return {
        name: card.name,
        number: card.number,
        image: card.image,
        rarity: card.rarity,
        empower: card.empower,
        weaken: card.weaken,
        values: card.values,
    }
}

// Calculate the sum of all card values within an array
export const calculateDeckPower = (array) => {
    const power = array.reduce(
        (total, card) =>
            total +
            card.values.reduce(
                (sum, current) => parseInt(sum) + parseInt(current),
                0
            ),
        0
    )

    return power
}

// array: The array from which the object will be removed
// property: The property name used for comparison to find the object
// value: The value of the property to match and remove the corresponding object
export const removeObjectByValue = (array, property, value) => {
    const index = array.findIndex((obj) => obj[property] === value)

    if (index !== -1) {
        array.splice(index, 1)
    }
}

export const uniqueItemsFilter = (array) => {
    return array.reduce((uniqueItems, currentItem) => {
        const foundItem = uniqueItems.find(
            (item) =>
                item.name === currentItem.name && item.type === currentItem.type
        )
        if (!foundItem) {
            uniqueItems.push(currentItem)
        }
        return uniqueItems
    }, [])
}
