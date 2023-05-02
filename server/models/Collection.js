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
