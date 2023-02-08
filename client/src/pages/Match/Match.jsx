import React from 'react'
import { angel, demon, golem, owl, snake } from '../../assets'
import './Match.scss'

const Match = () => {
	return (
		<div className='match page'>
			<div className='card'>
				<img className='card__image' src={owl} alt='owl' />
				<div className='card__values'>
					<span className='up'>1</span>
					<span className='right'>2</span>
					<span className='left'>2</span>
					<span className='down'>5</span>
				</div>
			</div>
			<div className='card'>
				<img className='card__image' src={golem} alt='golem' />
				<div className='card__values'>
					<span className='up'>4</span>
					<span className='right'>1</span>
					<span className='left'>5</span>
					<span className='down'>4</span>
				</div>
			</div>
			<div className='card'>
				<img className='card__image' src={demon} alt='demon' />
				<div className='card__values'>
					<span className='up'>6</span>
					<span className='right'>7</span>
					<span className='left'>2</span>
					<span className='down'>3</span>
				</div>
			</div>
			<div className='card'>
				<img className='card__image' src={angel} alt='angel' />
				<div className='card__values'>
					<span className='up'>5</span>
					<span className='right'>9</span>
					<span className='left'>3</span>
					<span className='down'>6</span>
				</div>
			</div>
			<div className='card'>
				<img className='card__image' src={snake} alt='snake' />
				<div className='card__values'>
					<span className='up'>4</span>
					<span className='right'>8</span>
					<span className='left'>A</span>
					<span className='down'>7</span>
				</div>
			</div>
		</div>
	)
}

export default Match
