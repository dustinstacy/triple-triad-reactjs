import express from 'express'
import requiresAuth from '../middleware/permissions.js'
import Deck from '../models/Deck.js'
import CPUOpponent from '../models/CPUOpponent.js'

const router = express.Router()

// @route GET /api/cpuOpponent/test
// @desc Test the auth route
// @access Public
router.get('/test', (req, res) => {
    res.send('CPU Opponent route working')
})

// @route GET /api/cpuOpponent
// @desc Get CPU Opponent
// @access Private
router.get('/current', requiresAuth, async (req, res) => {
    try {
        const cpuOpponent = await CPUOpponent.find({ _id: req._id })

        return res.json(cpuOpponent)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

// @route POST /api/cpuOpponent/add
// @route Add CPU Opponent
// @access Private
router.post('/add', requiresAuth, async (req, res) => {
    try {
        const newCPUOpponent = new CPUOpponent({
            name: req.body.name,
            image: req.body.image,
            color: req.body.color,
            level: req.body.level,
            minPower: req.body.minPower,
            maxPower: req.body.maxPower,
            minDeckSize: req.body.minDeckSize,
            rewards: {
                xp: req.body.xp,
                coin: req.body.coin,
                cpuOpponent: req.body.card,
                items: req.body.items,
            },
        })

        await newCPUOpponent.save()
        return res.json(newCPUOpponent)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

// @route DELETE /api/cpuOpponent/:cpuOpponentId/remove
// @desc Remove CPU Opponent
// @access Private
router.delete('/:cpuOpponentId/remove', requiresAuth, async (req, res) => {
    try {
        const cpuOpponent = await CPUOpponent.findOne({
            _id: req.params.cpuOpponentId,
        })

        if (!cpuOpponent) {
            return res.status(404).json({ error: 'Opponent does not exist' })
        }

        await CPUOpponent.findByIdAndRemove({
            _id: req.params.cpuOpponentId,
        })

        return res.json({ success: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

export default router
