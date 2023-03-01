import { Routes, Route, useLocation } from 'react-router-dom'
import {
	LandingPage,
	Home,
	Solo,
	Match,
	MatchEnd,
	MatchSetup,
	Arcaneum,
	Collection,
	Deck,
	Packs,
	FirstDeck,
	Account,
} from './pages'
import { CPUCardProvider } from './context/CPUCardContext'
import { useGlobalContext } from './context/GlobalContext'
import { SettingsProvider } from './context/SettingsContext'
import { AccountBar } from './components'

function App() {
	const { user, userCards } = useGlobalContext()

	return (
		<div className='app'>
			<AccountBar />
			<CPUCardProvider>
				<SettingsProvider>
					<Routes>
						<Route path='/' element={<LandingPage />} />
						<Route path='/login' element={<LandingPage login />} />
						<Route path='/register' element={<LandingPage register />} />
						<Route
							path='/home'
							element={userCards.length === 0 ? <FirstDeck /> : <Home />}
						/>
						<Route path='/firstDeck' element={<FirstDeck />} />
						<Route path='/solo' element={<Solo />} />
						<Route path='/matchSetup' element={<MatchSetup />} />
						<Route path='/match' element={<Match />} />
						<Route path='/matchEnd' element={<MatchEnd />} />
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
