import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { useGlobalContext } from '../../context/GlobalContext'
import { assignRandomValues } from '../../../../utils/assignRandomValues'
import { Card } from '../../components'
import { smallPack, mediumPack, largePack, coin } from '../../assets'
import './Packs.scss'

const Packs = () => {
	const { allCards, user, getUserInventory, userInventory } = useGlobalContext()
	const [packSize, setPackSize] = useState(0)
	const [packContents, setPackContents] = useState([])
	const smallPacks = []
	const mediumPacks = []
	const largePacks = []
	let userCoin = 0

	userInventory.forEach((item) => {
		if (item.pack === 'small') {
			smallPacks.push(item)
		} else if (item.pack === 'medium') {
			mediumPacks.push(item)
		} else if (item.pack === 'large') {
			largePacks.push(item)
		}
		if (item.coin > 0) {
			userCoin += item.coin
		}
	})

	const allPacks = [...smallPacks, ...mediumPacks, ...largePacks]

	const openPack = async () => {
		if (
			(packSize === 3 && smallPacks.length > 0) ||
			(packSize === 5 && mediumPacks.length > 0) ||
			(packSize === 10 && largePacks.length > 0)
		) {
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
			if (packSize === 3) {
				let usedPack = smallPacks[0]._id
				axios.delete(`/api/inventory/${usedPack}/remove`, {
					user: user._id,
				})
			}
			if (packSize === 5) {
				let usedPack = mediumPacks[0]._id
				axios.delete(`/api/inventory/${usedPack}/remove`, {
					user: user._id,
				})
			}
			if (packSize === 10) {
				let usedPack = largePacks[0]._id
				axios.delete(`/api/inventory/${usedPack}/remove`, {
					user: user._id,
				})
			}
		}
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

	useEffect(() => {
		getUserInventory()
	}, ['', openPack])

	return (
		<div className='packs page'>
			<div className='contents'>
				{packContents?.map((card, i) => (
					<Card key={card._id} card={card} player='p1' />
				))}
			</div>
			<div className='packs__bar'>
				<div className='coin'>
					{userCoin}
					<img src={coin} alt='coin' />
				</div>
				<div className='inventory'>
					<div className='pack'>
						<BsFillPlusCircleFill />
						<img src={smallPack} alt='Small Pack' />
						<span>x {smallPacks.length}</span>
						<button
							className={`box ${packSize === 3 ? 'active' : ''}`}
							onClick={() => setPackSize(3)}
						>
							Select
						</button>
					</div>
					<div className='pack'>
						<BsFillPlusCircleFill />
						<img src={mediumPack} alt='Medium Pack' />
						<span>x {mediumPacks.length}</span>
						<button
							className={`box ${packSize === 5 ? 'active' : ''}`}
							onClick={() => setPackSize(5)}
						>
							Select
						</button>
					</div>
					<div className='pack'>
						<BsFillPlusCircleFill />
						<img src={largePack} alt='Large Pack' />
						<span> x {largePacks.length}</span>
						<button
							className={`box ${packSize === 10 ? 'active' : ''}`}
							onClick={() => setPackSize(10)}
						>
							Select
						</button>
					</div>
				</div>
				<button className='box' onClick={(e) => openPack(e)}>
					Open Pack
				</button>
			</div>
		</div>
	)
}

export default Packs
