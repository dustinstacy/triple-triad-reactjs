import React from 'react'
import { Button } from '../../components'
import { creature1, creature2, creature3 } from '../../assets'
import './Solo.scss'

const Solo = () => {
	return (
		<div className='solo page'>
			<div className='menu'>
				<div className='menu__bar left'>
					<img
						className='menu__creature large left'
						src={creature1}
						alt='creature1'
					/>
					<Button label='Single Match' type='link' path='match' />
				</div>
				<div className='menu__bar right disabled'>
					<img
						className='menu__creature medium right'
						src={creature2}
						alt='creature2'
					/>
					<Button label='Challenges' type='link' path='challenges' />
				</div>
				<div className='menu__bar story left disabled'>
					<img
						className='menu__creature medium left'
						src={creature3}
						alt='creature3'
					/>
					<Button label='Story' type='link' path='story' />
				</div>
			</div>
		</div>
	)
}

export default Solo
