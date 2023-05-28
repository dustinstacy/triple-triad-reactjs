import { Schema, model } from 'mongoose'

const CPUOpponentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: '#9e0e24',
        },
        level: {
            type: Number,
            required: true,
        },
        deckOdds: {},
        minPower: {
            type: Number,
            required: true,
        },
        maxPower: {
            type: Number,
            required: true,
        },
        minDeckSize: {
            type: Number,
            required: true,
        },
        rewards: {
            xp: {
                type: Number,
                required: true,
            },
            coin: {
                type: Number,
                required: true,
            },
            card: {
                type: String,
                required: true,
            },
            items: [],
        },
    },
    {
        timestamps: true,
    }
)

// export the model
const CPUOpponent = model('CPUOpponent', CPUOpponentSchema)

export default CPUOpponent
