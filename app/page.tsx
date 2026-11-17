import Card from "@/components/Card";
import ContactEmail from "@/components/ContactEmail";
import Nav from "@/components/Nav";
import BackToTop from "@/components/BackToTop";
import TooltipDismiss from "@/components/TooltipDismiss";
import Parallax from "@/components/Parallax";
import RecommendationCarousel from "@/components/RecommendationCarousel";
import { asset, profile, type CaseStudy, type Project } from "@/lib/profile";

// Shared class strings so focus rings and section headings stay consistent.
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400";
const heading = "text-3xl font-bold tracking-tight text-white sm:text-4xl";

// Plain <img> (the site is a static export with unoptimized images); asset()
// adds the base path when needed.
function Img({ src, alt, className }: { src: string; alt: string; className?: string }) {
  // Approximate intrinsic size (3:2). The parent box is fixed and object-cover crops, so this
  // only lets the browser reserve space and avoid layout shift while images load.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={asset(src)} alt={alt} width={1200} height={800} loading="lazy" className={className} />;
}

// Unsplash photos used as section backgrounds. The Unsplash license doesn't
// require credit, but we give it anyway. `id` is the photo's Unsplash ID
// (the part after the photographer's name in the original filename).
const photoCredits = [
  { use: "Hero", photographer: "Pete Alexopoulos", id: "JFfDRKlI3hY" },
  { use: "Case studies", photographer: "Mitchell Luo", id: "FWoq_ldWlNQ" },
  { use: "Experience", photographer: "Roberta Guillen", id: "YPLx5eOy49M" },
];

// One project tile: optional screenshot(s) with a gentle parallax, role, text and links.
// A project supplies either a single `image` or an `images` array (shown as a 2-column grid).
function ProjectCard({ p, index }: { p: Project; index: number }) {
  const id = `project-${index}`;
  const images = p.images ?? (p.image ? [{ src: p.image, alt: p.alt ?? "" }] : []);
  return (
    <li>
      <article aria-labelledby={id} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
        {images.length > 0 && (
          <div className="overflow-hidden bg-slate-800">
            <Parallax speed={0.06}>
              <div className={`grid gap-1 ${images.length > 1 ? "grid-cols-2" : ""} scale-110`}>
                {images.map((im) => (
                  <Img key={im.src} src={im.src} alt={`Screenshot: ${im.alt}`} className="h-full w-full object-cover" />
                ))}
              </div>
            </Parallax>
          </div>
        )}
        <div className="p-6">
          <h3 id={id} className="text-xl font-semibold text-white">
            {p.title}
          </h3>
          <p className="mt-1 text-blue-300">
            <span className="font-semibold">Project role:</span> {p.role}
          </p>
          {p.description && <p className="mt-3 text-slate-300">{p.description}</p>}
          <ul className="mt-4 flex flex-wrap gap-3">
            {p.links.map((l) => (
              <li key={l.href + l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-11 items-center rounded-full border border-blue-400/60 px-4 py-2 text-sm text-blue-200 hover:bg-blue-400 hover:text-slate-950 ${focus}`}
                >
                  {l.label}
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </li>
  );
}

// Case study tile on a solid background for legibility over the parallax image.
// Challenge and Outcome are always visible; the longer Approach and Accessibility
// text lives in a native <details> so it's keyboard accessible without JavaScript.
function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const id = `case-study-${index}`;
  return (
    <li>
      <article aria-labelledby={id} className="h-full rounded-2xl border border-l-4 border-white/10 border-l-blue-400 bg-slate-900 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-red-400">Case study {index + 1}</p>
        <h3 id={id} className="mt-3 text-2xl font-semibold text-white">{study.title}</h3>
        <p className="mt-2 text-slate-300">{study.role}</p>
        <dl className="mt-8 space-y-6 text-slate-100">
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wider text-blue-300">Challenge</dt>
            <dd className="mt-2 leading-relaxed">{study.challenge}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wider text-blue-300">Outcome</dt>
            <dd className="mt-2 leading-relaxed">{study.outcome}</dd>
          </div>
        </dl>
        <details className="group mt-6 border-t border-white/10 pt-4">
          <summary className={`flex min-h-11 cursor-pointer list-none items-center justify-between rounded font-semibold text-blue-300 hover:text-blue-200 [&::-webkit-details-marker]:hidden ${focus}`}>
            Approach, accessibility &amp; performance
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-current transition-transform group-open:rotate-180">
              <path d="M5.5 7.5 10 12l4.5-4.5-1.4-1.4L10 9.2 6.9 6.1z" />
            </svg>
          </summary>
          <dl className="mt-4 space-y-6 text-slate-100">
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-blue-300">Approach</dt>
              <dd className="mt-2 leading-relaxed">{study.approach}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-blue-300">Accessibility &amp; performance</dt>
              <dd className="mt-2 leading-relaxed">{study.accessibility}</dd>
            </div>
          </dl>
        </details>
        <ul aria-label="Technologies used" className="mt-6 flex flex-wrap gap-2">
          {study.technologies.map((technology) => (
            <li key={technology} className="rounded-full bg-slate-800 px-3 py-1 text-sm text-blue-200">
              {technology}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}

// The whole single-page site, top to bottom. Content comes from lib/profile.ts.
// Decorative backgrounds are aria-hidden and pointer-events-none so they never
// affect assistive tech or clicks.
export default function Home() {
  return (
    <>
      {/* Keyboard users can jump past the nav; only visible when focused */}
      <a
        href="#main"
        className="sr-only z-[60] rounded bg-white px-4 py-2 font-semibold text-slate-950 focus:not-sr-only focus:fixed focus:left-2 focus:top-2"
      >
        Skip to main content
      </a>
      <Nav name={profile.name} />
      <main id="main">
        {/* Hero: flag photo (parallax) + dark overlay for text contrast + two colored glows */}
        <section id="top" tabIndex={-1} aria-labelledby="hero-title" className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 focus:outline-none">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {/* Extends 30vh above the section so the image never reveals its edge while moving */}
            <Parallax speed={0.3} className="absolute inset-x-0 -top-[30vh] bottom-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/img/hero-texas-flag.jpg")} alt="" width={2000} height={1126} className="h-full w-full object-cover" />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-blue-950/65 to-slate-950/85" />
            <Parallax speed={0.5} className="absolute -left-24 top-1/4">
              <div className="h-96 w-96 rounded-full bg-blue-500/30 blur-3xl" />
            </Parallax>
            <Parallax speed={0.3} className="absolute -right-24 top-10">
              <div className="h-80 w-80 rounded-full bg-red-600/20 blur-3xl" />
            </Parallax>
          </div>
          <div className="relative mx-auto w-full max-w-6xl px-4 pt-20">
            <p className="text-lg text-blue-300">Hi, I’m</p>
            <h1 id="hero-title" className="mt-2 text-[clamp(1.75rem,10.5vw,3rem)] font-extrabold tracking-tight text-white sm:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-4 text-2xl text-slate-200 sm:text-3xl">{profile.title}</p>
            {/* Availability line for recruiters; the dot is decorative */}
            <p className="mt-4 flex items-center gap-2 text-lg text-emerald-300">
              <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400" />
              {profile.openTo}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#case-studies" className={`rounded-full bg-blue-400 px-6 py-3 font-semibold text-slate-950 hover:bg-blue-300 ${focus}`}>
                View my work
              </a>
              {/* Icon-only; the sr-only text provides the accessible name */}
              <a href={asset(profile.resumePdf)} className={`tip-host inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10 ${focus}`}>
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                  <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
                </svg>
                <span className="sr-only">Download résumé (PDF)</span>
                <span className="tip" aria-hidden="true">Résumé (PDF)</span>
              </a>
              <ContactEmail className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10 ${focus}`} />
            </div>
          </div>
        </section>

        {/* About text comes from the LinkedIn summary. max-w-3xl keeps line length readable; mx-auto centers the block while the text stays left-aligned */}
        <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-4 py-24">
          <h2 id="about-title" className={`${heading} text-center`}>About</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-200">{profile.summary}</p>
        </section>

        {/* Skills: own full-width band (slate-900) so it reads as a separate row from About */}
        <section id="skills" aria-labelledby="skills-title" className="bg-slate-900 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <h2 id="skills-title" className={`${heading} text-center`}>Skills</h2>
            <ul className="mt-8 flex flex-wrap justify-center gap-3">
              {profile.skills.map((s) => (
                <li key={s} className="rounded-lg bg-slate-800 px-4 py-2 text-slate-100">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Case studies: code photo as a faint parallax backdrop (opacity-10 keeps text legible) */}
        <section id="case-studies" aria-labelledby="case-studies-title" className="relative overflow-hidden bg-slate-950 py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Parallax speed={0.2} className="absolute inset-x-0 -inset-y-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/img/case-studies-code.webp")} alt="" width={1600} height={1067} loading="lazy" className="h-full w-full object-cover opacity-10" />
            </Parallax>
          </div>
          <div className="relative mx-auto max-w-6xl px-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-400">Selected work</p>
            <h2 id="case-studies-title" className={`mt-2 ${heading}`}>Engineering case studies</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-200">
              Selected work from regulated financial-services products. Details are anonymized to protect confidential systems and customer information.
            </p>
            <ul className="mt-10 grid gap-10 lg:grid-cols-2">
              {profile.caseStudies.map((study, index) => (
                <CaseStudyCard key={study.title} study={study} index={index} />
              ))}
            </ul>
          </div>
        </section>

        <section id="projects" aria-labelledby="projects-title" className="relative overflow-hidden bg-slate-900/60 py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Parallax speed={0.35} className="absolute -right-32 top-1/3">
              <div className="h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
            </Parallax>
          </div>
          <div className="relative mx-auto max-w-6xl px-4">
            <h2 id="projects-title" className={heading}>Projects</h2>
            <ul className="mt-10 grid gap-8 lg:grid-cols-2">
              {profile.projects.map((p, i) => (
                <ProjectCard key={p.title} p={p} index={i} />
              ))}
            </ul>
          </div>
        </section>

        {/* Recommendations: carousel fed by data/recommendations.json (synced from LinkedIn) */}
        <section aria-labelledby="testimonial-title" className="mx-auto max-w-4xl px-4 py-24 text-center">
          <h2 id="testimonial-title" className={heading}>
            {profile.recommendations.length > 1 ? "Recommendations" : "Recommendation"}
          </h2>
          <RecommendationCarousel
            // Image paths are resolved here so the client component doesn't import all site data
            items={profile.recommendations.map((r) => ({ ...r, image: r.image ? asset(r.image) : undefined }))}
            headingId="testimonial-title"
          />
        </section>

        {/* Experience: bluebonnet backdrop, one reusable Card per job (from LinkedIn) */}
        <section id="experience" aria-labelledby="experience-title" className="relative overflow-hidden bg-slate-950 py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Parallax speed={0.2} className="absolute inset-x-0 -inset-y-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/img/experience-bluebonnets.webp")} alt="" width={1600} height={1067} loading="lazy" className="h-full w-full object-cover opacity-10" />
            </Parallax>
          </div>
          <div className="relative mx-auto max-w-4xl px-4">
            <h2 id="experience-title" className={heading}>Experience</h2>
            <ol className="mt-10 space-y-8">
              {profile.experience.map((j, i) => (
                <Card as="li" key={j.title + j.start} labelledBy={`job-${i}`}>
                  <h3 id={`job-${i}`} className="text-2xl font-semibold text-white">{j.title}</h3>
                  <p className="mt-1 text-lg text-blue-300">
                    {j.company} · <time>{j.start}</time> – {j.end === "present" ? "present" : <time>{j.end}</time>}
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-200">
                    {j.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </ol>
          </div>
        </section>

        <section id="education" aria-labelledby="education-title" className="mx-auto max-w-4xl px-4 py-24">
          <h2 id="education-title" className={heading}>Education</h2>
          <ul className="mt-8 space-y-4">
            {profile.education.map((e) => (
              <li key={e.degree} className="text-lg text-slate-200">
                <span className="font-semibold text-white">{e.start} – {e.end}</span> · {e.school}, {e.degree}
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" aria-labelledby="contact-title" className="bg-gradient-to-b from-slate-900 to-blue-950 py-24 text-center">
          <h2 id="contact-title" className={heading}>Let’s connect</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <ContactEmail className={`inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-blue-300 text-white hover:bg-blue-400 hover:text-slate-950 ${focus}`} />
            {/* Icon-only links; the sr-only text provides the accessible name */}
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={`tip-host inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-blue-300 text-white hover:bg-blue-400 hover:text-slate-950 ${focus}`}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="sr-only">LinkedIn (opens in new tab)</span>
              <span className="tip" aria-hidden="true">LinkedIn</span>
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={`tip-host inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-blue-300 text-white hover:bg-blue-400 hover:text-slate-950 ${focus}`}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span className="sr-only">GitHub (opens in new tab)</span>
              <span className="tip" aria-hidden="true">GitHub</span>
            </a>
          </div>
        </section>
      </main>
      <BackToTop />
      <TooltipDismiss />
      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-300">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p className="mx-auto mt-3 max-w-3xl px-4">
          Background photos on{" "}
          <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className={`rounded underline hover:text-white ${focus}`}>
            Unsplash<span className="sr-only"> (opens in new tab)</span>
          </a>
          :{" "}
          {photoCredits.map((c, i) => (
            <span key={c.id}>
              {i > 0 && " · "}
              {c.use} by{" "}
              <a
                href={`https://unsplash.com/photos/${c.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded underline hover:text-white ${focus}`}
              >
                {c.photographer}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </span>
          ))}
        </p>
      </footer>
    </>
  );
}
