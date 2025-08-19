import api from "../../config/axios.config";
import { IAuthService } from "./auth.interface";

export class AuthService implements IAuthService {
	async isJwtValid(): Promise<boolean> {
		try {
			const response = await api.get("/users/me", {
				headers: {
					"Cache-Control": "no-store",
				},
			});

			return response.status === 200;
		} catch (error) {
			return false;
		}
	}

	getToken(): string | null {
		if (typeof window !== "undefined") {
			return localStorage.getItem("access_token");
		}

		return null;
	}
}
