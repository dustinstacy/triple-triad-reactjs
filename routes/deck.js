import express from 'express'
import requiresAuth from '../middleware/permissions.js'
import Deck from '../models/Deck.js'

const router = express.Router()

// @route GET /api/deck/test
// @desc Test the auth route
// @access Public
router.get('/test', (req, res) => {
	res.send('Deck route working')
})

// @route GET /api/deck
// @desc Get user deck
// @access Private
router.get('/', requiresAuth, async (req, res) => {
	try {
		const deck = await Deck.find({ ...Deck })

		return res.json(deck)
	} catch (error) {
		return res.status(500).send(error.message)
	}
})

// @route POST /api/deck/add
// @route Add card to users deck
// @access Private
router.post('/new', requiresAuth, async (req, res) => {
	try {
		const { isValid, errors } = validateDeck(req.body)

		if (!isValid) {
			return res.status(400).json(errors)
		}

		const newDeck = new Deck({
			user: req.body.user,
			number: req.body.number,
			name: req.body.name,
			rarity: req.body.rarity,
			element: req.body.element,
			image: req.body.image,
			values: req.body.value,
		})

		await newDeck.save()
		return res.json(newDeck)
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

export default router
