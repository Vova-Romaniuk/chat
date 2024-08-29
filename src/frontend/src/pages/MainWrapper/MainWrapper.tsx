import React, { useState, useEffect } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Chat from "../../components/Chat/Chat";
import { apiClient } from "../../app/appClient";
import { ClipLoader } from "react-spinners";
import { IUser, IChat } from "../../models";
import { IMessage } from "../../models";

const MainWrapper: React.FC = () => {
	const [friendId, setFriendId] = useState("");
	const [messages, setMessages] = useState();
	const [mediaState, setMediaState] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [user, setUser] = useState<IUser | null>(null);

	const fetchUserData = async () => {
		try {
			const { data } = await apiClient.get("auth/user");

			setUser({ ...data });
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const setChats = (data: IChat[]) => {
		if (user) {
			setUser({
				...user,
				userName: "ghgfhfhfhf",
				chats: data,
			});
		}
	};

	const deleteChats = (id: string) => {
		setUser((prevUser) => {
			if (!prevUser) return prevUser;

			const updatedChats = prevUser.chats.filter(
				(chat) => chat.chatId !== id
			);

			return {
				...prevUser,
				chats: updatedChats,
			};
		});
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	return isLoading ? (
		<div className='h-screen w-full flex items-center justify-center'>
			<ClipLoader />
		</div>
	) : (
		<div className='w-full h-screen grid  grid-cols-[35%_65%]'>
			<Sidebar
				setFriendId={setFriendId}
				messages={user?.chats || []}
				userName={user?.userName || ""}
				fullName={user?.fullName || ""}
				deleteChats={deleteChats}
				setMediaState={setMediaState}
			/>
			{true ? (
				<Chat
					friendId={friendId}
					setMessages={setChats}
					messages={user?.chats || []}
					setMediaState={setMediaState}
				/>
			) : (
				<div className='h-full w-full flex items-center'>
					<p className='text-2xl italic text-gray-500 p-4 rounded-lg  m-auto'>
						Select a chat to start messaging
					</p>
				</div>
			)}
		</div>
	);
};

export default MainWrapper;
