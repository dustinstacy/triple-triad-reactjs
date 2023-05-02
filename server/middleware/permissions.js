import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const requiresAuth = async (req, res, next) => {
    const token = req.cookies['access-token']
    let isAuthed = false

    if (token) {
        try {
            const { userId } = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(userId)

            if (user) {
                const userToReturn = { ...user._doc }
                delete userToReturn.password
                req.user = userToReturn
                isAuthed = true
            }
        } catch {
            isAuthed = false
        }
    }

    if (!isAuthed) {
        return res.status(401).send('Unauthorized')
    }

    return next()
}

export default requiresAuth
