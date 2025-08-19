import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
	// eslint-disable-next-line no-undef
	const env = loadEnv(mode, process.cwd(), "");

	return {
		define: {
			"import.meta.env.VITE_API_BASE_URL": JSON.stringify(
				env.VITE_API_BASE_URL
			),
			"import.meta.env.VITE_AUTH_MFE_URL": JSON.stringify(
				env.VITE_AUTH_MFE_URL
			),
			"import.meta.env.VITE_ITEMS_MFE_URL": JSON.stringify(
				env.VITE_ITEMS_MFE_URL
			),
		},
		plugins: [
			react(),
			federation({
				name: "host_app",
				filename: "remoteEntry.js",
				exposes: {
					"./api": "./src/config/axios.config.ts",
				},
				remotes: {
					weather:
						env.VITE_ITEMS_MFE_URL ||
						"http://localhost:3001/assets/remoteEntry.js",
					auth:
						env.VITE_AUTH_MFE_URL ||
						"http://localhost:3002/assets/remoteEntry.js",
				},
				shared: {
					react: {
						singleton: true,
						version: "18.3.1",
					},
					"react-dom": {
						singleton: true,
						version: "18.3.1",
					},
					"@tanstack/react-query": {
						singleton: true,
						version: "5.59.0",
					},
					"react-router-dom": {
						singleton: true,
						version: "7.8.1",
					},
					axios: {
						singleton: true,
						version: "1.7.7",
					},
					"react/jsx-runtime": { singleton: true, version: "18.3.1" },
				},
			}),
		],
		server: {
			port: 3000,
		},
	};
});
