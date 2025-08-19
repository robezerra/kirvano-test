import React, { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore";
import { publicRoutes } from "./public.routes";

// @ts-ignore
const AuthPage = React.lazy(() => import("auth/auth"));
// @ts-ignore
const WeatherPage = React.lazy(() => import("weather/weather"));

export function AppRoutes() {
	const { token, isLoading, initialize } = useAuthStore();
	const navigate = useNavigate();
	const currentRoute = window.location.pathname;

	useEffect(() => {
		initialize();
	}, [initialize]);

	useEffect(() => {
		if (!isLoading && !token && !publicRoutes.includes(currentRoute)) {
			navigate("/auth");
		} else if (!isLoading && token) {
			navigate("/");
		}
	}, [isLoading, token, navigate]);

	if (isLoading) {
		return <div>Carregando...</div>;
	}

	return (
		<Suspense fallback={<div>Carregando página...</div>}>
			<Routes>
				<Route path="/auth" element={<AuthPage />} />
				<Route path="/" element={token ? <WeatherPage /> : <AuthPage />} />
			</Routes>
		</Suspense>
	);
}
