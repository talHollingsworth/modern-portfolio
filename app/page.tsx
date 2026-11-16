import Card from "@/components/Card";
import Nav from "@/components/Nav";
import Parallax from "@/components/Parallax";
import { asset, profile, type CaseStudy, type Project } from "@/lib/profile";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2   focus-visible:outline-blue-400";
const heading = "text-3xl font-bold tracking-tight text-white sm:text-4xl";

function Img({ src, alt, className }: { src: string; alt: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={asset(src)} alt={alt} loading="lazy" className={className} />;
}

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

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const id = `case-study-${index}`;
  return (
    <li>
      <article aria-labelledby={id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-red-400">Case study {index + 1}</p>
        <h3 id={id} className="mt-2 text-2xl font-semibold text-white">{study.title}</h3>
        <p className="mt-2 text-slate-300">{study.role}</p>
        <dl className="mt-6 space-y-4 text-slate-200">
          <div>
            <dt className="font-semibold text-white">Challenge</dt>
            <dd className="mt-1 leading-relaxed">{study.challenge}</dd>
          </div>
          <div>
            <dt className="font-semibold text-white">Approach</dt>
            <dd className="mt-1 leading-relaxed">{study.approach}</dd>
          </div>
          <div>
            <dt className="font-semibold text-white">Accessibility & performance</dt>
            <dd className="mt-1 leading-relaxed">{study.accessibility}</dd>
          </div>
          <div>
            <dt className="font-semibold text-white">Outcome</dt>
            <dd className="mt-1 leading-relaxed">{study.outcome}</dd>
          </div>
        </dl>
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

export default function Home() {
  const t = profile.testimonial;
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded bg-white px-4 py-2 font-semibold text-slate-950 focus:not-sr-only focus:fixed focus:left-2 focus:top-2"
      >
        Skip to main content
      </a>
      <Nav name={profile.name} />
      <main id="main">
        <section id="top" aria-labelledby="hero-title" className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Parallax speed={0.3} className="absolute inset-x-0 -top-[30vh] bottom-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/img/hero-texas-flag.jpg")} alt="" className="h-full w-full object-cover" />
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
            <h1 id="hero-title" className="mt-2 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-4 text-2xl text-slate-200 sm:text-3xl">{profile.title}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#case-studies" className={`rounded-full bg-blue-400 px-6 py-3 font-semibold text-slate-950 hover:bg-blue-300 ${focus}`}>
                View my work
              </a>
              <a href={asset(profile.resumePdf)} className={`rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10 ${focus}`}>
                Download résumé (PDF)
              </a>
            </div>
          </div>
        </section>

        <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-4 py-24">
          <h2 id="about-title" className={heading}>About</h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200">{profile.summary}</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {profile.skillSets.map((s) => (
              <div key={s.title} className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                <h3 className="text-xl font-semibold text-blue-300">{s.title}</h3>
                <ul className="mt-3 space-y-1 text-slate-200">
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <h3 className="mt-12 text-2xl font-semibold text-white">Skills</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {profile.skills.map((s) => (
              <li key={s} className="rounded-lg bg-slate-800 px-4 py-2 text-slate-100">
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section id="case-studies" aria-labelledby="case-studies-title" className="relative overflow-hidden bg-slate-950 py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Parallax speed={0.2} className="absolute inset-x-0 -inset-y-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/img/case-studies-code.jpg")} alt="" loading="lazy" className="h-full w-full object-cover opacity-15" />
            </Parallax>
          </div>
          <div className="relative mx-auto max-w-6xl px-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-400">Selected work</p>
            <h2 id="case-studies-title" className={`mt-2 ${heading}`}>Engineering case studies</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-200">
              Selected work from regulated financial-services products. Details are anonymized to protect confidential systems and customer information.
            </p>
            <ul className="mt-10 grid gap-8 lg:grid-cols-2">
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

        <section aria-labelledby="testimonial-title" className="mx-auto max-w-4xl px-4 py-24 text-center">
          <h2 id="testimonial-title" className={heading}>Recommendation</h2>
          <figure className="mt-8">
            <Img src={t.image} alt={`Portrait of ${t.name}`} className="mx-auto h-36 w-36 rounded-full object-cover" />
            <blockquote className="mt-6 text-left text-lg leading-relaxed text-slate-200">
              <p>“{t.quote}”</p>
            </blockquote>
            <figcaption className="mt-4">
              <span className="block text-xl font-semibold text-white">{t.name}</span>
              <span className="text-blue-300">{t.role}, {t.company}</span>
            </figcaption>
          </figure>
        </section>

        <section id="experience" aria-labelledby="experience-title" className="relative overflow-hidden bg-slate-950 py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Parallax speed={0.2} className="absolute inset-x-0 -inset-y-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/img/experience-bluebonnets.jpg")} alt="" loading="lazy" className="h-full w-full object-cover opacity-10" />
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
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"             className={`rounded-full bg-blue-400 px-6 py-3 font-semibold text-slate-950 hover:bg-blue-300 ${focus}`}>
              LinkedIn<span className="sr-only"> (opens in new tab)</span>
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={`rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10 ${focus}`}>
              GitHub<span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-300">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
