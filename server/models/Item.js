import { Schema, model } from 'mongoose'

const ItemSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        level: {
            type: Number,
            required: true,
        },
        info: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
        },
        contents: {},
    },
    {
        timestamps: true,
    }
)

// export the model
const Item = model('Item', ItemSchema)

export default Item
