import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RecommendationCarousel from "@/components/RecommendationCarousel";

const meta: Meta<typeof RecommendationCarousel> = {
  title: "Components/RecommendationCarousel",
  component: RecommendationCarousel,
  decorators: [
    (Story) => (
      <div className="bg-slate-950 px-4 py-12 text-center">
        <h2 id="rec-title" className="text-3xl font-bold text-white">Recommendations</h2>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof RecommendationCarousel>;

const sample = [
  { name: "Gus Ford", role: "Former VP of Web Marketing", company: "FXCM", quote: "Tal was amazing to work with due to his strong work ethic and willingness to share his skills." },
  { name: "Jane Doe", role: "Product Manager", company: "Example Co", quote: "A recommender without a portrait falls back to an initials avatar." },
  { name: "Sam Lee", role: "QA Lead", company: "Example Co", quote: "Controls appear automatically once there is more than one recommendation." },
];

export const Multiple: Story = { args: { headingId: "rec-title", items: sample } };

// One recommendation: no previous/next controls or dots.
export const Single: Story = { args: { headingId: "rec-title", items: sample.slice(0, 1) } };
