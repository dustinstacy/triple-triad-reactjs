import React from 'react'
import { Button } from '../../components'
import './MatchSetup.scss'

const MatchSetup = () => {
	return (
		<div className='setup page'>
			<div className='settings box'>
				<h1>Match Setup</h1>
				<div className='player'>
					<h1>Player</h1>
				</div>
				<div className='settings__list'>
					<h2>Rules</h2>
					<div className='setting'>
						<div className='setting__field'>
							<label># of Rounds</label>
							<input type='number' min='1' max='7' step='2' defaultValue='1' />
						</div>
						<p>Select the number of Rounds for your match</p>
					</div>

					<div className='setting'>
						<div className='setting__field'>
							<label>Elements</label>
							<input type='checkbox' />
						</div>
						<p>
							Matching Elements increase values by +1. Counter Elements decrease
							values by -1
						</p>
					</div>
					<div className='setting'>
						<div className='setting__field'>
							<label>Same</label>
							<input type='checkbox' />
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
								<label for='3'>3 x 3</label>
								<input type='radio' name='board' id='4' />
								<label for='4'>4 x 4</label>
								<input type='radio' name='board' id='5' />
								<label for='5'>5 x 5</label>
							</div>
						</div>
					</div>
				</div>
				<div className='opponent'>
					<h1>Opponent</h1>
				</div>
				<Button label='Start Match' type='link' path='match' />
			</div>
		</div>
	)
}

export default MatchSetup
