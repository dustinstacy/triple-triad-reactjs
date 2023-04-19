import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { useCPUCardContext } from '../../context/CPUCardContext'
import { Button } from '../../components'
import { creature1, creature2, creature3 } from '../../assets/misc'
import './Solo.scss'

const Solo = () => {
	const { getCurrentUser, getUserDeck } = useGlobalContext()

	useEffect(() => {
		getCurrentUser()
		getUserDeck()
	}, [])

	return (
		<div className='solo page'>
			<div className='container'>
				<div className='bar box left'>
					<img
						className='creature large left'
						src={creature1}
						alt='creature1'
					/>
					<Button label='Single Match' type='link' path='matchSetup' />
				</div>
				<div className='bar box right disabled'>
					<img
						className='creature medium right'
						src={creature2}
						alt='creature2'
					/>
					<Button
						label='Challenges'
						type='link'
						path='challenges'
						disabled='disabled'
					/>
				</div>
				<div className='bar box left disabled'>
					<img
						className='creature medium left'
						src={creature3}
						alt='creature3'
					/>
					<Button label='Story' type='link' path='story' disabled='disabled' />
				</div>
			</div>
		</div>
	)
}

export default Solo
