import React from 'react'
import { Button } from '../../components'
import './MatchSetup.scss'

const MatchSetup = () => {
	return (
		<div className='setup page'>
			<div className='settings box'>
				<Button label='Start Match' type='link' path='match' />
			</div>
		</div>
	)
}

export default MatchSetup
