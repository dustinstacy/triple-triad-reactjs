import { Schema, model } from 'mongoose'

// user cards selected from collection to use during a match
const DeckSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		number: {
			type: String,
			required: true,
		},
		_id: {
			type: Schema.Types.ObjectId,
			ref: 'Collection',
		},
		name: {
			type: String,
			required: true,
		},
		rarity: {
			type: String,
			required: true,
		},
		element: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		values: [
			{
				type: String,
				required: true,
			},
		],
	},
	{
		timestamps: true,
	}
)

const Deck = model('Deck', DeckSchema)

export default Deck
