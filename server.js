import express from 'express'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.js'

const app = express()
dotenv.config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use('/api/auth', authRoute)

app.get('/', (req, res) => {
	res.send('Server Running')
})

mongoose.set('strictQuery', true)
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('*****Connected to database*****')

		app.listen(process.env.Port, () => {
			console.log(`Server running on port ${process.env.PORT}`)
		})
	})
	.catch((error) => {
		console.log(error)
	})
