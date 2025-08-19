import {
	FieldErrors,
	UseFormHandleSubmit,
	UseFormRegister,
} from "react-hook-form";

import { Input } from "../Input";
import { RegisterRequestDto } from "../../dto/register.dto";

interface RegisterFormViewProps {
	onSubmit: (data: RegisterRequestDto) => Promise<void>;
	register: UseFormRegister<{
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
	}>;
	handleSubmit: UseFormHandleSubmit<
		{
			name: string;
			email: string;
			password: string;
		},
		{
			name: string;
			email: string;
			password: string;
		}
	>;
	errors: FieldErrors<{
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
	}>;
	isSubmitting: boolean;
}

export const RegisterFormView = (props: RegisterFormViewProps) => {
	const { onSubmit, register, handleSubmit, errors, isSubmitting } = props;

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-4 max-w-sm mx-auto w-full"
		>
			<h2 className="text-2xl font-bold text-center mb-6">Register</h2>

			<div>
				<Input id="name" type="text" placeholder="name" {...register("name")} />
				{errors.name && (
					<p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
				)}
			</div>

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

			<div>
				<Input
					id="confirmPassword"
					type="password"
					placeholder="confirm password"
					{...register("confirmPassword")}
				/>
				{errors.confirmPassword && (
					<p className="text-red-500 text-xs mt-1">
						{errors.confirmPassword.message}
					</p>
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
				{isSubmitting ? "Loading..." : "Register"}
			</button>
			{errors.root && (
				<p className="text-red-500 text-xs mt-1">{errors.root.message}</p>
			)}
		</form>
	);
};
