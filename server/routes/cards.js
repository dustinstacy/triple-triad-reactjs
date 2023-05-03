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

// @route GET /api/cards
// @desc Get all released cards
// @access Private
router.get('/', async (req, res) => {
    try {
        const cards = await Card.find({ ...Card })

        return res.json(cards)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

// @route POST /api/cards/new
// @desc Release new card
// @access Admin
router.post('/new', requiresAuth, async (req, res) => {
    try {
        const newCard = new Card({
            number: req.body.number,
            name: req.body.name,
            rarity: req.body.rarity,
            element: req.body.element,
            image: req.body.image,
        })

        await newCard.save()
        return res.json(newCard)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

// @route PUT /api/cards/:number
// @desc Update released card
// @desc Admin
router.put('/:cardsId', requiresAuth, async (req, res) => {
    try {
        const card = await Card.findOne({
            _id: req.params.cardsId,
        })

        if (!card) {
            return res.status(404).json({ error: 'Could not find Card' })
        }

        const updatedCard = await Card.findOneAndUpdate(
            {
                _id: req.params.cardsId,
            },
            {
                number: req.body.number,
                name: req.body.name,
                rarity: req.body.rarity,
                element: req.body.element,
                image: req.body.image,
            },
            {
                new: true,
            }
        )

        return res.json(updatedCard)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

// @route DELETE /api/cards/:number/delete
// @desc Remove released card
// @access Admin
router.delete('/:number/delete', requiresAuth, async (req, res) => {
    try {
        const card = await Card.findOne({
            number: req.params.number,
        })

        if (!card) {
            return res.status(404).json({ error: 'Could not find Card' })
        }

        await Card.findOneAndRemove({
            number: req.params.number,
        })

        return res.json({ success: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

export default router
