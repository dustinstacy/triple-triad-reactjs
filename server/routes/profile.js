import express from 'express'
import { requiresAuth } from '../middleware/permissions.js'
import {
    checkForExistingEmail,
    checkForExistingUsername,
    validateRegisterInput,
} from '../validation/registerValidation.js'
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
router.put(
    '/:action',
    requiresAuth,
    checkForExistingEmail,
    checkForExistingUsername,
    async (req, res, next) => {
        try {
            const user = await User.findOne({ _id: req.user._id })
            const { errors, isValid } = validateRegisterInput(req.body)

            if (!isValid) {
                return res.status(400).json(errors)
            }

            let updatedFields = {}
            switch (req.params.action) {
                case 'info':
                    updatedFields = {
                        role: req.body.role || user.role,
                        username: req.body.username || user.username,
                        email: req.body.email || user.email,
                        image: req.body.image || user.image,
                        color: req.body.color || user.color,
                        defeatedEnemies:
                            req.body.defeatedEnemies || user.defeatedEnemies,
                        activeBattle:
                            req.body.activeBattle || user.activeBattle,
                        coin: req.body.coin || user.coin,
                        runes: req.body.runes || user.runes,
                    }
                    break
                case 'stats':
                    updatedFields = {
                        level: req.body.level || user.level,
                        xp: req.body.xp || user.xp,
                        stats: {
                            battles: req.body.battles || user.stats.battles,
                            wins: req.body.wins || user.stats.wins,
                            losses: req.body.losses || user.stats.losses,
                            draws: req.body.draws || user.stats.draws,
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

            const updatedUser = await User.findOneAndUpdate(
                { _id: req.user._id },
                updatedFields,
                { new: true }
            )

            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }

            return res.json(updatedUser)
        } catch (error) {
            next(error)
        }
    }
)

export default router
