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

export default router
