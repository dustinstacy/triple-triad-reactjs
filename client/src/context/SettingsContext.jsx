import React, { createContext, useContext, useReducer } from 'react'

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
                rounds: action.payload,
            }
        case 'SET_ELEMENTS':
            return {
                ...state,
                elements: action.payload,
            }
        case 'SET_SAME':
            return {
                ...state,
                same: action.payload,
            }
        default:
            return state
    }
}

const SettingsContext = createContext(initialState)

export const SettingsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(settingsReducer, initialState)

    const setNumberOfRounds = (e) => {
        dispatch({ type: 'SET_ROUNDS', payload: e.target.value })
    }

    const toggleElementsSetting = () => {
        if (state.elements === false) {
            dispatch({ type: 'SET_ELEMENTS', payload: true })
        } else if (state.elements === true) {
            dispatch({ type: 'SET_ELEMENTS', payload: false })
        }
    }

    const toggleSameSetting = () => {
        if (state.same === false) {
            dispatch({ type: 'SET_SAME', payload: true })
        } else if (state.same === true) {
            dispatch({ type: 'SET_SAME', payload: false })
        }
    }

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
