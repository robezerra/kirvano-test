import {
	FieldErrors,
	UseFormHandleSubmit,
	UseFormRegister,
} from "react-hook-form";

import { Input } from "../Input";
import { LoginRequestDto } from "../../dto/login.dto";

interface LoginFormProps {
	onSubmit: (data: LoginRequestDto) => Promise<void>;
	register: UseFormRegister<{
		email: string;
		password: string;
	}>;
	handleSubmit: UseFormHandleSubmit<
		{
			email: string;
			password: string;
		},
		{
			email: string;
			password: string;
		}
	>;
	errors: FieldErrors<{
		email: string;
		password: string;
	}>;
	isSubmitting: boolean;
}

export default function LoginFormView(props: LoginFormProps) {
	const { onSubmit, register, handleSubmit, errors, isSubmitting } = props;

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-4 max-w-sm mx-auto w-full"
		>
			<h2 className="text-2xl font-bold text-center mb-6">Login</h2>
			<div>
				<Input
					id="email"
					type="text"
					placeholder="e-mail"
					{...register("email")}
				/>
				{errors.email && (
					<p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
				)}
			</div>
			<div>
				<Input
					id="password"
					type="password"
					placeholder="password"
					{...register("password")}
				/>
				{errors.password && (
					<p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
				)}
			</div>
			<button
				type="submit"
				disabled={isSubmitting}
				className={`w-full py-2 px-4 mt-2 rounded-md text-white font-semibold transition duration-300 ${
					isSubmitting
						? "bg-gray-400 cursor-not-allowed"
						: "bg-blue-600 hover:bg-blue-700"
				}`}
			>
				{isSubmitting ? "Loading..." : "Sign-in"}
			</button>
			{errors.root && (
				<p className="text-red-500 text-xs mt-1">{errors.root.message}</p>
			)}
		</form>
	);
}
