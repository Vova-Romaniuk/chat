import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import AddChat from "../AddChat/AddChat";
import { apiClient } from "../../app/appClient";

interface ChatsProps {
	setFriendId: (id: string) => void;
	deleteChats: (id: string) => void;
	messages: any[];
	renderChats: boolean;
	searchText: string;
	setMediaState: (state: boolean) => void;
}

const Chats: React.FC<ChatsProps> = ({
	setFriendId,
	messages,
	renderChats,
	searchText,
	deleteChats,
	setMediaState,
}) => {
	const [chatsForName, setChatsForName] = useState<any[]>([]);
	const [chatsForMessage, setChatsForMessage] = useState<any[]>([]);
	const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
	const [isOpenDialogAddChat, setIsOpenDialogAddChat] =
		useState<boolean>(false);

	useEffect(() => {
		renderChatsForName(messages);
		renderChatsForMessage(messages);
	}, [searchText]);
	useEffect(() => {
		console.log(messages);
	}, [messages]);
	const shortText = (text: string) => {
		if (text.length >= 15) {
			return text.substring(0, 20) + "...";
		} else return text;
	};

	const renderChatsForName = (friends: any[]) => {
		const arr = friends.filter((element) =>
			element.name.includes(searchText)
		);
		setChatsForName(arr);
	};

	const renderChatsForMessage = (friends: any[]) => {
		let arr: any[] = [];
		friends.forEach((element) => {
			const arr_messages = element?.messages?.message.filter(
				(elem: any) => elem.text.includes(searchText)
			);
			arr.push({
				...element,
				messages: {
					message: arr_messages,
				},
			});
		});
		setChatsForMessage(arr);
	};

	const openDialogAddChat = () => {
		setIsOpenDialogAddChat(true);
	};

	const closeDialogAddChat = () => {
		setIsOpenDialogAddChat(false);
	};

	const deleteChat = async (id: string) => {
		await apiClient.delete(`/chat/chats/${id}`);
		deleteChats(id);
	};

	return (
		<div className='flex flex-col h-[75%]'>
			<div className='flex items-center h-[20%] justify-between'>
				<p className='text-lg text-teal-700 ml-8'>Chats</p>
				<Button
					onClick={openDialogAddChat}
					className='mr-5 bg-transparent !border-none !outline-none !text-teal-700 hover:bg-transparent text-xl'>
					<i className='fa-solid fa-plus'></i>
				</Button>
				{isOpenDialogAddChat && (
					<AddChat onClick={closeDialogAddChat} />
				)}
			</div>
			<div className='flex flex-col h-[80%] overflow-scroll'>
				{!renderChats ? (
					messages?.map((element, index) => (
						<div
							key={index}
							className='flex items-center relative justify-center h-[130px] cursor-pointer border-b-2 border-gray-200 hover:bg-gray-300'
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(-1)}
							onClick={() => {
								setFriendId(element.chatId);
								setMediaState(true);
							}}>
							<div className='flex justify-between w-[90%]'>
								<div className='flex items-center max-w-[80%]'>
									<div className='w-[100px] h-[100px] rounded-full overflow-hidden mr-4'>
										<img
											src={element.imageUrl}
											alt=''
											className='object-cover w-full h-full'
										/>
									</div>
									<div className='flex flex-col justify-center'>
										<p className='text-base font-medium'>
											{element.name}
										</p>
										<p className='text-sm text-gray-500'>
											{shortText(
												element.last_message.text
											)}
										</p>
									</div>
								</div>
								<p className='self-start text-sm italic text-gray-400'>
									{element.last_message.date}
								</p>
								{hoveredIndex === index && (
									<Button
										onClick={() =>
											deleteChat(element.chatId)
										}
										className='ml-auto absolute hover:scale-110 duration-200 right-5 bottom-5 mr-5 mt-auto bg-transparent !border-none !outline-none !text-red-700 hover:bg-transparent text-xl'>
										<i className='fa-solid fa-trash'></i>
									</Button>
								)}
							</div>
						</div>
					))
				) : (
					<div className='flex flex-col'>
						{chatsForName.map((element, index) => (
							<div
								key={index}
								className='flex items-center justify-center h-[130px] cursor-pointer border-b-2 border-gray-200 hover:bg-gray-300'
								onClick={() => {
									setFriendId(element.chatId);
								}}>
								<div className='flex justify-between w-[90%]'>
									<div className='flex items-center max-w-[80%]'>
										<div className='w-[100px] h-[100px] rounded-full overflow-hidden mr-4'>
											<img
												src={element.imageUrl}
												alt=''
												className='object-cover w-full h-full'
											/>
										</div>
										<div className='flex flex-col justify-center'>
											<p className='text-base font-medium'>
												{element.name}
											</p>
											<p className='text-sm text-gray-500'>
												{shortText(
													element.last_message.text
												)}
											</p>
										</div>
									</div>
									<p className='self-start text-sm italic text-gray-400'>
										{element.last_message.date}
									</p>
								</div>
							</div>
						))}

						<div className='flex items-center justify-center h-[50px] bg-gray-300'>
							<p className='text-lg text-gray-500'>
								{chatsForMessage.length} messages found
							</p>
						</div>

						{chatsForMessage?.map((element, index) =>
							element?.messages?.message?.map(
								(elem: any, subIndex: number) => (
									<div
										key={subIndex}
										className='flex items-center justify-center h-[130px] cursor-pointer border-b-2 border-gray-200 hover:bg-gray-300'
										onClick={() => {
											setFriendId(element.chatId);
										}}>
										<div className='flex justify-between w-[90%]'>
											<div className='flex items-center max-w-[80%]'>
												<div className='w-[100px] h-[100px] rounded-full overflow-hidden mr-4'>
													<img
														src={element.imageUrl}
														alt=''
														className='object-cover w-full h-full'
													/>
												</div>
												<div className='flex flex-col justify-center'>
													<p className='text-base font-medium'>
														{element.name}
													</p>
													<p className='text-sm text-gray-500'>
														{shortText(elem.text)}
													</p>
												</div>
											</div>
											<p className='self-start text-sm italic text-gray-400'>
												{elem.date_time}
											</p>
										</div>
									</div>
								)
							)
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Chats;
