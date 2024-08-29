import React from "react";
import { ReactNode } from "react";
import Button from "../Button/Button";

interface DialogState {
	className?: string;
	onClick: (event: React.MouseEvent<HTMLElement>) => void;
	children: ReactNode;
	withoutCloseButton?: boolean;
}

export default function Dialog({
	children,
	className = "",
	onClick,
	withoutCloseButton = false,
}: DialogState) {
	return (
		<div
			onClick={onClick}
			className='w-screen bg-black/20 z-50 h-screen fixed top-0 left-0 flex'>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`rounded-md relative m-auto z-50 bg-white p-5 w-fit h-fit flex ${className}`}>
				{!withoutCloseButton && (
					<Button
						className='absolute top-0.5 right-0.5  bg-transparent !border-none !outline-nonehover:bg-transparent text-xl'
						onClick={onClick}>
						<i className='fa-solid fa-xmark text-red-700'></i>
					</Button>
				)}

				{children}
			</div>
		</div>
	);
}
