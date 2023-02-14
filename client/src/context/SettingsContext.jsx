import React, { createContext, useContext } from 'react'

const initialState = {
	rounds: 1,
	elements: false,
	same: false,
	chain: false,
	defense: false,
	keeper: false,
	sum: false,
	suddenDeath: false,
	boardSize: '3x3',
}

const settingsReducer = (state, action) => {
	switch (action.type) {
		case 'SET_ROUNDS':
			return {
				...state,
				user: action.payload,
				fetchingUser: false,
			}
		case 'SET_ELEMENTS':
			return {
				...state,
				user: null,
				fetchingUser: false,
				userCards: [],
			}
		case 'SET_SAME':
			return {
				...state,
				allCards: action.payload,
			}
		default:
			return state
	}
}

const SettingsContext = createContext(initialState)

export const SettingsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(settingsReducer, initialState)

	const setNumberOfRounds = () => {}

	const toggleElementsSetting = () => {}

	const toggleSameSetting = () => {}

	const value = {
		...state,
		setNumberOfRounds,
		toggleElementsSetting,
		toggleSameSetting,
	}

	return (
		<SettingsContext.Provider value={value}>
			{children}
		</SettingsContext.Provider>
	)
}

export const useSettingsContext = () => useContext(SettingsContext)
