import React from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

interface SearchProps {
	setRenderChats: (value: boolean) => void;
	setSearchText: (text: string) => void;
	userName: string;
	fullName: string;
}

const Search: React.FC<SearchProps> = ({
	setRenderChats,
	setSearchText,
	userName,
	fullName,
}) => {
	const navigate = useNavigate();

	const renderChats = (text: string) => {
		if (text === "") {
			setRenderChats(false);
		} else {
			setRenderChats(true);
			setSearchText(text);
		}
	};

	const logOut = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<div className='h-[25%] w-full bg-gray-100 border-b-2 border-gray-200'>
			<div className='h-1/2 flex w-full items-center'>
				<div className='flex flex-col mt-14 w-6/12 ml-5'>
					<p className='text-2xl'>{fullName}</p>
					<p className='italic text-xl text-gray-600'>@{userName}</p>
				</div>
				<Button
					onClick={logOut}
					className='ml-auto mr-5 mt-auto bg-transparent !border-none !outline-none !text-teal-700 hover:bg-transparent text-xl'>
					<i className='fa-solid fa-right-from-bracket'></i>
				</Button>
			</div>
			<div className='h-1/2 flex items-center justify-center'>
				<input
					type='search'
					onChange={(e) => renderChats(e.target.value)}
					placeholder='Search or start new chat'
					className="w-[85%] h-[45%] text-lg rounded-full outline-none border-2 border-gray-200 px-12 bg-gray-50 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' class=\'bi bi-search\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z\'%3E%3C/path%3E%3C/svg%3E')] bg-no-repeat bg-[length:1.5rem] bg-left-4"
				/>
			</div>
		</div>
	);
};

export default Search;
