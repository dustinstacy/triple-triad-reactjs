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
                image: req.body.image,
                color: req.body.color,
                defeatedEnemies: req.body.defeatedEnemies,
                activeBattle: req.body.activeBattle,
                coin: req.body.coin,
                runes: req.body.runes,
            }
        )
        return res.json(updatedProfile)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

// @route PUT /api/profile/stats
// @desc Update user's stats
// @access Private
router.put('/stats', requiresAuth, async (req, res) => {
    try {
        const updatedProfile = await User.findOneAndUpdate(
            {
                _id: req.user._id,
            },
            {
                level: req.body.level,
                xp: req.body.xp,
                stats: {
                    battles: req.body.battles,
                    wins: req.body.wins,
                    losses: req.body.losses,
                    draws: req.body.draws,
                },
            }
        )
        return res.json(updatedProfile)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

// @route PUT /api/profile/inventory
// @desc Update user's inventory
// @access Private
router.put('/inventory', requiresAuth, async (req, res) => {
    try {
        const updatedProfile = await User.findOneAndUpdate(
            {
                _id: req.user._id,
            },
            {
                inventory: req.body.inventory,
            }
        )
        return res.json(updatedProfile)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

// @route PUT /api/profile/onboarding
// @desc Update user's onboarding status
// @access Private
router.put('/onboarding', requiresAuth, async (req, res) => {
    try {
        const updatedProfile = await User.findOneAndUpdate(
            {
                _id: req.user._id,
            },
            {
                onboarding: {
                    firstLogin: req.body.firstLogin,
                    firstPurchase: req.body.firstPurchase,
                    firstPack: req.body.firstPack,
                    firstDeck: req.body.firstDeck,
                    firstBattle: req.body.firstBattle,
                },
            }
        )
        return res.json(updatedProfile)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

export default router
