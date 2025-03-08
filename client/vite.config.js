import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: 3000, // Ensure frontend runs on port 3000
	},
	envPrefix: "VITE_", // ✅ Ensure Vite loads environment variables
});
