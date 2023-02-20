import express from 'express'
import requiresAuth from '../middleware/permissions.js'
import Inventory from '../models/Inventory.js'

const router = express.Router()

// @route GET /api/inventory/test
// @desc Test the auth route
// @access Public
router.get('/test', (req, res) => {
	res.send('Inventory route working')
})

// @route GET /api/inventory/current
// @desc Get user inventory
// @access Private
router.get('/current', requiresAuth, async (req, res) => {
	try {
		const inventory = await Inventory.find({ user: req.user._id })

		return res.json(inventory)
	} catch (error) {
		return res.status(500).send(error.message)
	}
})

// @route POST /api/inventory/add
// @route Add to users inventory
// @access Private
router.post('/add', requiresAuth, async (req, res) => {
	try {
		const newInventory = new Inventory({
			user: req.body.user,
			pack: req.body.pack,
			coin: req.body.coin,
		})

		await newInventory.save()
		return res.json(newInventory)
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

// @route DELETE /api/inventory/:inventoryId/remove
// @desc Remove from user's inventory
// @access Private
router.delete('/:inventoryId/remove', requiresAuth, async (req, res) => {
	try {
		const item = await Inventory.findOne({
			user: req.user._id,
			_id: req.params.inventoryId,
		})

		if (!item) {
			return res.status(404).json({ error: 'Item does not exist' })
		}

		await Inventory.findByIdAndRemove({
			user: req.body._id,
			_id: req.params.inventoryId,
		})

		return res.json({ success: true })
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

export default router
