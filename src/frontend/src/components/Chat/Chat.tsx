import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import HandleAlert from "../HandleAlert/HandleAlert";
import { apiClient } from "../../app/appClient";

interface ChatProps {
	friendId: string;
	setMessages: React.Dispatch<React.SetStateAction<any>>;
	setMediaState: React.Dispatch<React.SetStateAction<boolean>>;
	messages: any;
}

const Chat: React.FC<ChatProps> = ({
	friendId,
	setMessages,
	setMediaState,
	messages,
}) => {
	const [message, setMessage] = useState("");
	const [notification, setNotification] = useState<any>({});
	const [isSendMessage, setIsSendMessage] = useState<boolean>(false);
	const scroll_down = useRef<HTMLDivElement>(null);
	const [alert, setAlert] = useState(false);

	useEffect(() => {
		scroll_down.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const setFriendMessages = () => {
		axios.get(`https://api.chucknorris.io/jokes/random`).then((res) => {
			setNotification({
				name: messages.find((x: any) => x.chatId === friendId)?.name,
				img: messages.find((x: any) => x.chatId === friendId)?.imageUrl,
				text: res.data.value,
			});
			getFriendMessage(res.data.value);
		});
	};

	const getFriendMessage = async (text: string) => {
		const date = new Date();
		setAlert(true);

		var moment_date = moment(date).format("DD/MM/YY hh:mm:ss");
		let res_ls = messages;
		let arr_not_enum_id =
			res_ls
				.find((x: any) => x.chatId === friendId)
				?.messages.message.filter((elem: any) => elem.id % 2 === 0) ||
			[];

		let ob = {
			id:
				arr_not_enum_id.length === 0
					? 2
					: arr_not_enum_id[arr_not_enum_id.length - 1].id + 2,
			text: text,
			date_time: moment_date,
		};
		await apiClient.post(`/chat/chats/${friendId}/messages`, ob);
		res_ls
			.find((x: any) => x.chatId === friendId)
			.messages.message.push(ob);

		res_ls.find((x: any) => x.chatId === friendId).last_message = {
			text: text,
			date_time: moment_date,
		};

		setMessages(res_ls);
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		message !== "" && send_message(message);
		setMessage("");
		setTimeout(setFriendMessages, 5000);
	};

	const send_message = async (text: string) => {
		const date = new Date();
		var moment_date = moment(date).format("DD/MM/YY hh:mm:ss");
		let res_ls = messages;

		let arr_not_enum_id =
			res_ls
				.find((x: any) => x.chatId === friendId)
				?.messages?.message?.filter((elem: any) => elem.id % 2 !== 0) ||
			[];

		let ob = {
			id:
				arr_not_enum_id.length === 0
					? 1
					: arr_not_enum_id[arr_not_enum_id.length - 1].id + 2,
			text: text,
			date_time: moment_date,
		};
		await apiClient.post(`/chat/chats/${friendId}/messages`, ob);
		res_ls
			.find((x: any) => x.chatId === friendId)
			.messages.message.push(ob);
		res_ls.find((x: any) => x.chatId === friendId).last_message = {
			text: text,
			date_time: moment_date,
		};

		setMessages([...res_ls]);
	};

	return friendId === "" ? (
		<div className='flex items-center justify-center h-full text-lg font-semibold text-gray-500'>
			<p>Choose a friend</p>
		</div>
	) : (
		<div className='grid h-screen grid-rows-[15%_65%_20%]'>
			{alert && (
				<HandleAlert notification={notification} setAlert={setAlert} />
			)}

			<div className='flex items-center bg-gray-200'>
				{!false && (
					<>
						<div className='flex items-center justify-between w-full px-6 py-4'>
							<div className='flex items-center'>
								<div className='w-16 h-16 overflow-hidden rounded-full'>
									<img
										src={
											messages?.find(
												(x: any) =>
													x.chatId === friendId
											)?.imageUrl
										}
										alt=''
										className='object-cover w-full h-full'
									/>
								</div>
								<p className='ml-4 text-2xl font-semibold text-gray-700'>
									{
										messages?.find(
											(x: any) => x.chatId === friendId
										)?.name
									}
								</p>
							</div>
						</div>
					</>
				)}
			</div>

			<div className='bg-gray-100 h-[65vh]'>
				<div className='flex flex-col p-4 overflow-y-scroll h-full'>
					{messages
						?.find((x: any) => x.chatId === friendId)
						?.messages?.message.map((element: any, index: number) =>
							+element.id % 2 === 0 ? (
								<div
									key={index}
									className='flex flex-col items-start mb-4 max-w-[60%]'>
									<div className='px-4 py-3 text-white bg-gray-800 rounded-lg'>
										<p>{element.text}</p>
									</div>
									<p className='mt-1 text-sm text-gray-500'>
										{element.date_time}
									</p>
								</div>
							) : (
								<div
									key={index}
									className='flex flex-col items-end mb-4 max-w-[60%] self-end'>
									<div className='px-4 py-3 text-gray-700 bg-gray-300 rounded-lg'>
										<p>{element.text}</p>
									</div>
									<p className='mt-1 text-sm text-gray-500'>
										{element.date_time}
									</p>
								</div>
							)
						)}
					<div ref={scroll_down}></div>
				</div>
			</div>

			<div className='flex items-center justify-center bg-gray-200'>
				<form
					onSubmit={onSubmit}
					className='flex items-center w-4/5 p-3 bg-white rounded-full shadow-lg'>
					<input
						type='text'
						onChange={(e) => setMessage(e.target.value)}
						placeholder='Type your message'
						value={message}
						className='flex-grow px-4 py-2 text-xl text-gray-700 bg-transparent border-none focus:outline-none'
					/>
					<button
						type='submit'
						disabled={message === ""}
						className='p-2'>
						<svg
							fill='none'
							viewBox='0 0 24 24'
							height='24'
							width='24'
							xmlns='http://www.w3.org/2000/svg'
							className='w-6 h-6 transform rotate-90 text-gray-600 hover:text-gray-800'>
							<path
								xmlns='http://www.w3.org/2000/svg'
								d='M12 2C12.3788 2 12.725 2.214 12.8944 2.55279L21.8944 20.5528C22.067 20.8978 22.0256 21.3113 21.7882 21.6154C21.5508 21.9195 21.1597 22.0599 20.7831 21.9762L12 20.0244L3.21694 21.9762C2.84035 22.0599 2.44921 21.9195 2.2118 21.6154C1.97439 21.3113 1.93306 20.8978 2.10558 20.5528L11.1056 2.55279C11.275 2.214 11.6212 2 12 2ZM13 18.1978L19.166 19.568L13 7.23607V18.1978ZM11 7.23607L4.83402 19.568L11 18.1978V7.23607Z'
								fill='currentColor'
							/>
						</svg>
					</button>
				</form>
			</div>
		</div>
	);
};

export default Chat;
