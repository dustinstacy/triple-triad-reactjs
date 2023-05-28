import express from 'express'
import { requiresAuth } from '../middleware/permissions.js'
import User from '../models/User.js'

const router = express.Router()

// @route GET /api/profile/test
// @desc Test the profile route
// @access Public
router.get('/test', (req, res) => {
    res.send('Auth route working')
})

// @route PUT /api/profile/:action
// @desc Update user's profile
// @access Private
router.put('/:action', requiresAuth, async (req, res, next) => {
    try {
        let updatedFields = {}

        switch (req.params.action) {
            case 'info':
                updatedFields = {
                    role: req.body.role,
                    username: req.body.username,
                    image: req.body.image,
                    color: req.body.color,
                    defeatedEnemies: req.body.defeatedEnemies,
                    activeBattle: req.body.activeBattle,
                    coin: req.body.coin,
                    runes: req.body.runes,
                }
                break
            case 'stats':
                updatedFields = {
                    level: req.body.level,
                    xp: req.body.xp,
                    stats: {
                        battles: req.body.battles,
                        wins: req.body.wins,
                        losses: req.body.losses,
                        draws: req.body.draws,
                    },
                }
                break
            case 'inventory':
                updatedFields = {
                    inventory: req.body.inventory,
                }
                break
            case 'onboarding':
                updatedFields = {
                    onboardingStage: req.body.onboardingStage,
                }
                break
            default:
                return res.status(400).json({ error: 'Invalid action' })
        }

        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            updatedFields,
            { new: true }
        )

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        return res.json(user)
    } catch (error) {
        next(error)
    }
})

export default router
