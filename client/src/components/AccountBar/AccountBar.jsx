import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGlobalContext } from '../../context/GlobalContext'
import { GiReturnArrow, GiHamburgerMenu } from 'react-icons/gi'
import { coin, home } from '../../assets/icons'
import { levels } from '../../constants/levels'
import axios from 'axios'
import { navlinks } from '../../constants/navlinks'
import './AccountBar.scss'

const AccountBar = () => {
	const { user, logout, getCurrentUser } = useGlobalContext()
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const [toggle, setToggle] = useState(false)
	const userNextLevel = levels[user?.level]

	const xpPercentage = () => {
		const percentage = (user.xp / userNextLevel) * 100 + '%'
		return percentage
	}

	useEffect(() => {
		if (user?.xp >= userNextLevel) {
			axios.put('/api/profile', {
				level: user.level + 1,
			})
			getCurrentUser()
		}
	}, [user])

	const goBack = () => {
		navigate(-1)
	}

	const dropDownNavigate = (link) => {
		setToggle(false)
		navigate(link.path)
	}

	return (
		<div className='accountBar'>
			<div className='accountBar__container'>
				{user &&
					pathname !== '/' &&
					pathname !== '/match' &&
					pathname !== '/home' &&
					pathname !== '/firstDeck' && (
						<div className='accountBar__nav'>
							<img src={home} alt='home' onClick={() => navigate('/home')} />
						</div>
					)}
			</div>
			<div className='accountBar__container'>
				{user ? (
					pathname === '/home' ||
					pathname === '/solo' ||
					pathname === '/arcaneum' ||
					pathname === '/account' ? (
						<>
							<div className='accountBar__main'>
								<div className='main__left'>
									<h2>{user.username}</h2>
									<div className='progressBar'>
										<span>
											xp: {user.xp} / {userNextLevel}
										</span>
										<div
											className='progressBar__inner'
											style={{ width: xpPercentage() }}
										></div>
									</div>

									<div className='left__bottom'>
										<p>Lvl. {user.level}</p>
										<p>
											{user.coin} <img src={coin} alt='coin' />
										</p>
									</div>
								</div>

								<div className='accountBar__image'>
									<img src={user.image} alt='user image' />
								</div>
								<GiHamburgerMenu
									className='dropdown'
									onClick={() => setToggle((current) => !current)}
								/>
							</div>
							{toggle && (
								<motion.div
									className='dropdown__menu'
									initial={{ width: 0 }}
									animate={
										window.innerWidth > 600
											? { width: '20vw' }
											: { width: '50vw' }
									}
									transition={{ duration: 0.5, ease: 'easeInOut' }}
								>
									<ul className='dropdown__links'>
										{navlinks.map((link) => (
											<li
												className='dropdown__link'
												key={link.name}
												onClick={() => dropDownNavigate(link)}
											>
												{link.name}
											</li>
										))}
										<li
											className='logout'
											onClick={() => {
												logout(), setToggle(false), navigate('/')
											}}
										>
											Logout
										</li>
									</ul>
								</motion.div>
							)}
						</>
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
