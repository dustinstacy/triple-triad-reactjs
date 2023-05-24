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

export const randomRarity = (chance) => {
    const num = Math.random()

    if (chance === 'common') {
        if (num < 0.9) return 'Common'
        else return 'Uncommon'
    }

    if (chance === 'uncommon') {
        if (num < 0.5) return 'Common'
        else if (num <= 0.9) return 'Uncommon'
        else return 'Rare'
    }

    if (chance === 'rare') {
        if (num <= 0.5) return 'Uncommon'
        else if (num <= 0.9) return 'Rare'
        else return 'Epic'
    }
}

export const getRandomCards = (array, chance, allCards) => {
    array.forEach((_, i) => {
        const rarity = randomRarity(chance)
        const currentRarityCards = allCards.filter(
            (card) => card.rarity === rarity
        )
        const randomCard =
            currentRarityCards[
                Math.floor(Math.random() * currentRarityCards.length)
            ]
        array.splice(i, 1, randomCard)
    })
}
