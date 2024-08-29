const mongoose = require("mongoose");
const MessageSchema = require("./Message");

const ChatSchema = new mongoose.Schema({
	chatId: { type: String, required: true },
	name: { type: String, required: true },
	imageUrl: { type: String },
	messages: {
		message: [MessageSchema],
	},
	last_message: {
		text: { type: String },
		date: { type: String },
	},
});

module.exports = ChatSchema;
