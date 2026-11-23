import { defineConfig, devices } from '@playwright/test';
import { env } from 'node:process';

const localURL = 'http://127.0.0.1:4173';
const baseURL = env.PLAYWRIGHT_BASE_URL || localURL;

export default defineConfig({
  testDir: './tests/e2e',
  forbidOnly: Boolean(env.CI),
  workers: 1,
  use: {
    baseURL,
    reducedMotion: 'reduce',
    launchOptions: env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? {
      executablePath: env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
    } : undefined,
  },
  webServer: env.PLAYWRIGHT_BASE_URL ? undefined : {
    command: 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
    url: localURL,
    reuseExistingServer: false,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'], defaultBrowserType: 'chromium' } },
  ],
});
