import express from 'express'
import requiresAuth from '../middleware/permissions.js'
import User from '../models/User.js'

const router = express.Router()

// @route GET /api/profile/test
// @desc Test the profile route
// @access Public
router.get('/test', (req, res) => {
	res.send('Auth route working')
})

// @route PUT /api/profile/
// @desc Update user's profile
// @access Private
router.put('/stats', requiresAuth, async (req, res) => {
	try {
		console.log(req.body)
		const updatedProfile = await User.findOneAndUpdate(
			{
				_id: req.user._id,
			},
			{
				stats: {
					xp: req.body.xp,
					matches: req.body.matches,
					wins: req.body.wins,
					losses: req.body.losses,
					draws: req.body.draws,
				},
			},
			{
				new: true,
			}
		)
		return res.json(updatedProfile)
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

// @route PUT /api/profile/
// @desc Update user's profile
// @access Private
router.put('/coin', requiresAuth, async (req, res) => {
	try {
		const updatedProfile = await User.findOneAndUpdate(
			{
				_id: req.user._id,
			},
			{
				coin: req.body.coin,
			},
			{
				new: true,
			}
		)
		return res.json(updatedProfile)
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

export default router
