export const removeObjectByValue = (array, value) => {
    const index = array.findIndex((obj) => obj.name === value)
    if (index !== -1) {
        array.splice(index, 1)
    }
}
