export const assignRandomValues = (req) => {
	const randomIntFromInterval = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	const randomizeValues = (rarity, max) => {
		const numberOfValues = 4
		let startValues = new Array(numberOfValues)
		let sum = 0
		do {
			for (let i = 0; i < numberOfValues; i++) {
				startValues[i] = Math.random()
			}
			sum = startValues.reduce((sum, value) => sum + value, 0)
			const scale = (rarity - numberOfValues) / sum
			startValues = startValues.map((value) =>
				Math.min(max, Math.round(value * scale) + 1)
			)
			sum = startValues.reduce((sum, value) => sum + value, 0)
		} while (sum - rarity)
		const values = startValues.map((value) => {
			if (value === 10) {
				return 'A'
			}
			return value
		})
		return values
	}

	const rarity = req.body.rarity
	const maxValue = 10
	const common = randomIntFromInterval(8, 12)
	const uncommon = randomIntFromInterval(13, 17)
	const rare = randomIntFromInterval(18, 22)
	const epic = randomIntFromInterval(23, 27)
	const legendary = randomIntFromInterval(28, 32)

	if (rarity === 'Common') {
		return (req.values = randomizeValues(common, maxValue))
	} else if (rarity === 'Uncommon') {
		return (req.values = randomizeValues(uncommon, maxValue))
	} else if (rarity === 'Rare') {
		return (req.values = randomizeValues(rare, maxValue))
	} else if (rarity === 'Epic') {
		return (req.values = randomizeValues(epic, maxValue))
	} else if (rarity === 'Legendary') {
		return (req.values = randomizeValues(legendary, maxValue))
	}
}
