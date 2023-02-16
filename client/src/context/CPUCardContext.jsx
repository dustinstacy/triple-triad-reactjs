import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { assignRandomValues } from '../../../utils/assignRandomValues'
import { useGlobalContext } from './GlobalContext'

const initialState = {
	cpuOpponent: null,
	cpuDeck: [],
}

const cpuCardReducer = (state, action) => {
	switch (action.type) {
		case 'SET_CPU_OPPONENT':
			return {
				...state,
				cpuOpponent: action.payload,
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
	const [state, dispacth] = useReducer(cpuCardReducer, initialState)
	const { allCards } = useGlobalContext()

	const randomRarity = () => {
		const num = Math.random()
		if (num < 0.5) return 'Common'
		else if (num <= 0.8) return 'Uncommon'
		else return 'Rare'
	}

	const getRandomCards = (deck) => {
		deck.forEach((_, i) => {
			const rarity = randomRarity()
			const currentRarityCards = allCards.filter(
				(card) => card.rarity === rarity
			)
			const randomCard =
				currentRarityCards[
					Math.floor(Math.random() * currentRarityCards.length)
				]
			deck.splice(i, 1, randomCard)
		})
	}

	const setCPUOpponent = () => {
		const randomDeck = [...Array(35)]

		if (state.cpuOpponent === null) {
			getRandomCards(randomDeck)

			randomDeck.forEach((card) => {
				assignRandomValues(card)
			})

			dispacth({ type: 'SET_CPU_DECK', payload: randomDeck })
		}
	}

	useEffect(() => {
		if (allCards.length > 0 && state.cpuDeck.length === 0) setCPUOpponent()
	}, [allCards])

	const value = {
		...state,
		setCPUOpponent,
	}

	return (
		<CPUCardContext.Provider value={value}>{children}</CPUCardContext.Provider>
	)
}

export const useCPUCardContext = () => useContext(CPUCardContext)
