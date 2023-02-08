import React from 'react'
import { angel, demon, golem, owl, snake } from '../../assets'
import './Collection.scss'

const Collection = () => {
	const collection1 = [1, 2, 3]
	const collection2 = [1, 2, 3, 4, 5, 6]
	const collection3 = [1, 2, 3, 4]
	const collection4 = [1, 2, 3, 4, 5]

	return (
		<div className='collection page'>
			<div className='background' />
			<div className='filters box'></div>
			<div className='list'>
				{collection1.map((card) => (
					<div key={card} className='card disabled' />
				))}
				<div className='card'>
					<img className='card__image' src={owl} alt='owl' />
					<div className='card__values'>
						<span className='up'>1</span>
						<span className='right'>2</span>
						<span className='left'>2</span>
						<span className='down'>5</span>
					</div>
				</div>
				<div className='card disabled' />
				<div className='card'>
					<img className='card__image' src={golem} alt='golem' />
					<div className='card__values'>
						<span className='up'>4</span>
						<span className='right'>3</span>
						<span className='left'>5</span>
						<span className='down'>1</span>
					</div>
				</div>
				{collection2.map((card) => (
					<div key={card} className='card disabled' />
				))}

				<div className='card'>
					<img className='card__image' src={demon} alt='demon' />
					<div className='card__values'>
						<span className='up'>6</span>
						<span className='right'>7</span>
						<span className='left'>2</span>
						<span className='down'>3</span>
					</div>
				</div>
				{collection3.map((card) => (
					<div key={card} className='card disabled' />
				))}
				<div className='card'>
					<img className='card__image' src={angel} alt='angel' />
					<div className='card__values'>
						<span className='up'>5</span>
						<span className='right'>9</span>
						<span className='left'>3</span>
						<span className='down'>6</span>
					</div>
				</div>
				{collection4.map((card) => (
					<div key={card} className='card disabled' />
				))}
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
		</div>
	)
}

export default Collection
