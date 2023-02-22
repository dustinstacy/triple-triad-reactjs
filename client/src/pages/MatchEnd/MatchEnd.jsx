import React, { useEffect } from 'react'
import { useCPUCardContext } from '../../context/CPUCardContext'
import { useGlobalContext } from '../../context/GlobalContext'
import './MatchEnd.scss'

const MatchEnd = () => {
	const { getUserDeck } = useGlobalContext()
	const { setCPUOpponent } = useCPUCardContext()

	useEffect(() => {
		getUserDeck(), setCPUOpponent()
	}, [])

	return (
		<div className='end page'>
			<div className='box'></div>
		</div>
	)
}

export default MatchEnd
