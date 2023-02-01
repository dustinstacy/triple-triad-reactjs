import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages'
import { NavBar, Footer } from './components'

function App() {
	return (
		<div className='app'>
			<NavBar />
			<Routes>
				<Route path='/' element={<LandingPage />} />
			</Routes>
			<Footer />
		</div>
	)
}

export default App
