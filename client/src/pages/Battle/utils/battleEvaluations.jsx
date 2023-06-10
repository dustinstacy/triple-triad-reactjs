// Process integer evaluations between opposing cards that are touching
// to determine outcome
export const processStandardBattles = (index, card, battleState) => {
    const { board } = battleState
    const { color, values } = card
    const up = board[index - 3]
    const right = board[index + 1]
    const left = board[index - 1]
    const down = board[index + 3]
    const leftColumn = [0, 3, 6]
    const rightColumn = [2, 5, 8]

    if (up?._id) {
        if (up.values[2] < values[0]) {
            up.color = color
        }
    }
    if (!leftColumn.includes(index) && left?._id) {
        if (left.values[1] < values[3]) {
            left.color = color
        }
    }
    if (!rightColumn.includes(index) && right?._id) {
        if (right.values[3] < values[1]) {
            right.color = color
        }
    }
    if (down?._id) {
        if (down.values[0] < values[2]) {
            down.color = color
        }
    }
}
