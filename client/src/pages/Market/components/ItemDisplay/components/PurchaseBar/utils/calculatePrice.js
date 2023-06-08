// Calulate purchase price based on item quantity and applicable discount
const calculatePrice = (item, quantity, discount) => {
    let totalPrice = item.price * quantity
    if (quantity > 1) {
        totalPrice *= (100 - parseFloat(discount)) / 100
    }
    return totalPrice
}

export default calculatePrice
