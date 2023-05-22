import { Schema, model } from 'mongoose'

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default:
                'https://res.cloudinary.com/dhsflmylz/image/upload/v1677514304/triple-triad/backgrounds/defaultPlayer_unuhf2.png',
        },
        color: {
            type: String,
            default: '#03303b',
        },

        level: {
            type: Number,
            default: 1,
        },
        xp: {
            type: Number,
            default: 0,
        },
        stats: {
            battles: {
                type: Number,
                default: 0,
            },
            wins: {
                type: Number,
                default: 0,
            },
            losses: {
                type: Number,
                default: 0,
            },
            draws: {
                type: Number,
                default: 0,
            },
        },
        defeatedEnemies: [],
        activeBattle: {
            type: Boolean,
            default: false,
        },
        coin: {
            type: Number,
            default: 0,
        },
        runes: {
            type: Number,
            default: 0,
        },
        inventory: [],
        onboarding: {
            firstLogin: {
                type: Boolean,
                default: true,
            },
            firstPurchase: {
                type: Boolean,
                default: true,
            },
            firstPack: {
                type: Boolean,
                default: true,
            },
            firstDeck: {
                type: Boolean,
                default: true,
            },
            firstBattle: {
                type: Boolean,
                default: true,
            },
        },
    },
    {
        timestamps: true,
    }
)

// export the model
const User = model('User', UserSchema)

export default User
