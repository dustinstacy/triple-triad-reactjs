import React, { createContext, useContext, useReducer } from 'react'

const initialState = {
	user: null,
	fetchingUser: true,
}

const globalReducer = (state, action) => {
	switch (action.type) {
		case 'SET_USER':
			return {
				...state,
				user: action.payload,
				fetchingUser: false,
			}
		case 'RESET_USER':
			return {
				...state,
				user: null,
				fetchingUser: false,
			}
		default:
			return state
	}
}

const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(globalReducer, initialState)

	const value = {
		...state,
	}

	return (
		<GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext)
