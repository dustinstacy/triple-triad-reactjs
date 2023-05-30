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

export const dealCards = (playerDeck, playerHand) => {
    const handSize = 5
    let i = 0
    do {
        playerHand.push(playerDeck.shift()), i++
    } while (i < handSize)
}
