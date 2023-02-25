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
router.put('/', requiresAuth, async (req, res) => {
	try {
		const updatedProfile = await User.findOneAndUpdate(
			{
				_id: req.user._id,
			},
			{
				username: req.body.username,
				stats: {
					rank: req.body.rank,
					level: req.body.level,
					xp: req.body.xp,
					matches: req.body.matches,
					wins: req.body.wins,
					losses: req.body.losses,
					draws: req.body.draws,
				},
				coin: req.body.coin,
				backgrounds: req.body.backgrounds,
				frames: req.body.frames,
				inventory: {
					packs: req.body.packs,
					ingredients: req.body.ingredients,
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

export default router
