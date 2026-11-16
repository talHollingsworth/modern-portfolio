import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    // Match the site's dark background so contrast is judged realistically.
    backgrounds: { options: { site: { name: "Site", value: "#020617" } } },
    // "error" makes a11y violations fail the story instead of just warning.
    a11y: { test: "error" },
  },
  initialGlobals: { backgrounds: { value: "site" } },
};

export default preview;
