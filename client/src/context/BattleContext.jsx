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
import { useNavigate } from 'react-router-dom'

const BattleContext = createContext()

export const BattleProvider = ({ children }) => {
    const { getCurrentUser, userDeck } = useGlobalContext()
    const { cpuDeck } = useCPUCardContext()

    const width = 3

    const initialDecks = {
        p1: [],
        cpu: [],
    }
    const initialHands = {
        p1: [],
        cpu: [],
    }
    const initialBoard = [...new Array(width * width).fill('empty')]

    const [decks, setDecks] = useState(initialDecks)
    const [hands, setHands] = useState(initialHands)
    const [board, setBoard] = useState(initialBoard)
    const [childState, setChildState] = useState(false)

    useEffect(() => {
        getCurrentUser().then(() => restoreStateFromLocalStorage())
    }, [])

    useEffect(() => {
        setChildState(false)
        setDecks((prevDecks) => ({
            p1: [...userDeck],
            cpu: [...cpuDeck],
        }))
        if (userDeck.length === 15 && cpuDeck.length === 15) {
            setChildState(true)
        }
    }, [userDeck, cpuDeck])

    const setupMatch = () => {
        const p1DealtCards = []
        const cpuDealtCards = []
        shuffleCards([decks.p1, decks.cpu])
        dealCards(p1DealtCards, decks.p1)
        dealCards(cpuDealtCards, decks.cpu)
        setHands((prevHands) => ({
            p1: p1DealtCards,
            cpu: cpuDealtCards,
        }))
        console.log(decks, hands, board)
    }

    // useEffect(() => {
    //     hands.p1.length === 5 && hands.cpu.length === 5 && navigate('/match')
    // }, [hands])

    const saveStateToLocalStorage = () => {
        localStorage.setItem(
            'battleState',
            JSON.stringify({
                decks,
                hands,
                board,
            })
        )
    }

    const restoreStateFromLocalStorage = () => {
        const savedState = localStorage.getItem('battleState')
        if (savedState) {
            const { decks, hands, board } = JSON.parse(savedState)
            setDecks(decks)
            setHands(hands)
            setBoard(board)
        }
    }

    const resetContext = () => {
        setDecks(initialDecks)
        setHands(initialHands)
        setBoard(initialBoard)
        setisP1Turn(null)
        setP1Score(5)
        setCpuScore(5)
        localStorage.removeItem('battleState')
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
            resetContext,
            setupMatch,
            restoreStateFromLocalStorage,
        }),
        [decks, hands, board, childState]
    )

    return (
        <BattleContext.Provider value={battleContextValue}>
            {children}
        </BattleContext.Provider>
    )
}

export const useBattleContext = () => useContext(BattleContext)
