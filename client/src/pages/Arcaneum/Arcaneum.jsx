import React from 'react'
import { Button } from '../../components'
import { spellCircle } from '../../assets'
import './Arcaneum.scss'

const Arcaneum = () => {
	return (
		<div className='arcaneum page'>
			<div className='menu'>
				<div className='menu__top'>
					<div className='menu__card box'>
						<Button label='Collection' type='link' path='collection' />
					</div>
					<div className='menu__card box disabled'>
						<Button label='Deck' />
					</div>
				</div>
				<div className='menu__middle'>
					<div className='menu__card box disabled'>
						<Button label='Packs' type='link' path='arcaneum' />
					</div>
					<img className='menu__spell' src={spellCircle} alt='spell circle' />
					<div className='menu__card box disabled'>
						<Button label='Fusion' type='link' path='arcaneum' />
					</div>
				</div>
				<div className='menu__bottom'>
					<div className='menu__card box disabled'>
						<Button label='Market' type='link' path='arcaneum' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Arcaneum
