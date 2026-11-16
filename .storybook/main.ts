import type { StorybookConfig } from "@storybook/nextjs-vite";

// Storybook previews components in isolation. The a11y addon runs axe on every
// story and shows violations in its own panel.
const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-a11y"],
  framework: "@storybook/nextjs-vite",
};

export default config;
