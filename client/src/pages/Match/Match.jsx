import React, { useEffect, useState } from 'react'
import { Card, Cell } from '../../components'
import './Match.scss'
import { useBattleContext } from '../../context/BattleContext'
import { useGlobalContext } from '../../context/GlobalContext'
import { BiArrowFromBottom, BiArrowFromTop } from 'react-icons/bi'

const Score = ({ playerScore }) => (
    <div className='column'>
        <span className='match__score'>{playerScore} </span>
    </div>
)

const Board = ({ board, setBoard, cardSelected, hands }) => {
    const placeCard = (e) => {
        const index = parseInt(e.target.id)
        if (cardSelected) {
            console.log(board)
            console.log(cardSelected)
            const newBoard = board
            newBoard.splice(index, 1, cardSelected)
            console.log(newBoard)
            setBoard(newBoard)
            console.log(board)
        }
    }

    return (
        <div className='board'>
            <div className='grid center'>
                {board?.map((contents, i) =>
                    contents === 'empty' ? (
                        <Cell
                            key={i}
                            id={i}
                            handleClick={(e) => placeCard(e)}
                        />
                    ) : (
                        <Card
                            key={i}
                            card={contents}
                            owner={contents.user}
                            isShowing
                        />
                    )
                )}
            </div>
        </div>
    )
}

const Hand = ({ playerHand, cardSelected, setCardSelected, user }) => {
    const [cardsRaised, setCardsRaised] = useState(false)

    const selectCard = (card) => {
        if (card === cardSelected) {
            setCardSelected(null)
        } else {
            setCardSelected(card)
        }
    }

    const raiseCards = () => {
        setCardsRaised((current) => !current)
    }

    return (
        <div
            className={`${
                playerHand[0]?.user === user?._id ? 'player' : 'cpu'
            } ${cardsRaised ? 'raised' : ''}`}
        >
            {playerHand[0]?.user === user?._id &&
                (cardsRaised ? (
                    <BiArrowFromTop
                        className='down-arrow'
                        onClick={() => raiseCards()}
                    />
                ) : (
                    <BiArrowFromBottom
                        className='up-arrow'
                        onClick={() => raiseCards()}
                    />
                ))}
            {playerHand?.map((card, index) => (
                <Card
                    key={card?._id + index}
                    card={card}
                    isShowing={playerHand[0]?.user !== 'cpu' ?? false}
                    isSelected={cardSelected?._id === card?._id}
                    handleClick={() => selectCard(card)}
                />
            ))}
        </div>
    )
}

const Match = () => {
    const {
        decks,
        setDecks,
        hands,
        setHands,
        board,
        setBoard,
        restoreStateFromLocalStorage,
    } = useBattleContext()
    const { getCurrentUser, user } = useGlobalContext()

    const [cardSelected, setCardSelected] = useState(null)

    return (
        <div className='match page'>
            <div className='table'>
                <Hand
                    playerHand={hands.cpu}
                    cardSelected={cardSelected}
                    setCardSelected={setCardSelected}
                    user={user}
                />
                <Board
                    board={board}
                    setBoard={setBoard}
                    cardSelected={cardSelected}
                    hands={hands}
                />
                <Hand
                    playerHand={hands.p1}
                    cardSelected={cardSelected}
                    setCardSelected={setCardSelected}
                    user={user}
                />
            </div>
        </div>
    )
}

export default Match
