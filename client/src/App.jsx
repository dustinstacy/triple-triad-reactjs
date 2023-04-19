import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CPUCardProvider } from './context/CPUCardContext'
import { SettingsProvider } from './context/SettingsContext'
import {
	LandingPage,
	Home,
	Solo,
	Match,
	MatchEnd,
	Matchmaking,
	MatchSetup,
	Arcaneum,
	Collection,
	Deck,
	Packs,
	FirstDeck,
	Account,
} from './pages'
import { AccountBar } from './components'

function App() {
	return (
		<div className='app'>
			<AccountBar />
			<CPUCardProvider>
				<SettingsProvider>
					<Routes>
						<Route path='/' element={<LandingPage />} />
						<Route path='/login' element={<LandingPage login />} />
						<Route path='/register' element={<LandingPage register />} />
						<Route path='/firstDeck' element={<FirstDeck />} />
						<Route path='/home' element={<Home />} />
						<Route path='/solo' element={<Solo />} />
						<Route path='/matchSetup' element={<MatchSetup />} />
						<Route path='/match' element={<Match />} />
						<Route path='/matchEnd' element={<MatchEnd />} />
						<Route path='/matchmaking' element={<Matchmaking />} />
						<Route path='/arcaneum' element={<Arcaneum />} />
						<Route path='/collection' element={<Collection />} />
						<Route path='/deck' element={<Deck />} />
						<Route path='/packs' element={<Packs />} />
						<Route path='/account' element={<Account />} />
					</Routes>
				</SettingsProvider>
			</CPUCardProvider>
		</div>
	)
}

export default App
