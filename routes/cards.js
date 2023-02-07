import express from 'express'
import requiresAuth from '../middleware/permissions.js'
import Card from '../models/Card.js'

const router = express.Router()

// @route GET /api/cards/test
// @desc Test the auth route
// @access Public
router.get('/test', (req, res) => {
	res.send('Cards route working')
})

export default router
