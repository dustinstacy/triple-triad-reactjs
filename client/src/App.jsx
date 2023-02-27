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
import { useGlobalContext } from './context/GlobalContext'
import { SettingsProvider } from './context/SettingsContext'
import { NavBar, AccountBar, Footer } from './components'
import { CPUCardProvider } from './context/CPUCardContext'

function App() {
	const { user, userCards } = useGlobalContext()
	const { pathname } = useLocation()

	return (
		<div className='app'>
			<AccountBar />

			{!user && (
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/login' element={<LandingPage login />} />
					<Route path='/register' element={<LandingPage register />} />
				</Routes>
			)}

			{(user && userCards.length) === 0 && (
				<Routes>
					<Route path='/' element={<FirstDeck />} />
				</Routes>
			)}

			{userCards.length > 0 && (
				<CPUCardProvider>
					<SettingsProvider>
						<Routes>
							<Route path='/' element={<Home />} />
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
			)}

			{pathname !== ('/deck' && <Footer />) || ('/collection' && <Footer />)}
		</div>
	)
}

export default App
