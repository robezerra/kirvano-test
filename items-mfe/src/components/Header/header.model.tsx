import { useMetrics } from "@/hooks/useMetrics";
import { useEffect, useState } from "react";

export const useHeaderModel = () => {
	const [darkTheme, setDarkTheme] = useState(false);

	const { metrics, toggleMetric } = useMetrics();

	useEffect(() => {
		const mode = localStorage.getItem("mode");

		if (mode === "dark") {
			setDarkTheme(true);
		}
	}, []);

	useEffect(() => {
		const root = document.documentElement;
		darkTheme ? root.classList.add("dark") : root.classList.remove("dark");
		const mode = darkTheme ? "dark" : "light";

		localStorage.setItem("mode", mode);
	}, [darkTheme]);

	return {
		darkTheme,
		setDarkTheme,
		metrics,
		toggleMetric,
	};
};
