import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    // setupFiles: "./src/setupTests.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{js,jsx}"],
      exclude: ["src/**/*.test.{js,jsx}"],
    },
    setupFiles: ["./setupTests.js"],
    // browser: {
    //   enabled: true,
    //   provider: "playwright",
    //   options: {
    //     headless: true,
    //     launchOptions: {
    //       args: ["--no-sandbox", "--disable-setuid-sandbox"],
    //     },
    //   },
    // },
  },
});
