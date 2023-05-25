import express from 'express'
import requiresAuth from '../middleware/permissions.js'
import Item from '../models/Item.js'

const router = express.Router()

// @route GET /api/items/test
// @desc Test the items route
// @access Public
router.get('/test', (req, res) => {
    res.send('Items route working')
})

// @route GET /api/items
// @desc Get all items
// @access Private
router.get('/', requiresAuth, async (req, res) => {
    try {
        const items = await Item.find()

        return res.json(items)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

// @route POST /api/items/
// @desc Add item to database
// @access Private
router.post('/', requiresAuth, async (req, res) => {
    try {
        const newItem = new Item({
            name: req.body.name,
            image: req.body.image,
            type: req.body.type,
            level: req.body.level,
            info: req.body.info,
            price: req.body.price,
            contents: req.body.contents,
        })

        await newItem.save()
        return res.json(newItem)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

// @route PUT /api/items/:itemId
// @desc Update item in database
// @access Private
router.put('/:itemId', requiresAuth, async (req, res) => {
    try {
        const updatedItem = await Item.findOneAndUpdate(
            {
                _id: req.params.itemId,
            },
            {
                name: req.body.name,
                image: req.body.image,
                type: req.body.type,
                level: req.body.level,
                info: req.body.info,
                price: req.body.price,
                contents: req.body.contents,
            },
            {
                new: true,
            }
        )
        return res.json(updatedItem)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

// @route DELETE /api/items/:itemId/remove
// @desc Remove item from database
// @access Private
router.delete('/:itemId', requiresAuth, async (req, res) => {
    try {
        const item = await Item.findOne({
            _id: req.params.itemId,
        })

        if (!item) {
            return res.status(404).json({ error: 'Item does not exist' })
        }

        await Item.findByIdAndRemove({
            _id: req.params.itemId,
        })

        return res.json({ success: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

export default router
