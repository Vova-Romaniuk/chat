import React, { useState, useEffect } from "react";
import Chats from "../Chats/Chats";
import Search from "../Search/Search";
import { IChat } from "../../models";

interface SidebarProps {
	setFriendId: (id: string) => void;
	messages: IChat[];
	userName: string;
	fullName: string;
	deleteChats: (id: string) => void;
	setMediaState: (state: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
	setFriendId,
	messages,
	userName,
	fullName,
	deleteChats,
	setMediaState,
}) => {
	const [renderChats, setRenderChats] = useState(false);
	const [searchText, setSearchText] = useState("");

	return (
		<div className='w-full h-screen flex flex-col border-r border-gray-200'>
			<Search
				setRenderChats={setRenderChats}
				setSearchText={setSearchText}
				userName={userName}
				fullName={fullName}
			/>
			<Chats
				setFriendId={setFriendId}
				messages={messages}
				deleteChats={deleteChats}
				renderChats={renderChats}
				setMediaState={setMediaState}
				searchText={searchText}
			/>
		</div>
	);
};

export default Sidebar;
