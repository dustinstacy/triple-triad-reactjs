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

// @route PUT /api/profile/
// @desc Update user's profile
// @access Private
router.put('/', requiresAuth, async (req, res, next) => {
    try {
        const user = await User.findOne({
            _id: req.user._id,
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const {
            role,
            username,
            image,
            color,
            defeatedEnemies,
            activeBattle,
            coin,
            runes,
        } = req.body

        const updatedProfile = await User.findOneAndUpdate(
            {
                _id: req.user._id,
            },
            {
                role: role,
                username: username,
                image: image,
                color: color,
                defeatedEnemies: defeatedEnemies,
                activeBattle: activeBattle,
                coin: coin,
                runes: runes,
            },
            {
                new: true,
            }
        )
        return res.json(updatedProfile)
    } catch (error) {
        next(error)
    }
})

// @route PUT /api/profile/stats
// @desc Update user's stats
// @access Private
router.put('/stats', requiresAuth, async (req, res, next) => {
    try {
        const user = await User.findOne({
            _id: req.user._id,
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const { level, xp, battles, wins, losses, draws } = req.body

        const updatedProfile = await User.findOneAndUpdate(
            {
                _id: req.user._id,
            },
            {
                level: level,
                xp: xp,
                stats: {
                    battles: battles,
                    wins: wins,
                    losses: losses,
                    draws: draws,
                },
            },
            {
                new: true,
            }
        )
        return res.json(updatedProfile)
    } catch (error) {
        next(error)
    }
})

// @route PUT /api/profile/inventory
// @desc Update user's inventory
// @access Private
router.put('/inventory', requiresAuth, async (req, res, next) => {
    try {
        const user = await User.findOne({
            _id: req.user._id,
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const { inventory } = req.body

        const updatedProfile = await User.findOneAndUpdate(
            {
                _id: req.user._id,
            },
            {
                inventory: inventory,
            }
        )
        return res.json(updatedProfile)
    } catch (error) {
        next(error)
    }
})

// @route PUT /api/profile/onboarding
// @desc Update user's onboarding status
// @access Private
router.put('/onboarding', requiresAuth, async (req, res, next) => {
    try {
        const user = await User.findOne({
            _id: req.user._id,
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const { onboardingStage } = req.body

        const updatedProfile = await User.findOneAndUpdate(
            {
                _id: req.user._id,
            },
            {
                onboardingStage: onboardingStage,
            }
        )
        return res.json(updatedProfile)
    } catch (error) {
        next(error)
    }
})

export default router
