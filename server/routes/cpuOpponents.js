import express from 'express'
import requiresAuth from '../middleware/permissions.js'
import CPUOpponent from '../models/CPUOpponent.js'

const router = express.Router()

// @route GET /api/cpuOpponents/test
// @desc Test the auth route
// @access Public
router.get('/test', (req, res) => {
    res.send('CPU Opponent route working')
})

// @route GET /api/cpuOpponents
// @desc Get CPU Opponent
// @access Private
router.get('/', requiresAuth, async (req, res) => {
    try {
        const cpuOpponents = await CPUOpponent.find()

        return res.json(cpuOpponents)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

// @route POST /api/cpuOpponents/
// @route Add CPU Opponent
// @access Private
router.post('/', requiresAuth, async (req, res) => {
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

// @route DELETE /api/cpuOpponents/:cpuOpponentId
// @desc Remove CPU Opponent
// @access Private
router.delete('/:cpuOpponentId', requiresAuth, async (req, res) => {
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
