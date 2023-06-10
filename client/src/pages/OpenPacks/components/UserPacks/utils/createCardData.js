const createCardData = (card) => {
    return {
        name: card.name,
        number: card.number,
        image: card.image,
        rarity: card.rarity,
        empower: card.empower,
        weaken: card.weaken,
        values: card.values,
    }
}

export default createCardData
