import React, { useState } from "react";
import DOMPurify from "dompurify";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ onChange, ...props }: InputProps) => {
	const [value, setValue] = useState("");

	const sanitizeInput = (input: string) => {
		return DOMPurify.sanitize(input).replace(/['";\-]/g, "");
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const sanitizedValue = sanitizeInput(event.target.value);
		setValue(sanitizedValue);
		if (onChange) onChange(event);
	};

	return (
		<input
			type="text"
			className="px-3 py-2 border border-gray-300 rounded w-full dark:bg-gray-800 dark:text-white"
			value={value}
			onChange={handleChange}
			{...props}
		/>
	);
};
