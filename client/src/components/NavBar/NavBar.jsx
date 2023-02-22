import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContext'
import {
	smalllogo,
	home,
	swords,
	matchmaking,
	arcaneumIcon,
	settings,
	crystalbook,
	magicbook,
	deck,
	stonetablet,
	gift,
} from '../../assets'
import './NavBar.scss'

const NavBar = () => {
	const { user, userCards, logout } = useGlobalContext()
	const { pathname } = useLocation()

	return (
		<div className='navbar'>
			<div className='navbar__container'>
				<NavLink to='/' className='navbar__logo'>
					<img src={smalllogo} alt='logo' className='un-skew' />
				</NavLink>
				{userCards.length > 0 && (
					<>
						<NavLink to='/' className='navbar__link'>
							<p>
								<img src={home} alt='home' />
							</p>
						</NavLink>
						<NavLink to='/solo' className='navbar__link'>
							<p>
								<img src={swords} alt='solo' />
							</p>
						</NavLink>
						<NavLink to='/matchmaking' className='navbar__link disabled'>
							<p>
								<img src={matchmaking} alt='matchmaking' />
							</p>
						</NavLink>
						<NavLink to='/arcaneum' className='navbar__link'>
							<p>
								<img src={arcaneumIcon} alt='arcaneum' />
							</p>
						</NavLink>
					</>
				)}
			</div>
			<div className='navbar__container'>
				{userCards.length > 0 && (
					<>
						<NavLink to='/collection' className='navbar__link'>
							<p>
								<img src={magicbook} alt='library' />
							</p>
						</NavLink>
						<NavLink to='/packs' className='navbar__link'>
							<p>
								<img src={crystalbook} alt='library' />
							</p>
						</NavLink>
						<NavLink to='/deck' className='navbar__link'>
							<p>
								<img src={deck} alt='library' />
							</p>
						</NavLink>
						<NavLink to='/fusion' className='navbar__link disabled'>
							<p>
								<img src={stonetablet} alt='fusion' />
							</p>
						</NavLink>
					</>
				)}

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
