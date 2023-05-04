import { Schema, model } from 'mongoose'

// user cards selected from collection to use during a match
const DeckSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Collection',
        },
        number: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        rarity: {
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
        level: {
            type: Number,
            required: true,
        },
        element: {
            type: String,
        },
        weakness: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const Deck = model('Deck', DeckSchema)

export default Deck
