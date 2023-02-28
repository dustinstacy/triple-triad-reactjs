import React, { useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../../context/GlobalContext'
import { TextInput } from '../../components'
import { blue1, red1 } from '../../assets/backgrounds'
import { rank1 } from '../../assets/ranks'
import './Account.scss'

const Account = () => {
	const { user, getCurrentUser } = useGlobalContext()
	const [userImage, setUserImage] = useState('')

	const updateUserImage = () => {
		axios.put('./api/profile', {
			image: userImage,
		})
		setUserImage('')
		getCurrentUser()
	}

	return (
		<div className='account page'>
			<div className='containers'>
				<div className='container'>
					<h1>Account Details</h1>
					<div className='box'>
						<p>Username : {user.username}</p>
						<p>Email : {user.email}</p>
						<p>Password : ************</p>
						<a>Edit Details</a>
					</div>
				</div>
				<div className='container'>
					<h1>Stats</h1>
					<div className='stats box'>
						<div className='stats__info'>
							<p>
								Record : {user.stats.wins} - {user.stats.losses} -{' '}
								{user.stats.draws}
							</p>
							<p>Matches : {user.stats.matches}</p>
							<p>Wins : {user.stats.wins}</p>
							<p>Losses : {user.stats.losses}</p>
							<p>Draws : {user.stats.draws}</p>
						</div>
						<div className='stats__rank'>
							<img src={rank1} alt='rank' />
							<p>Rank : {user.rank}</p>
						</div>
					</div>
				</div>
				<div className='container'>
					<h1>Customization</h1>
					<div className='box'>
						<p className='custom__image'>
							Account Image : <img src={user.image} alt='user image' />
						</p>
						<div className='image__input'>
							<TextInput
								type='text'
								value={userImage}
								setState={setUserImage}
								label='paste url here'
							/>
							<button className='userImage' onClick={() => updateUserImage()}>
								Change Image
							</button>
						</div>

						<p className='backgrounds'>
							Backgrounds :{' '}
							<div className='backgrounds__blue'>
								<img src={blue1} alt='blue1' />
								<p>Blue</p>
							</div>
							<div className='backgrounds__blue'>
								<img src={red1} alt='red1' />
								<p>Red</p>
							</div>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Account
