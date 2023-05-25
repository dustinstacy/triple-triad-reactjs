// Generates random values for a card based on it's rarity
export const assignRandomValues = (card) => {
    const rarity = card.rarity
    let total, maxValue

    // Helper function to generate a random integer within a specified range
    const randomIntFromInterval = (min, max) => {
        // Addition of 1 to the difference in max - min ensures a return value
        // in the inclusive range
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    // Set the total of all values and max single value based on the card's rarity
    if (rarity === 'Common') {
        total = randomIntFromInterval(6, 10)
        maxValue = 5
    } else if (rarity === 'Uncommon') {
        total = randomIntFromInterval(10, 14)
        maxValue = 6
    } else if (rarity === 'Rare') {
        total = randomIntFromInterval(14, 18)
        maxValue = 7
    } else if (rarity === 'Epic') {
        total = randomIntFromInterval(18, 24)
        maxValue = 8
    } else if (rarity === 'Legendary') {
        total = randomIntFromInterval(24, 30)
        maxValue = 9
    }

    // Generate random values based on total and max value determined by rarity
    const randomizeValues = (total, max) => {
        const values = []
        // The number of values for each card is hardcoded to 4
        for (let i = 0; i < 4; i++) {
            // Set value equal to number randomly generated between 1 and the
            // remaining total. Use Math.min() to cap the returned number at
            // the max allowed value.
            const value = Math.min(max, randomIntFromInterval(1, total))
            values.push(value)
            // Decrement the total value by the randomly generated value to ensure
            // the total is not exceeded.
            total -= value
        }
        return values
    }

    // Assign randomly generated values to the card object's 'values' property
    return (card.values = randomizeValues(total, maxValue))
}

// array: Empty array equal in length to desired amount of cards
// odds: Object containing rarity names as keys and their corresponding
// probabilities in float value (i.e. 83.1 = 83.1%)
// cardSet: Array of cards from which random cards will be selected
export const getRandomCards = (array, odds, cardSet) => {
    for (let i = 0; i < array.length; i++) {
        // Get random rarity based on odds
        const rarity = randomRarity(odds)
        // Filter card set to obtain cards with current rarity
        const currentRarityCards = cardSet.filter(
            (card) => card.rarity === rarity
        )
        // Selected a random card from the filtered card set
        const randomCard =
            currentRarityCards[
                Math.floor(Math.random() * currentRarityCards.length)
            ]

        array[i] = randomCard
    }
}

// odds: See getRandomCards function
export const randomRarity = (odds) => {
    // Generate a random number between 0(inclusive) and 1(exclusive)
    const num = Math.random()
    // Variable to track total odds percentage
    let totalPercentage = 0
    // Calculate the total odds percentage from the object values
    // Suggested total = 100.0
    for (const rarity in odds) {
        totalPercentage += odds[rarity]
    }
    // Variable to track the cumulative percentage
    let cumulativePercentage = 0
    // Iterate over each key (rarity) and its percentage
    for (const rarity in odds) {
        // Calculate the normalized percentage
        // normalized percentage = number between 0 and 1
        const percentage = odds[rarity] / totalPercentage
        // Accumulate the normalized percentage
        cumulativePercentage += percentage
        // Check if the generated random number falls within the
        // accumulated percentage
        // return the selected rarity
        if (num < cumulativePercentage) {
            return rarity
        }
    }
}
