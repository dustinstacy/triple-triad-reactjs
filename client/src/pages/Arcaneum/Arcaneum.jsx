import React, { useEffect } from 'react'
import { Button } from '../../components'
import { spellCircle } from '../../assets/misc'
import './Arcaneum.scss'
import { useGlobalContext } from '../../context/GlobalContext'

const Arcaneum = () => {
	const { getCurrentUser } = useGlobalContext()
	useEffect(() => {
		getCurrentUser()
	}, [])

	return (
		<div className='arcaneum page'>
			<div className='container'>
				<div className='top'>
					<div className='card box collection'>
						<Button label='Collection' type='link' path='collection' />
					</div>
					<div className='card box deck'>
						<Button label='Deck' type='link' path='deck' />
					</div>
				</div>
				<div className='middle'>
					<div className='card box packs'>
						<Button label='Packs' type='link' path='packs' />
					</div>
					<img className='spell' src={spellCircle} alt='spell circle' />
					<div className='card box disabled'>
						<Button label='Fusion' type='link' path='arcaneum' />
					</div>
				</div>
				<div className='bottom'>
					<div className='card box disabled'>
						<Button label='Market' type='link' path='arcaneum' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Arcaneum
