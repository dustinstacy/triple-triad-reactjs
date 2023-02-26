import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useCPUCardContext } from '../../context/CPUCardContext'
import { useGlobalContext } from '../../context/GlobalContext'
import { rank1, rank6 } from '../../assets'
import './MatchEnd.scss'

const MatchEnd = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { getUserDeck, user, getCurrentUser } = useGlobalContext()
	const { setCPUOpponent } = useCPUCardContext()

	useEffect(() => {
		getUserDeck(), setCPUOpponent(), updateStats()
	}, [])

	const updateStats = async () => {
		if (location.state.winner === 'Player One Wins') {
			await axios.put('/api/profile/stats', {
				matches: user.stats.matches + 1,
				wins: user.stats.wins + 1,
				losses: user.stats.losses,
				draws: user.stats.draws,
			})
			await axios.put('/api/profile', {
				xp: user.xp + 35,
				coin: user.coin + 50,
			})
		} else if (location.state.winner === 'Player Two Wins') {
			await axios.put('/api/profile/stats', {
				matches: user.stats.matches + 1,
				wins: user.stats.wins,
				losses: user.stats.losses + 1,
				draws: user.stats.draws,
			})
			await axios.put('/api/profile', {
				coin: user.coin - 25,
			})
		} else if (location.state.winner === 'Draw') {
			await axios.put('/api/profile/stats', {
				matches: user.stats.matches + 1,
				wins: user.stats.wins,
				losses: user.stats.losses,
				draws: user.stats.draws + 1,
			})
			await axios.put('/api/profile', {
				xp: user.xp + 15,
				coin: user.coin + 15,
			})
		}
		getCurrentUser()
	}

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
						<p></p>
						<p>{user.coin}</p>
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
