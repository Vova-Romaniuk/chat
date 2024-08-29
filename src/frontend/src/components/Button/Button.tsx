import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
	className = "",
	children,
	...props
}) => {
	return (
		<button
			className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none ${className}`}
			{...props}>
			{children}
		</button>
	);
};

export default Button;
