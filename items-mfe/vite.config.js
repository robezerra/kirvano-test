// vite.config.js do REMOTE
import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		define: {
			"process.env.VITE_API_KEY": JSON.stringify(env.VITE_API_KEY),
		},
		plugins: [
			react(),
			federation({
				name: "weather",
				filename: "remoteEntry.js",
				exposes: {
					"./weather": "./src/pages/Weather/",
				},
				remotes: {
					host_app: "http://localhost:3000/assets/remoteEntry.js",
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
						requiredVersion: ">=1.7.7 <2.0.0",
					},
				},
			}),
		],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
				find: "react-query/devtools",
				replacement: "react-query/es/devtools/index",
			},
		},
		build: {
			target: "esnext",
			cssCodeSplit: false,
		},
		esbuild: {
			target: "esnext",
		},
		server: {
			port: 3001,
		},
	};
});
