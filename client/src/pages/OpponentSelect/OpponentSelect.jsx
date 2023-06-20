import React, { useEffect, useState } from 'react'

import { ModalOverlay } from '@components'
import { useGlobalContext } from '@context'

import {
    ActiveBattleAlert,
    BattlePreviewModal,
    OpponentCard,
} from './components'

import './OpponentSelect.scss'

// Renders a menu of CPU opponents to select from.
// Displays alert if saved battle state exists.
const OpponentSelect = () => {
    const { allOpponents } = useGlobalContext()
    const [selectedOpponent, setSelectedOpponent] = useState(null)
    const [alertActive, setAlertActive] = useState(false)

    // Check for a saved battle state when component mounts.
    // If saved state exists, display the battle alert.
    // Otherwise, fetch the list of opponents
    useEffect(() => {
        const savedState = localStorage.getItem('battleState')
        if (savedState) {
            setAlertActive(true)
        }
    }, [alertActive])

    const sortedOpponents = allOpponents.sort((a, b) => a.level - b.level)

    return (
        <div className='opponent-select page center'>
            <div className='background fill' />
            <div className='header'>
                <h1>Choose your opponent</h1>
                <hr />
            </div>
            <div className='opponent-list center'>
                {sortedOpponents?.length &&
                    sortedOpponents?.map((opponent) => (
                        <OpponentCard
                            key={opponent.name}
                            opponent={opponent}
                            selectedOpponent={selectedOpponent}
                            setSelectedOpponent={setSelectedOpponent}
                        />
                    ))}
            </div>
            {alertActive && (
                <ModalOverlay>
                    <ActiveBattleAlert setAlertActive={setAlertActive} />
                </ModalOverlay>
            )}
            {selectedOpponent && (
                <ModalOverlay>
                    <BattlePreviewModal
                        selectedOpponent={selectedOpponent}
                        setSelectedOpponent={setSelectedOpponent}
                    />
                </ModalOverlay>
            )}
        </div>
    )
}

export default OpponentSelect
