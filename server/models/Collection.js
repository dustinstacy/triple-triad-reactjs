import { Schema, model } from 'mongoose'

// user obtained cards with added values and favorite option
const CollectionSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        rarity: {
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
        xp: {
            type: Number,
            default: 0,
        },
        level: {
            type: Number,
            default: 1,
        },
        timesPlayed: {
            type: Number,
            default: 0,
        },
        enemiesConverted: {
            type: Number,
            default: 0,
        },
        selected: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamp: true,
    }
)

const Collection = model('Collection', CollectionSchema)

export default Collection
