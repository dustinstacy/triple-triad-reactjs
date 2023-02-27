import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContext'
import { home, settings } from '../../assets'
import './AccountBar.scss'
import axios from 'axios'

const AccountBar = () => {
	const { user, logout, getCurrentUser } = useGlobalContext()
	const { pathname } = useLocation()

	const addCoin = () => {
		axios.put('/api/profile', {
			coin: user.coin + 20000,
		})
		getCurrentUser()
	}

	return (
		<div className='accountBar'>
			<div className='accountBar__container'>
				{user && pathname !== '/' && pathname !== '/match' && (
					<>
						<NavLink to='/' className='accountBar__link'>
							<p>
								<img src={home} alt='home' />
							</p>
						</NavLink>
						<img src={settings} alt='settings' onClick={() => addCoin()} />
					</>
				)}
			</div>
			<div className='accountBar__container'>
				{user ? (
					pathname === '/' ||
					pathname === '/solo' ||
					pathname === '/arcaneum' ? (
						<div className='accountBar__main' />
					) : (
						<></>
					)
				) : pathname === '/' ? (
					<NavLink to='/login' className='accountBar__login'>
						<p>Login</p>
					</NavLink>
				) : pathname === '/register' ? (
					<NavLink to='/login' className='accountBar__login'>
						<p>Login</p>
					</NavLink>
				) : pathname === '/deck' ? (
					<></>
				) : (
					<NavLink to='/register' className='accountBar__login'>
						<p>Register</p>
					</NavLink>
				)}
			</div>
		</div>
	)
}

export default AccountBar
