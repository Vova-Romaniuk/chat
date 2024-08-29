import React, { useEffect } from "react";

interface HandleAlertProps {
	notification: {
		img: string;
		name: string;
		text: string;
	};
	setAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const HandleAlert: React.FC<HandleAlertProps> = ({
	notification,
	setAlert,
}) => {
	useEffect(() => {
		close_alert();
	}, [notification]);

	const close_alert = () => {
		setTimeout(() => setAlert(false), 3000);
	};

	const shortText = (text: string) => {
		if (text.length >= 30) {
			return text.substring(0, 40) + "...";
		} else return text;
	};

	return (
		<div className='absolute top-8 right-8 w-[400px] h-[100px] rounded-2xl p-1 flex items-center justify-between bg-gray-300 shadow-lg md:top-4 md:right-4 md:w-[250px] md:h-[100px] px-1'>
			<div className='w-[80px] h-[80px] md:w-[60px] md:h-[60px] rounded-full border border-black overflow-hidden'>
				<img
					src={notification.img}
					alt=''
					className='object-cover w-full h-full'
				/>
			</div>
			<div className='flex flex-col justify-center w-[70%]'>
				<p className='m-0 text-lg font-medium text-black md:text-base'>
					{notification.name}
				</p>
				<p className='m-0 text-sm text-black'>
					{shortText(notification.text)}
				</p>
				<p className='self-end mt-auto text-sm italic text-gray-400 mr-2 mb-2'>
					Just now
				</p>
			</div>
		</div>
	);
};

export default HandleAlert;
