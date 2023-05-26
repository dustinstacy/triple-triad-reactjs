// Middleware to check for existing email
import User from '../models/User.js'

const checkExistingEmail = async (req, res, next) => {
    try {
        const existingEmail = await User.findOne({
            email: new RegExp('^' + req.body.email + '$', 'i'),
        })
        if (existingEmail) {
            return res
                .status(400)
                .json({ email: 'This email address is already registered' })
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default checkExistingEmail
