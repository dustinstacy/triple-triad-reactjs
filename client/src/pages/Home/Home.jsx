import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components'
import { useGlobalContext } from '../../context/GlobalContext'
import './Home.scss'

const Home = () => {
	const navigate = useNavigate()
	const { user, getCurrentUser } = useGlobalContext()

	useEffect(() => {
		getCurrentUser()
	}, [])

	useEffect(() => {
		if (user?.firstDeck === false) {
			navigate('/firstDeck')
		} else {
			navigate('/home')
		}
	}, [user])

	return (
		<div className='home page'>
			<div className='menu'>
				<div className='menu__card solo'>
					<Button label='Solo' type='link' path='solo' />
				</div>
				<div className='menu__card matchmaking disabled'>
					<Button label='Matchmaking' />
				</div>
				<div className='menu__card arcaneum'>
					<Button label='Arcaneum' type='link' path='arcaneum' />
				</div>
			</div>
		</div>
	)
}

export default Home
