import express from 'express'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())

app.get('/', (req, res) => {
	res.send('Server Running')
})

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`)
})

// app.use('/api/auth', authRoute)

// mongoose
// 	.connect(process.env.MONGO_URI)
// 	.then(() => {
// 		console.log('Connected to database')

// 		app.listen(process.env.Port, () => {
// 			console.log(`Server running on port ${process.env.PORT}`)
// 		})
// 	})
// 	.catch((error) => {
// 		console.log(error)
// 	})
