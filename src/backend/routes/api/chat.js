const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");
const User = require("../../models/User.js");

router.post("/chats", auth, async (req, res) => {
	const { name, imageUrl } = req.body;

	try {
		const userId = mongoose.Types.ObjectId(req.user.id);
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}

		const newChat = {
			chatId: uuidv4(),
			name,
			imageUrl,
			messages: {
				message: [],
			},
			last_message: {
				text: "",
				date: "",
			},
		};

		user.chats.push(newChat);
		await user.save();

		res.json(user.chats);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.delete("/chats/:chatId", auth, async (req, res) => {
	const { chatId } = req.params;

	try {
		const user = await User.findById(req.user.id);

		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}

		user.chats = user.chats.filter((chat) => chat.chatId !== chatId);
		await user.save();

		res.json(user.chats);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/chats/:chatId/messages", auth, async (req, res) => {
	const { chatId } = req.params;
	const { id, text, date_time } = req.body;

	try {
		const user = await User.findById(req.user.id);

		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}

		const chat = user.chats.find((chat) => chat.chatId === chatId);

		if (!chat) {
			return res.status(404).json({ msg: "Chat not found" });
		}

		const newMessage = { id, text, date_time };
		chat.messages.message.push(newMessage);
		chat.last_message = { text, date: date_time };

		await user.save();

		res.json(chat);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
