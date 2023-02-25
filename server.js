import express from 'express'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.js'
import cardsRoute from './routes/cards.js'
import collectionRoute from './routes/collection.js'
import deckRoute from './routes/deck.js'
import profileRoute from './routes/profile.js'

dotenv.config()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use('/api/auth', authRoute)
app.use('/api/cards', cardsRoute)
app.use('/api/collection', collectionRoute)
app.use('/api/deck', deckRoute)
app.use('/api/profile', profileRoute)

app.get('/', (req, res) => {
	res.send('Server Running')
})

mongoose.set('strictQuery', true)
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('*****Connected to database*****')

		app.listen(process.env.Port, () => {
			console.log(`Server running on http://localhost:${process.env.PORT}`)
		})
	})
	.catch((error) => {
		console.log(error)
	})
