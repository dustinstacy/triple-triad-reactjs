import { Schema, model } from 'mongoose'

const DeckSchema = new Schema(
	{},
	{
		timestamps: true,
	}
)

const Deck = model('Deck', DeckSchema)

export default Deck
