import React from 'react'
import { Button } from '../../components'
import './Home.scss'

const Home = () => {
	return (
		<div className='home page'>
			<div className='menu'>
				<div className='menu__card box solo'>
					<div className='menu__info box'>
						Single player matches across a variety of game modes
					</div>
					<Button label='Solo' type='link' path='solo' />
				</div>
				<div className='menu__card box matchmaking disabled'>
					<div className='menu__info box disabled'>Coming soon!</div>
					<Button label='Matchmaking' />
				</div>
				<div className='menu__card box arcaneum'>
					<div className='menu__info box'>
						View your cards, get new packs, and construct your deck
					</div>
					<Button label='Arcaneum' type='link' path='arcaneum' />
				</div>
			</div>
		</div>
	)
}

export default Home
