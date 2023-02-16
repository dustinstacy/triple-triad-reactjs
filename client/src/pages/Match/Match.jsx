import React from 'react'
import { boardframe } from '../../assets'
import './Match.scss'

const Match = () => {
	return (
		<div className='match page'>
			<img className='board' src={boardframe} alt='board frame' />
		</div>
	)
}

export default Match
