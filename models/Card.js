import { Schema, model } from 'mongoose'

const CardSchema = new Schema(
	{},
	{
		timestamp: true,
	}
)

const Card = model('Card', CardSchema)

export default Card
