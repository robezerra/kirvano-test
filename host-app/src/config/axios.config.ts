import axios from "axios";

import useAuthStore from "../store/authStore";

const api = axios.create({
	baseURL: "http://localhost:8080",
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
