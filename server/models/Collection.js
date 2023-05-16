import { Schema, model } from 'mongoose'

// user obtained cards with added values and favorite option
const CollectionSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
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
            default: 1,
        },
        selected: {
            type: Boolean,
            default: false,
        },
        element: {
            type: String,
        },
        weakness: {
            type: String,
        },
        timesPlayed: {
            type: Number,
            default: 0,
        },
        enemyCaptures: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamp: true,
    }
)

const Collection = model('Collection', CollectionSchema)

export default Collection
