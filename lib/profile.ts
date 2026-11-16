import base from "@/data/profile.json";
import linkedin from "@/data/linkedin.json";

export type Link = { label: string; href: string };
export type Project = {
  title: string;
  role: string;
  description?: string;
  image?: string;
  alt?: string;
  images?: { src: string; alt: string }[];
  links: Link[];
};
export type Job = {
  title: string;
  company: string;
  start: string;
  end: string;
  bullets: string[];
};
export type School = { school: string; degree: string; start: string; end: string };

type LinkedInData = Partial<{
  headline: string;
  summary: string;
  skills: string[];
  experience: Job[];
  education: School[];
  syncedAt: string;
}>;

const li = linkedin as LinkedInData;

// LinkedIn-synced fields override the hand-written defaults when present.
export const profile = {
  ...base,
  title: li.headline || base.title,
  summary: li.summary || base.summary,
  skills: li.skills?.length ? li.skills : base.skills,
  experience: (li.experience?.length ? li.experience : base.experience) as Job[],
  education: (li.education?.length ? li.education : base.education) as School[],
  projects: base.projects as Project[],
  syncedAt: li.syncedAt,
};

export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
