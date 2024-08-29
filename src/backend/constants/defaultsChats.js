const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const generateDefaultChats = () => {
	return [
		{
			chatId: new mongoose.Types.ObjectId(), // Генеруємо новий ObjectId для chatId
			name: "Volodymyr Zelenskyi",
			imageUrl:
				"https://cdn.mykyivregion.com.ua/uploads/img/7AcRJTTR31gkJTBGKjytFd3JbfCrUjGgBDYjLSk2.jpg",
			chat: {
				message: [
					{
						id: 0,
						text: "Hello",
						date_time: "19/08/22 04:34:35",
					},
					{
						id: 1,
						text: "Hello",
						date_time: "20/08/22 04:34:37",
					},
				],
			},
			last_message: {
				text: "",
				date: "",
			},
		},
		{
			chatId: new mongoose.Types.ObjectId(),
			name: "Elon Musk",
			imageUrl:
				"https://media.slovoidilo.ua/media/publications/19/186414/186414-1_large.jpg",
			chat: {
				message: [
					{
						id: 0,
						text: "Hi",
						date_time: "19/08/22 04:34:35",
					},
					{
						id: 1,
						text: "Hi",
						date_time: "20/08/22 04:34:33",
					},
					{
						id: 3,
						text: "Give me a joke",
						date_time: "20/08/22 04:34:35",
					},
					{
						id: 2,
						text: "Ok.. write me",
						date_time: "20/08/22 04:34:50",
					},
				],
			},
			last_message: {
				text: "",
				date: "",
			},
		},
	];
};

module.exports = generateDefaultChats;
