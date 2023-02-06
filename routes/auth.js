import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validateRegisterInput from '../validation/registerValidation.js'
import requiresAuth from '../middleware/permissions.js'
import User from '../models/User.js'

const router = express.Router()

// @route GET /api/auth/test
// @desc Test the auth route
// @access Public
router.get('/test', (req, res) => {
	res.send('Auth route working')
})

// @route POST /api/auth/register
// @desc Create a new user
// @access Public
router.post('/register', async (req, res) => {
	try {
		const { errors, isValid } = validateRegisterInput(req.body)

		if (!isValid) {
			return res.status(400).json(errors)
		}

		const existingEmail = await User.findOne({
			email: new RegExp('^' + req.body.email + '$', 'i'),
		})
		if (existingEmail) {
			return res
				.status(400)
				.json({ error: 'This email address is already registered' })
		}

		const existingUsername = await User.findOne({
			username: new RegExp('^' + req.body.username + '$', 'i'),
		})
		if (existingUsername) {
			return res.status(400).json({ error: 'Username already taken' })
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 12)

		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		})

		const savedUser = await newUser.save()
		const payload = { userId: savedUser._id }
		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
		res.cookie('access-token', token, {
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
		})

		const userToReturn = { ...savedUser._doc }
		delete userToReturn.password
		return res.json(userToReturn)
	} catch (error) {
		console.log(error)
		res.status(500).send(error.message)
	}
})

// @route Post /api/auth/login
// @desc Login user and return an access token
// @access Public
router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({
			username: new RegExp('^' + req.body.username + '$', 'i'),
		})
		if (!user) {
			return res.status(400).json({ error: 'Invalid login credentials' })
		}

		const passwordMatch = await bcrypt.compare(req.body.password, user.password)
		if (!passwordMatch) {
			return res.status(400).json({ error: 'Invalid login credentials' })
		}

		const payload = { userId: user._id }
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: '7d',
		})
		res.cookie('access-token', token, {
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
		})

		const userToReturn = { ...user._doc }
		delete userToReturn.password
		return res.json({
			token: token,
			user: userToReturn,
		})
	} catch (error) {
		return res.status(500).send(error.message)
	}
})

// @route Get /api/auth/current
// @desc Return currently authed user
// @access Private
router.get('/current', requiresAuth, (req, res) => {
	if (!req.user) {
		return res.status(401).send('Unauthorized')
	}

	return res.json(req.user)
})

// @route Put /api/auth/logout
// @desc Logout user and clear the cookie
// @access Private
router.put('/logout', requiresAuth, async (req, res) => {
	try {
		res.clearCookie('access-token')

		return res.json({ success: true })
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

export default router
