/**
 * Custom Hook: useToggle
 *
 * A reusable hook that manages a boolean toggle state.
 *
 * @param {boolean} initialState - The initial state of the toggle (default: false).
 * @returns {Array} An array containing the toggle state and toggle function.
 *
 * Usage:
 *    const [isToggled, toggle] = useToggle();
 *    - isToggled: The current state of the toggle (true/false).
 *    - toggle: A function to toggle the state between true and false.
 */
import { useState } from 'react'

const useToggle = (initialState = false) => {
    const [toggleState, setToggleState] = useState(initialState)

    const toggle = () => {
        setToggleState((prevState) => !prevState)
    }

    return [toggleState, toggle]
}

export default useToggle
