import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useGlobalContext } from './context/GlobalContext'

import { NavBar } from './components'
import {
    Landing,
    Home,
    Market,
    Battle,
    BattleSetup,
    Collection,
    Account,
    OpenPacks,
} from './pages'
import './App.scss'

function App() {
    const { getCurrentUser } = useGlobalContext()
    const { pathname } = useLocation()

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <>
            {pathname !== '/match' && pathname !== 'matchEnd' && <NavBar />}
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/register' element={<Landing register />} />
                <Route path='/home' element={<Home />} />

                <Route path='/matchSetup' element={<BattleSetup />} />
                <Route path='/match' element={<Battle />} />

                <Route path='/collection' element={<Collection />} />
                <Route path='/market' element={<Market />} />
                <Route path='/packs' element={<OpenPacks />} />
                <Route path='/account' element={<Account />} />
            </Routes>
        </>
    )
}

export default App
