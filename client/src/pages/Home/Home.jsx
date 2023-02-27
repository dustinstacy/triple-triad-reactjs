import React, { useEffect } from 'react'
import { Button } from '../../components'
import { useGlobalContext } from '../../context/GlobalContext'
import './Home.scss'

const Home = () => {
	const { getCurrentUser } = useGlobalContext()
	useEffect(() => {
		getCurrentUser()
	}, [])
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
