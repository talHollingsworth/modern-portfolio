import { defineConfig, devices } from "@playwright/test";

// End-to-end, responsive and accessibility tests run against the production
// static export (out/), so they test exactly what GitHub Pages will serve.
const PORT = 3100;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { baseURL: `http://localhost:${PORT}`, trace: "on-first-retry" },

  // Each project is one viewport; every spec runs once per project, which is
  // what gives us responsive coverage without duplicating tests.
  projects: [
    { name: "mobile", use: { ...devices["Pixel 5"] } },
    { name: "tablet", use: { ...devices["iPad (gen 7)"], browserName: "chromium" } },
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
  ],

  // Build then serve the static export. Reuses a running server locally.
  webServer: {
    command: `npm run build && npx serve out -l ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
