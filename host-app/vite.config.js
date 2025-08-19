import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "host_app",
			filename: "remoteEntry.js",
			exposes: {
				"./api": "./src/config/axios.config.ts",
			},
			remotes: {
				weather: "http://localhost:3001/assets/remoteEntry.js",
				auth: "http://localhost:3002/assets/remoteEntry.js",
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
});
