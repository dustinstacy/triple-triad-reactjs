import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../../context/GlobalContext'
import { assignRandomValues } from '../../../../utils/assignRandomValues'
import { Card } from '../../components'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { smallPack, mediumPack, largePack } from '../../assets/packs'
import { coin } from '../../assets/icons'
import './Packs.scss'

const Packs = () => {
	const { allCards, user, getCurrentUser } = useGlobalContext()
	const [pack, setPack] = useState(0)
	const [packContents, setPackContents] = useState([])
	const [userCoin, setUserCoin] = useState(user.coin)
	const [cart, setCart] = useState({
		total: 0,
		packs: [],
	})
	const [userSmallPacks, setUserSmallPacks] = useState([])
	const [userMediumPacks, setUserMediumPacks] = useState([])
	const [userLargePacks, setUserLargePacks] = useState([])

	useEffect(() => {
		getCurrentUser()
	}, [])

	useEffect(() => {
		setUserCoin(user.coin)
		setUserSmallPacks([...user.packs.filter((pack) => pack.name === 'small')])
		setUserMediumPacks([...user.packs.filter((pack) => pack.name === 'medium')])
		setUserLargePacks([...user.packs.filter((pack) => pack.name === 'large')])
	}, [getCurrentUser])

	useEffect(() => {
		if (cart.packs.length === 0) {
			getCurrentUser()
		}
	}, [cart])

	const addToCart = (pack) => {
		if (userCoin >= 600 && pack === 'small') {
			setUserCoin(userCoin - 600)
			setCart({
				total: cart.total + 600,
				packs: [...cart.packs, { name: 'small' }],
			})
		}
		if (userCoin >= 900 && pack === 'medium') {
			setUserCoin(userCoin - 900)
			setCart({
				total: cart.total + 900,
				packs: [...cart.packs, { name: 'medium' }],
			})
		}
		if (userCoin >= 1600 && pack === 'large') {
			setUserCoin(userCoin - 1600)
			setCart({
				total: cart.total + 1600,
				packs: [...cart.packs, { name: 'large' }],
			})
		}
		getCurrentUser()
	}

	const completePurchase = async () => {
		await axios.put('/api/profile', {
			coin: user.coin - cart.total,
		})
		await axios.put('api/profile/packs', {
			packs: [...user.packs, ...cart.packs],
		})
		setCart({ total: 0, packs: [] })
	}

	const resetCart = () => {
		setCart({ total: 0, packs: [] })
	}

	const openPack = async () => {
		let packSize
		if (pack === 'small') {
			packSize = 3
		}
		if (pack === 'medium') {
			packSize = 5
		}
		if (pack === 'large') {
			packSize = 10
		}
		const newPack = [...Array(packSize)]
		getRandomCards(newPack)
		newPack.forEach((card) => {
			assignRandomValues(card)
			axios.post('/api/collection/new', {
				user: user._id,
				number: card.number,
				name: card.name,
				rarity: card.rarity,
				element: card.element,
				image: card.image,
				values: card.values,
			})
		})
		setPackContents(newPack)
		if (pack === 'small') {
			userSmallPacks.pop()
		}
		if (pack === 'medium') {
			userMediumPacks.pop()
		}
		if (pack === 'large') {
			userLargePacks.pop()
		}
		const userPacks = [...userSmallPacks, ...userMediumPacks, ...userLargePacks]
		axios.put('/api/profile/packs', {
			packs: userPacks,
		})
		setPack(null)
	}

	const randomRarity = () => {
		const num = Math.random()
		if (num < 0.5) return 'Common'
		else if (num <= 0.75) return 'Uncommon'
		else if (num <= 0.9) return 'Rare'
		else if (num <= 0.975) return 'Epic'
		else return 'Legendary'
	}

	const getRandomCards = (pack) => {
		pack.forEach((_, i) => {
			const rarity = randomRarity()
			const currentRarityCards = allCards.filter(
				(card) => card.rarity === rarity
			)
			const randomCard =
				currentRarityCards[
					Math.floor(Math.random() * currentRarityCards.length)
				]
			pack.splice(i, 1, randomCard)
		})
	}

	return (
		<div className='packs page'>
			<div className='contents'>
				{packContents?.map((card, i) => (
					<Card key={card._id + i} card={card} player='p1' />
				))}
				{pack && (
					<button className='open box' onClick={(e) => openPack(e)}>
						Open Pack
					</button>
				)}
			</div>
			<div className='packs__bar'>
				<div className='coin'>
					{user.coin}
					<img src={coin} alt='coin' />
				</div>
				<div className='inventory'>
					<div className='pack'>
						<div className='purchase'>
							<BsFillPlusCircleFill onClick={() => addToCart('small')} />
							<p>
								600
								<img src={coin} alt={coin} />
							</p>
						</div>

						<img src={smallPack} alt='Small Pack' />
						<span>x {userSmallPacks.length}</span>
						<button
							className={`box ${pack === 'small' && 'active'} ${
								userSmallPacks.length === 0 && 'disabled'
							}`}
							onClick={() => {
								setPack('small'), setPackContents([])
							}}
						>
							Select
						</button>
					</div>
					<div className='pack'>
						<div className='purchase'>
							<BsFillPlusCircleFill onClick={() => addToCart('medium')} />
							<p>
								900
								<img src={coin} alt={coin} />
							</p>
						</div>
						<img src={mediumPack} alt='Medium Pack' />
						<span>x {userMediumPacks.length}</span>
						<button
							className={`box ${pack === 'medium' && 'active'} ${
								userMediumPacks.length === 0 && 'disabled'
							}`}
							onClick={() => {
								setPack('medium'), setPackContents([])
							}}
						>
							Select
						</button>
					</div>
					<div className='pack'>
						<div className='purchase'>
							<BsFillPlusCircleFill onClick={() => addToCart('large')} />
							<p>
								1600
								<img src={coin} alt={coin} />
							</p>
						</div>
						<img src={largePack} alt='Large Pack' />
						<span>x {userLargePacks.length}</span>
						<button
							className={`box ${pack === 'large' && 'active'} ${
								userLargePacks.length === 0 && 'disabled'
							}`}
							onClick={() => {
								setPack('large'), setPackContents([])
							}}
						>
							Select
						</button>
					</div>
				</div>
				{cart.total > 0 && (
					<div className='checkout'>
						<p>
							<span>Total :</span> {cart.total}
							<img src={coin} alt={coin} />
							<span className='clear' onClick={() => resetCart()}>
								X
							</span>
						</p>
						<button className='box' onClick={() => completePurchase()}>
							Purchase
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Packs
