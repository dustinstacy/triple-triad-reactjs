import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { CPUCardProvider } from './context/CPUCardContext'
import { useGlobalContext } from './context/GlobalContext'

import {
    LandingPage,
    Home,
    Solo,
    Match,
    MatchEnd,
    MatchSetup,
    Deck,
    Packs,
    FirstDeck,
    Account,
} from './pages'

function App() {
    const { getAllCards, allCards } = useGlobalContext()

    useEffect(() => {
        if (allCards.length === 0) {
            getAllCards()
        }
    }, [])

    return (
        <div className='app'>
            <CPUCardProvider>
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route
                        path='/register'
                        element={<LandingPage register />}
                    />
                    <Route path='/firstDeck' element={<FirstDeck />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/solo' element={<Solo />} />
                    <Route path='/matchSetup' element={<MatchSetup />} />
                    <Route path='/match' element={<Match />} />
                    <Route path='/matchEnd' element={<MatchEnd />} />
                    <Route path='/deck' element={<Deck />} />
                    <Route path='/packs' element={<Packs />} />
                    <Route path='/account' element={<Account />} />
                </Routes>
            </CPUCardProvider>
        </div>
    )
}

export default App
