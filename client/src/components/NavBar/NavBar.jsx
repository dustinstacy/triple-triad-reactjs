import React from 'react'
import { logo } from '../../assets'
import './NavBar.scss'

const NavBar = () => {
	return (
		<div className='navbar'>
			<div className='navbar__container'>
				<span className='navbar__logo'>
					<img src={logo} alt='logo' className='un-skew' />
				</span>
			</div>
			<div className='navbar__container'>
				<a className='navbar__link active'>
					<p>⚔️</p>
				</a>
				<a className='navbar__link'>
					<p>🛡️</p>
				</a>
				<a className='navbar__link'>
					<p>🎴</p>
				</a>
				<a className='login'>
					<p>
						Login <span>{'>'}</span>
					</p>
				</a>
			</div>
		</div>
	)
}

export default NavBar
