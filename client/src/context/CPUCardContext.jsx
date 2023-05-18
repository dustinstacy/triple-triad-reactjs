import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react'
import { assignRandomValues } from '../utils/assignRandomValues'
import { useGlobalContext } from './GlobalContext'
import { goblin } from '../constants/opponents'
import { randomRarity } from '../utils/randomRarity'

const initialState = {
    cpu: goblin,
    cpuDeck: [],
}

const cpuCardReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CPU_OPPONENT':
            return {
                ...state,
                cpu: action.payload,
            }
        case 'SET_CPU_DECK':
            return {
                ...state,
                cpuDeck: action.payload,
            }
        default:
            return state
    }
}

const CPUCardContext = createContext(initialState)

export const CPUCardProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cpuCardReducer, initialState)
    const { allCards } = useGlobalContext()

    const getRandomCards = (deck) => {
        return deck.map((card) => {
            const rarity = randomRarity(state.cpu.level)
            const currentRarityCards = allCards.filter(
                (c) => c.rarity === rarity
            )
            const randomCard =
                currentRarityCards[
                    Math.floor(Math.random() * currentRarityCards.length)
                ]
            randomCard.user = 'cpu'
            assignRandomValues(randomCard)
            return randomCard
        })
    }

    const setCPUDeck = () => {
        const randomDeck = Array.from({ length: 15 })
        const updatedDeck = getRandomCards(randomDeck)
        dispatch({ type: 'SET_CPU_DECK', payload: updatedDeck })
    }

    useEffect(() => {
        if (allCards.length > 0 && state.cpuDeck.length === 0) setCPUDeck()
    }, [allCards, state.cpuDeck.length])

    const value = useMemo(
        () => ({
            ...state,
            setCPUDeck,
        }),
        [state.cpu, state.cpuDeck]
    )

    return (
        <CPUCardContext.Provider value={value}>
            {children}
        </CPUCardContext.Provider>
    )
}

export const useCPUCardContext = () => useContext(CPUCardContext)
