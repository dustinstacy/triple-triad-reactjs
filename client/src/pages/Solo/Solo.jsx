import React from 'react'
import { Button } from '../../components'
import { creature1, creature2, creature3 } from '../../assets'
import './Solo.scss'

const Solo = () => {
	return (
		<div className='solo page'>
			<div className='menu'>
				<div className='menu__bar box left'>
					<img
						className='menu__creature large left'
						src={creature1}
						alt='creature1'
					/>
					<p className='menu__text'>
						Take on the CPU in a single match with custom rules
					</p>
					<Button label='Single Match' type='link' path='matchSetup' />
				</div>
				<div className='menu__bar box right disabled'>
					<img
						className='menu__creature medium right'
						src={creature2}
						alt='creature2'
					/>
					<p className='menu__text'>Coming Soon!</p>
					<Button label='Challenges' type='link' path='challenges' />
				</div>
				<div className='menu__bar box left disabled'>
					<img
						className='menu__creature medium left'
						src={creature3}
						alt='creature3'
					/>
					<p className='menu__text'>Coming Soon!</p>
					<Button label='Story' type='link' path='story' />
				</div>
			</div>
		</div>
	)
}

export default Solo
