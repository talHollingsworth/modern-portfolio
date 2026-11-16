import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Nav from "@/components/Nav";

const meta: Meta<typeof Nav> = {
  title: "Components/Nav",
  component: Nav,
  args: { name: "Tal Hollingsworth" },
  // Use the viewport toolbar to check the collapsed mobile menu.
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof Nav> = {};
