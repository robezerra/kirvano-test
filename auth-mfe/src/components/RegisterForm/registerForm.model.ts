import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthService } from "../../services/auth/auth.service";
import { RegisterRequestDto } from "../../dto/register.dto";

export const useRegisterFormModel = () => {
	const authService = new AuthService();

	const registerSchema = z
		.object({
			name: z.string().min(2, "The name must be at least 2 characters long."),
			email: z.email("The email must be valid."),
			password: z
				.string()
				.min(6, "The password must be at least 6 characters long."),
			confirmPassword: z
				.string()
				.min(6, "The password must be at least 6 characters long."),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "The passwords must match.",
			path: ["confirmPassword"],
		});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterRequestDto) => {
		try {
			const response = await authService.register(data);

			if (response) {
				localStorage.setItem("access_token", response.access_token);
				window.location.href = "/";
			}
		} catch (error: any) {
			setError("root", {
				type: "manual",
				message: error.response.data.message || "Error during registration.",
			});
		}
	};

	return {
		register,
		handleSubmit,
		errors,
		isSubmitting,
		onSubmit,
	};
};
