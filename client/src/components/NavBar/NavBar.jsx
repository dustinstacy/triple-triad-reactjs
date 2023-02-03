import React from 'react'
import { logo, swords, book, cottage } from '../../assets'
import './NavBar.scss'

const NavBar = () => {
	return (
		<div className='navbar'>
			<div className='navbar__container'>
				<span className='navbar__logo'>
					<img src={logo} alt='logo' className='un-skew' />
				</span>
				<a className='navbar__link'>
					<p>
						<img src={cottage} alt='home' />
					</p>
				</a>
				<a className='navbar__link active'>
					<p>
						<img src={swords} alt='battle' />
					</p>
				</a>
				<a className='navbar__link'>
					<p>
						<img src={book} alt='library' />
					</p>
				</a>
			</div>
			<div className='navbar__container'>
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
