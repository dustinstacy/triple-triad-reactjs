import React from 'react'
import { Button } from '../../components'
import './Home.scss'

const Home = () => {
	return (
		<div className='home page'>
			<div className='container'>
				<div className='card'>
					<Button label='Solo' />
				</div>
				<div className='card'>
					<Button label='Matchmaking' />
				</div>
				<div className='card'>
					<Button label='Collection' />
				</div>
			</div>
		</div>
	)
}

export default Home
