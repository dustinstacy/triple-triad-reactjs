export const assignRandomValues = (card) => {
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
			if (value === 10) {
				return 'A'
			}
			return String(value)
		})
		return values
	}

	const rarity = card.rarity
	const maxValue = 10
	let total

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
