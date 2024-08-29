import React, { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	className = "",
	...props
}) => {
	return (
		<div className={`mb-4 ${className}`}>
			{label && (
				<label
					className='block text-gray-700 text-sm font-bold mb-2  mt-3'
					htmlFor={props.id}>
					{label}
				</label>
			)}
			<input
				className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${className}`}
				{...props}
			/>
		</div>
	);
};

export default InputField;
