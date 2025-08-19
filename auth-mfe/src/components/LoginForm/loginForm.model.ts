import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginRequestDto } from "../../dto/login.dto";
import { AuthService } from "../../services/auth/auth.service";

export const useLoginFormModel = () => {
	const authService = new AuthService();

	const loginSchema = z.object({
		email: z.email("The email must be valid."),
		password: z
			.string()
			.min(6, "The password must be at least 6 characters long."),
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginRequestDto) => {
		try {
			const response = await authService.login(data);

			if (response) {
				localStorage.setItem("access_token", response.access_token);
				window.location.href = "/";
			}
		} catch (error: any) {
			setError("root", {
				type: "manual",
				message: error.response.data.message || "Error during login.",
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
