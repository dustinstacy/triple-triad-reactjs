import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import { NavBar } from './components'
import {
    LandingPage,
    Home,
    Battle,
    Market,
    Match,
    MatchEnd,
    MatchSetup,
    Collection,
    Account,
    Discovery,
} from './pages'
import './App.scss'

function App() {
    const { pathname } = useLocation()

    return (
        <>
            {pathname !== '/match' && pathname !== 'matchEnd' && <NavBar />}
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/register' element={<LandingPage register />} />
                <Route path='/home' element={<Home />} />
                <Route path='/battle' element={<Battle />} />

                <Route path='/matchSetup' element={<MatchSetup />} />
                <Route path='/match' element={<Match />} />
                <Route path='/matchEnd' element={<MatchEnd />} />

                <Route path='/collection' element={<Collection />} />
                <Route path='/market' element={<Market />} />
                <Route path='/discovery' element={<Discovery />} />
                <Route path='/account' element={<Account />} />
            </Routes>
        </>
    )
}

export default App
