import React from 'react'

import { postBattleLog, updateUserStats } from '@api'
import { Button } from '@components'
import { useGlobalContext } from '@context'

import './ActiveBattleAlert.scss'

// Component that alerts the user to an unfinished battle and provides options to continue or forfeit.
const ActiveBattleAlert = ({ setAlertActive }) => {
    const { user } = useGlobalContext()

    const forfeitBattle = async () => {
        const battleLog = localStorage.getItem('battleLog')
        await postBattleLog(battleLog)
        localStorage.removeItem('battleLog')
        await updateUserStats(user, 'loss')
        setAlertActive((current) => !current)
    }

    return (
        <div className='battle-alert box center-column'>
            <h1>⚠️</h1>
            <h2>You currently have an unfinished battle</h2>
            <div className='buttons'>
                <Button label='Rejoin' path='/battle' type='link' />
                <Button label='Forefeit' onClick={() => forfeitBattle()} />
            </div>
            <p>*Forfeiting will count as a loss</p>
        </div>
    )
}

export default ActiveBattleAlert
