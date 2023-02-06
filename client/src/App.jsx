import { Routes, Route } from 'react-router-dom'
import { LandingPage, Home } from './pages'
import { NavBar, Footer } from './components'
import { useGlobalContext } from './context/GlobalContext'

function App() {
	const { user } = useGlobalContext()

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
				</Routes>
			)}

			<Footer />
		</div>
	)
}

export default App
