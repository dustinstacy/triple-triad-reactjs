import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCPUCardContext } from '../../context/CPUCardContext'
import { useGlobalContext } from '../../context/GlobalContext'
import { rank1, rank6 } from '../../assets'
import './MatchEnd.scss'

const MatchEnd = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { getUserDeck, user } = useGlobalContext()
	const { setCPUOpponent } = useCPUCardContext()

	useEffect(() => {
		getUserDeck(), setCPUOpponent()
	}, [])

	return (
		<div className='end page'>
			<div className='box header'>Match Over</div>
			<span>{location.state.winner}</span>
			<div className='box results'>
				<img src={rank6} alt='rank 6' />

				<div className='results__p1'>
					<h1>{user.username}</h1>
					<div className='score'>{location.state.p1Score}</div>
					<div className='rewards'>
						<p>XP: +55</p>
						<p>Coin: +10</p>
					</div>
				</div>
				<div className='buttons'>
					<button className='box' onClick={() => navigate('/match')}>
						Rematch
					</button>
					<button className='box' onClick={() => navigate('/matchSetup')}>
						Setup
					</button>
					<button className='box' onClick={() => navigate('/')}>
						Quit
					</button>
				</div>
				<div className='results__p2'>
					<h1>Player Two</h1>
					<div className='score'>{location.state.p2Score}</div>
					<div className='rewards'>
						<p>XP: +5</p>
						<p>Coin: +1</p>
					</div>
				</div>
				<img src={rank1} alt='rank 1' />
			</div>
		</div>
	)
}

export default MatchEnd
