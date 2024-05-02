import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["**/*.test.tsx", "**/*.test.ts"],
    globals: true,
    setupFiles: "./src/tests/setup.ts",
    css: true,
  },
});
