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
