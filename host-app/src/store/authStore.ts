import { create } from "zustand";

import { AuthService } from "../services/auth/auth.service";

interface AuthState {
	token: string | null;
	isLoading: boolean;
	initialize: () => Promise<void>;
}

const getInitialToken = () => {
	if (typeof window !== "undefined") {
		return localStorage.getItem("access_token");
	}
	return null;
};

const useAuthStore = create<AuthState>((set) => ({
	token: getInitialToken(),
	isLoading: true,

	initialize: async () => {
		const storedToken = getInitialToken();
		const authService = new AuthService();

		if (storedToken) {
			try {
				const isTokenValid = await authService.isJwtValid();

				if (isTokenValid) {
					set({ token: storedToken, isLoading: false });
				} else {
					set({ token: null, isLoading: false });
					localStorage.removeItem("access_token");
				}
			} catch (error) {
				set({ token: null, isLoading: false });
				localStorage.removeItem("access_token");
			}
		} else {
			set({ isLoading: false });
		}
	},
}));

export default useAuthStore;
