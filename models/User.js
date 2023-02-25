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
		stats: {
			rank: {
				type: Number,
				default: 1,
			},
			level: {
				type: Number,
				default: 1,
			},
			xp: {
				type: Number,
				default: 0,
			},
			matches: {
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
		coin: {
			type: Number,
			default: 0,
		},
		backgrounds: {
			type: String,
		},
		frames: [{ name: String }],
		inventory: {
			packs: [{ name: String }],
			ingredients: [{ name: String }],
		},
	},
	{
		timestamps: true,
	}
)

// export the model
const User = model('User', UserSchema)

export default User
