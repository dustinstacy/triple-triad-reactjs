import { Routes, Route, useLocation } from 'react-router-dom'
import {
	LandingPage,
	Home,
	Solo,
	Match,
	MatchSetup,
	Arcaneum,
	Collection,
	Deck,
	Packs,
} from './pages'
import { useGlobalContext } from './context/GlobalContext'
import { SettingsProvider } from './context/SettingsContext'
import { NavBar, Footer } from './components'

function App() {
	const { user } = useGlobalContext()
	const { pathname } = useLocation()

	return (
		<div className='app'>
			<NavBar />

			{!user && (
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/login' element={<LandingPage login />} />
					<Route path='/register' element={<LandingPage register />} />
				</Routes>
			)}

			{user && (
				<SettingsProvider>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/solo' element={<Solo />} />
						<Route path='/matchSetup' element={<MatchSetup />} />
						<Route path='/match' element={<Match />} />
						<Route path='/arcaneum' element={<Arcaneum />} />
						<Route path='/collection' element={<Collection />} />
						<Route path='/deck' element={<Deck />} />
						<Route path='/packs' element={<Packs />} />
					</Routes>
				</SettingsProvider>
			)}

			{pathname !== ('/deck' && <Footer />) || ('/collection' && <Footer />)}
		</div>
	)
}

export default App
