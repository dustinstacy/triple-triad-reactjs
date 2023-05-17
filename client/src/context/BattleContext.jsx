import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { useGlobalContext } from './GlobalContext'
import { useCPUCardContext } from './CPUCardContext'
import { shuffleCards, dealCards } from '../utils/shuffleAndDeal'

const BattleContext = createContext()

export const BattleProvider = ({ children }) => {
    const { getCurrentUser, userDeck } = useGlobalContext()
    const { cpuDeck } = useCPUCardContext()
    const initialDecks = {
        p1: [],
        cpu: [],
    }
    const initialHands = {
        p1: [],
        cpu: [],
    }
    const width = 3
    const initialBoard = [...new Array(width * width).fill('empty')]

    const [decks, setDecks] = useState(initialDecks)
    const [hands, setHands] = useState(initialHands)
    const [board, setBoard] = useState(initialBoard)
    const [isP1Turn, setisP1Turn] = useState(null)
    const [p1Score, setP1Score] = useState(5)
    const [cpuScore, setCpuScore] = useState(5)

    const saveStateToLocalStorage = () => {
        localStorage.setItem(
            'battleState',
            JSON.stringify({
                decks,
                hands,
                board,
                isP1Turn,
                p1Score,
                cpuScore,
            })
        )
    }

    const setupNewGame = () => {
        const p1DealtCards = []
        const cpuDealtCards = []
        shuffleCards([userDeck, cpuDeck])
        dealCards(p1DealtCards, userDeck)
        dealCards(cpuDealtCards, cpuDeck)
        setHands((prevHands) => ({ p1: p1DealtCards, cpu: cpuDealtCards }))
        setDecks((prevDecks) => ({ p1: [...userDeck], cpu: [...cpuDeck] }))
        saveStateToLocalStorage()
    }

    const restoreStateFromLocalStorage = () => {
        const savedState = localStorage.getItem('battleState')
        if (savedState) {
            const { decks, hands, board, isP1Turn, p1Score, cpuScore } =
                JSON.parse(savedState)
            setDecks(decks)
            setHands(hands)
            setBoard(board)
            setisP1Turn(isP1Turn)
            setP1Score(p1Score)
            setCpuScore(cpuScore)
        } else {
            setupNewGame()
        }
    }

    useEffect(() => {
        getCurrentUser().then(() => restoreStateFromLocalStorage())
    }, [])

    const resetContext = () => {
        setDecks(initialDecks)
        setHands(initialHands)
        setBoard(initialBoard)
        setisP1Turn(null)
        setP1Score(5)
        setCpuScore(5)
        setupNewGame()
    }

    const battleContextValue = useMemo(
        () => ({
            decks,
            setDecks,
            hands,
            setHands,
            board,
            setBoard,
            isP1Turn,
            setisP1Turn,
            p1Score,
            setP1Score,
            cpuScore,
            setCpuScore,
            resetContext,
        }),
        [decks, hands, board, isP1Turn, p1Score, cpuScore]
    )

    return (
        <BattleContext.Provider value={battleContextValue}>
            {children}
        </BattleContext.Provider>
    )
}

export const useBattleContext = () => useContext(BattleContext)
