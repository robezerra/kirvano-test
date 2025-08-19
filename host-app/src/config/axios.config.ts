import axios from "axios";

import useAuthStore from "../store/authStore";

const api = axios.create({
	// @ts-ignore
	baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});

api.interceptors.request.use((config) => {
	const token = useAuthStore.getState().token;

	if (!token) {
		return config;
	}

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

export default api;
