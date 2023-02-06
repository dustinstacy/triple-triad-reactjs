import React, { createContext, useContext, useReducer } from 'react'
import axios from 'axios'

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

	const getCurrentUser = async () => {
		try {
			const res = await axios.get('/api/auth/current')

			if (res.data) {
				dispatch({
					type: 'SET_USER',
					payload: res.data,
				})
			} else {
				dispatch({ type: 'RESET_USER' })
			}
		} catch (error) {
			console.log(error, 'No User')
			dispatch({ type: 'RESET_USER' })
		}
	}

	const logout = async () => {
		try {
			await axios.put('/api/auth/logout')
			dispatch({ type: 'RESET_USER' })
		} catch (error) {
			console.log(error)
			dispatch({ type: 'RESET_USER' })
		}
	}

	const value = {
		...state,
		getCurrentUser,
		logout,
	}

	return (
		<GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext)
