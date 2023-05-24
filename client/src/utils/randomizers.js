export const assignRandomValues = (card) => {
    const rarity = card.rarity
    const maxValue = 9
    let total

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const randomizeValues = (total, max) => {
        const numberOfValues = 4
        let startValues = new Array(numberOfValues)
        let sum = 0
        do {
            for (let i = 0; i < numberOfValues; i++) {
                startValues[i] = Math.random()
            }
            sum = startValues.reduce((sum, value) => sum + value, 0)
            const scale = (total - numberOfValues) / sum
            startValues = startValues.map((value) =>
                Math.min(max, Math.round(value * scale) + 1)
            )
            sum = startValues.reduce((sum, value) => sum + value, 0)
        } while (sum - total)
        const values = startValues.map((value) => {
            return String(value)
        })
        return values
    }

    if (rarity === 'Common') {
        total = randomIntFromInterval(8, 12)
    } else if (rarity === 'Uncommon') {
        total = randomIntFromInterval(13, 17)
    } else if (rarity === 'Rare') {
        total = randomIntFromInterval(18, 22)
    } else if (rarity === 'Epic') {
        total = randomIntFromInterval(23, 27)
    } else if (rarity === 'Legendary') {
        total = randomIntFromInterval(28, 32)
    }

    return (card.values = randomizeValues(total, maxValue))
}

// odds: Object containing rarity names as keys and their corresponding
//probabilities as values in decimal point format i.e. (0.9 = 90%)
export const randomRarity = (odds) => {
    // Generate a random number between 0(inclusive) and 1(exclusive)
    const num = Math.random()

    // Variable to track cumulative odds
    let totalOdds = 0

    // Iterate over each key (rarity) in the odds object
    for (const rarity in odds) {
        // Accumulate odds during each iteration to check if threshold is met
        totalOdds += odds[rarity]
        // If random generated number falls within the accumulated odds,
        // return the selected rarity
        if (num < totalOdds) {
            return rarity
        }
    }

    // If odds not totaling to 1 are entered (error), return default of 'Common'
    return 'Common'
}

export const getRandomCards = (array, odds, cardSet) => {
    array.forEach((_, i) => {
        const rarity = randomRarity(odds)
        const currentRarityCards = cardSet.filter(
            (card) => card.rarity === rarity
        )
        const randomCard =
            currentRarityCards[
                Math.floor(Math.random() * currentRarityCards.length)
            ]
        array.splice(i, 1, randomCard)
    })
}
