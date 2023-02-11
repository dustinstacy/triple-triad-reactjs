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
import { NavBar, Footer } from './components'
import { useGlobalContext } from './context/GlobalContext'

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
			)}

			{pathname !== ('/deck' && <Footer />) || ('/collection' && <Footer />)}
		</div>
	)
}

export default App
