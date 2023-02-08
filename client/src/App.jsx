import { Routes, Route, useLocation } from 'react-router-dom'
import {
	LandingPage,
	Home,
	Solo,
	Match,
	MatchSetup,
	Arcaneum,
	Collection,
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
				</Routes>
			)}

			{pathname !== '/collection' && <Footer />}
		</div>
	)
}

export default App
