import express from 'express'
import requiresAuth from '../middleware/permissions.js'
import Collection from '../models/Collection.js'

const router = express.Router()

// @route GET /api/collection/test
// @desc Test the auth route
// @access Public
router.get('/test', (req, res) => {
	res.send('Collection route working')
})

// @route GET /api/collection
// @desc Get all user owned cards
// @access Private
router.get('/', requiresAuth, async (req, res) => {
	try {
		const collection = await Collection.find({ ...Collection })

		return res.json(collection)
	} catch (error) {
		return res.status(500).send(error.message)
	}
})

// @route POST /api/collection/add
// @route Add card to users collection
// @access Private
router.post('/new', requiresAuth, async (req, res) => {
	try {
		const { isValid, errors } = validateCollection(req.body)

		if (!isValid) {
			return res.status(400).json(errors)
		}

		const values = [1, 2, 3, 4]

		const newCollection = new Collection({
			user: req.body.user,
			number: req.body.number,
			name: req.body.name,
			rarity: req.body.name,
			element: req.body.name,
			image: req.body.image,
			values: values,
		})

		await newCollection.save()
		return res.json(newCollection)
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

export default router
