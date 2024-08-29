export interface IMessage {
	id: number;
	text: string;
	date_time: string;
}

export interface IChat {
	chatId: string;
	name: string;
	imageUrl?: string;
	messages: {
		message: IMessage[];
	};
	last_message: {
		text: string;
		date: string;
	};
}

export interface IUser {
	id: string;
	fullName: string;
	userName: string;
	email: string;
	password?: string;
	avatar: string;
	chats: IChat[];
}

export interface IAuthResponse {
	token: string;
	user: IUser;
}
