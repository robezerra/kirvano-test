import React, { InputHTMLAttributes, forwardRef } from "react";
import DOMPurify from "dompurify";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ onChange, value: propValue, ...props }, ref) => {
		const sanitizeInput = (input: string) => {
			return DOMPurify.sanitize(input).replace(/['";\-]/g, "");
		};

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const sanitizedValue = sanitizeInput(event.target.value);

			const newEvent = {
				...event,
				target: {
					...event.target,
					value: sanitizedValue,
				},
			};

			if (onChange) onChange(newEvent);
		};

		return (
			<input
				ref={ref}
				className="px-3 py-2 border border-gray-300 rounded w-full dark:bg-gray-800 dark:text-white"
				onChange={handleChange}
				{...props}
			/>
		);
	}
);

Input.displayName = "Input";
