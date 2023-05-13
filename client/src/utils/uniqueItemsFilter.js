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
