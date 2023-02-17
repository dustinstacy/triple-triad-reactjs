import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContext'
import {
	logo,
	cottage,
	swords,
	arcanecrystal,
	crystalbook,
	magicbook,
	deck,
} from '../../assets'
import './NavBar.scss'

const NavBar = () => {
	const { user, logout } = useGlobalContext()
	const { pathname } = useLocation()

	return (
		<div className='navbar'>
			<div className='navbar__container'>
				<NavLink to='/' className='navbar__logo'>
					<img src={logo} alt='logo' className='un-skew' />
				</NavLink>
				{user && (
					<>
						<NavLink to='/' className='navbar__link'>
							<p>
								<img src={cottage} alt='home' />
							</p>
						</NavLink>
						<NavLink to='/solo' className='navbar__link'>
							<p>
								<img src={swords} alt='battle' />
							</p>
						</NavLink>
						<NavLink to='/arcaneum' className='navbar__link'>
							<p>
								<img src={arcanecrystal} alt='library' />
							</p>
						</NavLink>{' '}
						<NavLink to='/collection' className='navbar__link'>
							<p>
								<img src={magicbook} alt='library' />
							</p>
						</NavLink>{' '}
						<NavLink to='/packs' className='navbar__link'>
							<p>
								<img src={crystalbook} alt='library' />
							</p>
						</NavLink>{' '}
						<NavLink to='/deck' className='navbar__link'>
							<p>
								<img src={deck} alt='library' />
							</p>
						</NavLink>
					</>
				)}
			</div>
			<div className='navbar__container'>
				{user ? (
					<a className='login'>
						<p onClick={logout}>Logout</p>
					</a>
				) : pathname === '/' ? (
					<NavLink to='/login' className='login'>
						<p>Login</p>
					</NavLink>
				) : pathname === '/register' ? (
					<NavLink to='/login' className='login'>
						<p>Login</p>
					</NavLink>
				) : (
					<NavLink to='/register' className='login'>
						<p>Register</p>
					</NavLink>
				)}
			</div>
		</div>
	)
}

export default NavBar
