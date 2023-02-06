import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContext'
import { logo, swords, book, cottage } from '../../assets'
import './NavBar.scss'
import { useEffect } from 'react'

const NavBar = () => {
	const navigate = useNavigate()
	const { user, logout, getCurrentUser } = useGlobalContext()
	const { pathname } = useLocation()

	return (
		<div className='navbar'>
			<div className='navbar__container'>
				<NavLink to='/' className='navbar__logo'>
					<img src={logo} alt='logo' className='un-skew' />
				</NavLink>
				<NavLink to='/' className='navbar__link'>
					<p>
						<img src={cottage} alt='home' />
					</p>
				</NavLink>
				<a className='navbar__link disabled'>
					<p>
						<img src={swords} alt='battle' />
					</p>
				</a>
				<a className='navbar__link disabled'>
					<p>
						<img src={book} alt='library' />
					</p>
				</a>
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
