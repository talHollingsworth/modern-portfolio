import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Card from "@/components/Card";

const meta: Meta<typeof Card> = { title: "Components/Card", component: Card };
export default meta;

type Story = StoryObj<typeof Card>;

// A job entry as used in the Experience section.
export const JobEntry: Story = {
  args: {
    labelledBy: "job-title",
    children: (
      <>
        <h3 id="job-title" className="text-2xl font-semibold text-white">Senior Frontend Engineer</h3>
        <p className="mt-1 text-lg text-blue-300">Example Co · 2021 – present</p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-200">
          <li>Owned user-facing funnels end to end.</li>
          <li>Improved Core Web Vitals and accessibility.</li>
        </ul>
      </>
    ),
  },
};
