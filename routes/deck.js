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
router.post('/add', requiresAuth, async (req, res) => {
	try {
		const values = [1, 2, 3, 4]

		const newDeck = new Deck({
			user: req.body.user,
			number: req.body.number,
			name: req.body.name,
			rarity: req.body.rarity,
			element: req.body.element,
			image: req.body.image,
			values: values,
		})

		await newDeck.save()
		return res.json(newDeck)
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

// @route DELETE /api/deck/:deckId/remove
// @desc Remove card from user's deck
// @access Private
router.delete('/:deckId/remove', requiresAuth, async (req, res) => {
	try {
		const card = await Deck.findOne({
			user: req.body._id,
			_id: req.params.deckId,
		})

		if (!card) {
			return res.status(404).json({ error: 'Card does not exist' })
		}

		await Deck.findByIdAndRemove({
			user: req.body._id,
			_id: req.params.deckId,
		})

		return res.json({ success: true })
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

export default router
