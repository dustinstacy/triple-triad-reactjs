import React, { useEffect } from 'react'
import { useSettingsContext } from '../../context/SettingsContext'
import { useCPUCardContext } from '../../context/CPUCardContext'
import { Button } from '../../components'
import { frames, rank1, rank6 } from '../../assets'
import './MatchSetup.scss'
import { useGlobalContext } from '../../context/GlobalContext'

const MatchSetup = () => {
	const { setCPUOpponent, cpuDeck } = useCPUCardContext()
	const { userDeck, getUserDeck } = useGlobalContext()
	const {
		setNumberOfRounds,
		toggleElementsSetting,
		toggleSameSetting,
		rounds,
		elements,
		same,
	} = useSettingsContext()
	const roundCount = [1, 3, 5, 7]

	return (
		<div className='setup page'>
			<div className='settings box'>
				<h1>Match Setup</h1>
				<div className='player'>
					<h1>Player</h1>
					<img src={frames} alt='frame' />
					<div className='player__info'>
						<p>Matches Won:</p>
						<span>58</span>
						<p>Matches Lost:</p>
						<span>0</span>
						<p>Deck Strength:</p>
						<span>
							{userDeck?.reduce(
								(total, card) =>
									total +
									card.values.reduce(
										(sum, current) =>
											parseInt(sum) +
											parseInt(String(current.replace(/A/g, 10))),
										0
									),
								0
							)}
						</span>
					</div>
					<img src={rank6} alt='rank6' className='rank' />
				</div>
				<div className='settings__list'>
					<h2>Rules</h2>
					<div className='setting'>
						<div className='setting__field'>
							<label># of Rounds</label>
							<div className='radios'>
								{roundCount.map((count) => (
									<div key={count}>
										<input
											key={count}
											type='radio'
											name='board'
											id={`${count}rounds`}
											value={count}
											onChange={(e) => setNumberOfRounds(e)}
											checked={rounds === `${count}` ? true : false}
										/>
										<label htmlFor={`${count}rounds`}>{count}</label>
									</div>
								))}
							</div>
						</div>
						<p>Select the number of Rounds for your match</p>
					</div>

					<div className='setting'>
						<div className='setting__field'>
							<label>Elements</label>
							<input
								type='checkbox'
								checked={elements}
								onChange={() => toggleElementsSetting()}
							/>
						</div>
						<p>
							Matching Elements increase values by +1. Counter Elements decrease
							values by -1
						</p>
					</div>

					<div className='setting'>
						<div className='setting__field'>
							<label>Same</label>
							<input
								type='checkbox'
								checked={same}
								onChange={() => toggleSameSetting()}
							/>
						</div>
						<p>
							Attacking cards will capture matching values as well as lesser
							values
						</p>
					</div>

					<div className='setting disabled'>
						<div className='setting__field'>
							<label>Chain</label>
							<input type='checkbox' />
						</div>
					</div>

					<div className='setting disabled'>
						<div className='setting__field'>
							<label>Defense</label>
							<input type='checkbox' />
						</div>
					</div>

					<div className='setting disabled'>
						<div className='setting__field'>
							<label>Keeper</label>
							<input type='checkbox' />
						</div>
					</div>

					<div className='setting disabled'>
						<div className='setting__field'>
							<label>Sum</label>
							<input type='checkbox' />
						</div>
					</div>

					<div className='setting disabled'>
						<div className='setting__field'>
							<label>Sudden Death</label>
							<input type='checkbox' />
						</div>
					</div>

					<div className='setting disabled'>
						<div className='setting__field'>
							<label>Board Size</label>
							<div className='radios'>
								<input type='radio' name='board' id='3' />
								<label htmlFor='3'>3 x 3</label>
								<input type='radio' name='board' id='4' />
								<label htmlFor='4'>4 x 4</label>
								<input type='radio' name='board' id='5' />
								<label htmlFor='5'>5 x 5</label>
							</div>
						</div>
					</div>
				</div>
				<div className='opponent'>
					<h1 onClick={() => setCPUOpponent()}>Opponent</h1>
					<img src={frames} alt='frame' />
					<div className='opponent__info'>
						<p>Matches Won:</p>
						<span>0</span>
						<p>Matches Lost:</p>
						<span>58</span>
						<p>Deck Strength:</p>
						<span>
							{cpuDeck.reduce(
								(total, card) =>
									total +
									card.values.reduce(
										(sum, current) =>
											parseInt(sum) + parseInt(current.replace(/A/g, 10)),
										0
									),
								0
							)}
						</span>
					</div>
					<img src={rank1} alt='rank1' className='rank' />
				</div>
				<Button label='Start Match' type='link' path='match' />
			</div>
		</div>
	)
}

export default MatchSetup
