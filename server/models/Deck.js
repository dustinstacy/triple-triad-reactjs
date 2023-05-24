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
        empower: {
            type: String,
        },
        weaken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const Deck = model('Deck', DeckSchema)

export default Deck
