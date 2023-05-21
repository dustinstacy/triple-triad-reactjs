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
            {pathname !== '/battle' && <NavBar />}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Landing />} />
                <Route path='/register' element={<Landing register />} />

                <Route path='/battleSetup' element={<BattleSetup />} />
                <Route path='/battle' element={<Battle />} />

                <Route path='/collection' element={<Collection />} />
                <Route path='/market' element={<Market />} />
                <Route path='/packs' element={<OpenPacks />} />
                <Route path='/account' element={<Account />} />
            </Routes>
        </>
    )
}

export default App
