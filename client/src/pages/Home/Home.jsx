import React from 'react'
import { Button } from '../../components'
import './Home.scss'

const Home = () => {
	return (
		<div className='home page'>
			<div className='menu'>
				<div className='menu__card box solo'>
					<div className='menu__info box'>Type your information in here</div>
					<Button label='Solo' type='link' path='solo' />
				</div>
				<div className='menu__card box matchmaking disabled'>
					<div className='menu__info box disabled'>
						Type your information in here
					</div>
					<Button label='Matchmaking' />
				</div>
				<div className='menu__card box arcaneum'>
					<div className='menu__info box'>Type your information in here</div>
					<Button label='Arcaneum' type='link' path='arcaneum' />
				</div>
			</div>
		</div>
	)
}

export default Home
