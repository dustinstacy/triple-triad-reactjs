import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import { useGlobalContext } from '@context'
import { NavBar } from '@components'
import {
    Landing,
    Home,
    Market,
    Battle,
    BattleSetup,
    Collection,
    Account,
    Rules,
    OpenPacks,
} from '@pages'

import './styles/layout.scss'
import './styles/modules.scss'
import './styles/state.scss'
import './styles/theme.scss'

function App() {
    const { getGlobalState } = useGlobalContext()
    const { pathname } = useLocation()

    useEffect(() => {
        getGlobalState()
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
                <Route path='/rules' element={<Rules />} />
                <Route path='/account' element={<Account />} />
            </Routes>
        </>
    )
}

export default App
