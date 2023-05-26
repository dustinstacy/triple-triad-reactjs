// Middleware to check for existing username
import User from '../models/User.js'

const checkExistingUsername = async (req, res, next) => {
    try {
        const existingUsername = await User.findOne({
            username: new RegExp('^' + req.body.username + '$', 'i'),
        })
        if (existingUsername) {
            return res.status(400).json({ username: 'Username already taken' })
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default checkExistingUsername
