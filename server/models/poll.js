import mongoose from "mongoose";
import User from "./user";

const Schema = mongoose.Schema;

const optionSchema = new Schema({
	option: String,
	votes: {
		type: Number,
		default: 0,
	},
});

const pollSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	question: String,
	options: [optionSchema],
});

export default mongoose.model("Poll", pollSchema);
