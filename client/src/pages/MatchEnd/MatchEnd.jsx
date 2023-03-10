import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useCPUCardContext } from '../../context/CPUCardContext'
import { useGlobalContext } from '../../context/GlobalContext'
import { coin } from '../../assets/icons'
import './MatchEnd.scss'

const MatchEnd = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { getUserDeck, user, getCurrentUser } = useGlobalContext()
	const { cpu } = useCPUCardContext()

	useEffect(() => {
		getUserDeck(), updateStats()
	}, [])

	const updateStats = async () => {
		if (location.state.winner === 'Victory') {
			await axios.put('/api/profile/stats', {
				matches: user.stats.matches + 1,
				wins: user.stats.wins + 1,
				losses: user.stats.losses,
				draws: user.stats.draws,
			})
			await axios.put('/api/profile', {
				xp: user.xp + 10,
				coin: user.coin + 25,
			})
		} else if (location.state.winner === 'Defeat') {
			await axios.put('/api/profile/stats', {
				matches: user.stats.matches + 1,
				wins: user.stats.wins,
				losses: user.stats.losses + 1,
				draws: user.stats.draws,
			})
		} else if (location.state.winner === 'Stalemate') {
			await axios.put('/api/profile/stats', {
				matches: user.stats.matches + 1,
				wins: user.stats.wins,
				losses: user.stats.losses,
				draws: user.stats.draws + 1,
			})
			await axios.put('/api/profile', {
				xp: user.xp + 5,
				coin: user.coin + 5,
			})
		}
		getCurrentUser()
	}

	return (
		<div className='end page'>
			<span className='result'>{location.state.winner}</span>
			<div className='rewards'>
				<p className='reward'>
					XP :
					<span>
						{location.state.winner === 'Victory'
							? '+ ' + cpu.xpReward
							: location.state.winner === 'Defeat'
							? 0
							: '+ ' + Math.floor(cpu.xpReward / 2.5)}
					</span>
				</p>
				<p className='reward'>
					Coin :
					<span>
						{location.state.winner === 'Victory'
							? '+ ' + cpu.coinReward
							: location.state.winner === 'Defeat'
							? 0
							: '+ ' + Math.floor(cpu.coinReward / 2.5)}
						<span> </span>
						<img src={coin} alt='coin' />
					</span>
				</p>
			</div>
			<div className='box results'>
				<div className='player'>
					<h1>{cpu.name}</h1>
					<img className='player__image' src={cpu.image} alt='cpu image' />
				</div>
				<div className='score'>{location.state.p2Score}</div>
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
				<div className='score'>{location.state.p1Score}</div>
				<div className='player'>
					<h1>{user.username}</h1>
					<img className='player__image' src={user.image} alt='cpu image' />
				</div>
			</div>
		</div>
	)
}

export default MatchEnd
