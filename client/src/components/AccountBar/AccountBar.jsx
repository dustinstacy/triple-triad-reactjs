import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContext'
import { home, settings } from '../../assets/icons'
import './AccountBar.scss'

const AccountBar = () => {
	const { user, logout, getCurrentUser } = useGlobalContext()
	const { pathname } = useLocation()

	const devTool = () => {
		logout()
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
						<img src={settings} alt='settings' onClick={() => devTool()} />
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
