import React from 'react'
import { Card, Cell } from '../../../../components'
import { Score } from '../../components'
import turnArrow from './images/turnArrow.png'

import './Board.scss'

const Board = ({ playerOne, playerTwo, battleState, placeCard }) => {
    const { board, isP1Turn } = battleState

    return (
        <div className='board'>
            <div className='column center'>
                <Score player={playerTwo} />
                <Score player={playerOne} />
            </div>
            <div className='grid center'>
                {board.map((contents, i) =>
                    contents === 'empty' ? (
                        <Cell
                            key={i}
                            id={i}
                            handleClick={(e) => placeCard(e)}
                        />
                    ) : (
                        <div key={i}>
                            <Cell id={i}>
                                <div className='card-wrapper'>
                                    <Card
                                        card={contents}
                                        onClick={null}
                                        isShowing
                                    />
                                </div>
                            </Cell>
                        </div>
                    )
                )}
            </div>
            <div className='column'>
                <div className='p2 round-score'>{playerTwo.roundsWon}</div>
                <img
                    className={`turn-arrow ${isP1Turn ? 'down' : 'up'}`}
                    src={turnArrow}
                    alt='turn arrow'
                />
                <div className='p1 round-score'>{playerOne.roundsWon}</div>
            </div>
        </div>
    )
}

export default Board
