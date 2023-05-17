export const shuffleCards = (decks) => {
    return decks.map((cards) => {
        let i = cards.length,
            temporary,
            random
        while (i !== 0) {
            random = Math.floor(Math.random() * i)
            i--
            temporary = cards[i]
            cards[i] = cards[random]
            cards[random] = temporary
        }
        return cards
    })
}

export const dealCards = (playerDealtCards, playerDeck) => {
    const handSize = 5
    let i = 0
    do {
        playerDealtCards.push(playerDeck.shift()), i++
    } while (i < handSize)
    return playerDealtCards
}
