const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
	id: { type: Number, required: true },
	text: { type: String, required: true },
	date_time: { type: String, required: true },
});

module.exports = MessageSchema;
