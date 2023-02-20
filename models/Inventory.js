import { Schema, model } from 'mongoose'

// user cards selected from collection to use during a match
const InventorySchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		pack: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

const Inventory = model('Inventory', InventorySchema)

export default Inventory
