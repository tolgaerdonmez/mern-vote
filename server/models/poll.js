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
	expiresAt: {
		type: Date,
		default: Date.now,
	},
	expires: {
		type: Boolean,
		default: false,
	},
	isPrivate: {
		type: Boolean,
		default: false,
	},
	question: String,
	options: [optionSchema],
});

pollSchema.methods = {
	vote: function (optionId) {
		if (this.expires && this.expiresAt.getTime() < Date.now()) return false;
		const option = this.options.find(x => x._id == optionId);
		option.votes++;
		return option;
	},
};

export default mongoose.model("Poll", pollSchema);
