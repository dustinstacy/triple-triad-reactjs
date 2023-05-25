// Generates random values for a card based on it's rarity
export const assignRandomValues = (card) => {
    const rarity = card.rarity
    let totalOfValues, maxValue

    // Helper function to generate a random integer within a specified range
    const randomIntFromInterval = (min, max) => {
        // + 1 ensures a returned integer in the inclusive range
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    // totalOfValues: Maximum total of all 4 card values
    // maxValue: Maximum value of any single value
    if (rarity === 'Common') {
        totalOfValues = randomIntFromInterval(6, 10)
        maxValue = 5
    } else if (rarity === 'Uncommon') {
        totalOfValues = randomIntFromInterval(10, 14)
        maxValue = 6
    } else if (rarity === 'Rare') {
        totalOfValues = randomIntFromInterval(14, 18)
        maxValue = 7
    } else if (rarity === 'Epic') {
        totalOfValues = randomIntFromInterval(18, 24)
        maxValue = 8
    } else if (rarity === 'Legendary') {
        totalOfValues = randomIntFromInterval(24, 30)
        maxValue = 9
    }

    // Generate random values based on maximum total of all 4 values
    // and max single value determined by rarity
    const randomizeValues = (totalOfValues, maxValue) => {
        // Create an array to store the generated values
        let values = [...new Array(4)]
        let sum = 0

        do {
            // Generate 4 random numbers between 0 and 1 for each value
            for (let i = 0; i < values.length; i++) {
                values[i] = Math.random()
            }
            // Get the sum of all 4 randomly generated numbers
            sum = values.reduce((sum, value) => sum + value, 0)
            // Crate scale factor to determine how much each value needs to
            // be adjusted to reach desired sum
            const scale = totalOfValues / sum
            // Scale each value proportionally without exceeding the maxValue
            values = values.map((value) =>
                Math.min(maxValue, Math.round(value * scale))
            )
            // Recalculate the sum to ensure totalOfValues is met
            sum = values.reduce((sum, value) => sum + value, 0)
        } while (
            // exit loop when sum - totalOfValues is equal to 0
            sum - totalOfValues
        )

        return values
    }

    // Assign randomly generated values to the card object's 'values' property
    return (card.values = randomizeValues(totalOfValues, maxValue))
}

// nCards: Number of cards to return
// odds: Object containing rarity names as keys and their corresponding
// probabilities in float value (i.e. 83.1 = 83.1%)
// cardSet: Array of cards from which random cards will be selected
export const getRandomCards = (nCards, odds, cardSet) => {
    const randomCardsArray = [...new Array(nCards)]
    for (let i = 0; i < randomCardsArray.length; i++) {
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

        randomCardsArray[i] = randomCard
    }
    return randomCardsArray
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
