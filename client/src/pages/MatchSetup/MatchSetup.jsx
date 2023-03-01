import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { useSettingsContext } from '../../context/SettingsContext'
import { useCPUCardContext } from '../../context/CPUCardContext'
import { Button } from '../../components'
import { rank1, rank6 } from '../../assets/ranks'
import './MatchSetup.scss'

const MatchSetup = () => {
	const { cpu, cpuDeck } = useCPUCardContext()
	const { user, userDeck, getUserDeck } = useGlobalContext()
	const { toggleElementsSetting, toggleSameSetting, elements, same } =
		useSettingsContext()

	return (
		<div className='setup page'>
			<div className='player box'>
				<h1>{cpu.name}</h1>
				<img className='player__image' src={cpu.image} alt='player image' />
				<div className='player__info'>
					<p>Deck Strength:</p>
					<span>
						{cpuDeck?.reduce(
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
				<img src={rank1} alt='rank1' className='player__rank' />
			</div>

			<div className='settings box'>
				<h1>Match Setup</h1>
				<div className='settings__list'>
					<h2>Rules</h2>
					<div className='setting'>
						<div className='setting__field'>
							<label>Elements</label>
							<input
								type='checkbox'
								checked={elements}
								onChange={() => toggleElementsSetting()}
							/>
						</div>
						<p>Matching Elements increase values by +1</p>
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

					<div className='setting disabled'>
						<div className='setting__field'>
							<label># of Rounds</label>
							<div className='radios'>
								<input type='radio' name='board' id='1' />
								<label htmlFor='1'>1</label>
								<input type='radio' name='board' id='3' />
								<label htmlFor='3'>3</label>
								<input type='radio' name='board' id='5' />
								<label htmlFor='5'>5</label>
								<input type='radio' name='board' id='7' />
								<label htmlFor='7'>7</label>
							</div>
						</div>
					</div>
				</div>

				<Button label='Start Match' type='link' path='match' />
			</div>

			<div className='player box'>
				<h1>{user?.username}</h1>
				<img className='player__image' src={user?.image} alt='player image' />
				<div className='player__info'>
					<p>Deck Strength:</p>
					<span>
						{userDeck?.reduce(
							(total, card) =>
								total +
								card.values.reduce(
									(sum, current) =>
										parseInt(sum) + parseInt(String(current.replace(/A/g, 10))),
									0
								),
							0
						)}
					</span>
				</div>
				<img src={rank1} alt='rank6' className='player__rank' />
			</div>
		</div>
	)
}

export default MatchSetup
