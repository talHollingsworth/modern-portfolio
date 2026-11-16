// Converts a LinkedIn "Get a copy of your data" export into data/linkedin.json.
// Usage: npm run sync:linkedin -- path/to/unzipped-export
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2];
if (!dir || !existsSync(dir)) {
  console.error("Usage: npm run sync:linkedin -- <path-to-unzipped-linkedin-export>");
  process.exit(1);
}

// Minimal CSV parser (no dependency). Handles quoted fields, escaped quotes ("")
// and newlines inside quotes, which LinkedIn uses for multi-line job descriptions.
// Returns an array of objects keyed by the header row.
function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some(Boolean)) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [head = [], ...rest] = rows;
  return rest.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? "").trim()])));
}

// Reads one CSV from the export folder; a missing file yields [] so partial exports still work.
const read = (name) => {
  const file = join(dir, name);
  return existsSync(file) ? parseCsv(readFileSync(file, "utf8").replace(/^\uFEFF/, "")) : [];
};

// LinkedIn dates look like "Jan 2018" or "2012"; empty end means current.
const end = (v) => v || "present";
// Splits a job description into bullet points on line breaks or "•" characters.
const bullets = (text) =>
  text.split(/\r?\n|•|\u2022/).map((s) => s.replace(/^[-*\s]+/, "").trim()).filter(Boolean);

// Map LinkedIn's column names onto the shape lib/profile.ts expects.
// Note: this overwrites data/linkedin.json, including any manual summary edit.
const profileRow = read("Profile.csv")[0] ?? {};
const out = {
  headline: profileRow["Headline"] || undefined,
  summary: profileRow["Summary"] || undefined,
  skills: read("Skills.csv").map((r) => r["Name"]).filter(Boolean),
  experience: read("Positions.csv").map((r) => ({
    title: r["Title"],
    company: r["Company Name"],
    start: r["Started On"],
    end: end(r["Finished On"]),
    bullets: bullets(r["Description"] ?? ""),
  })),
  education: read("Education.csv").map((r) => ({
    school: r["School Name"],
    degree: r["Degree Name"] + (r["Notes"] ? `, ${r["Notes"]}` : ""),
    start: r["Start Date"],
    end: r["End Date"],
  })),
  syncedAt: new Date().toISOString(),
};

writeFileSync("data/linkedin.json", JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote data/linkedin.json: ${out.experience.length} jobs, ${out.education.length} schools, ${out.skills.length} skills`);

// Recommendations go to data/recommendations.json and are MERGED, not overwritten:
// existing entries (matched by name, case-insensitive) are kept untouched so hand-added
// portraits and edited text survive; only recommenders not already listed are appended.
// Skipped when the export has no recommendations file, and hidden/pending ones are ignored.
// Security: synced fields are untrusted text. The site renders them only as React text nodes
// (auto-escaped); never use them to build an href/src without allowing only https: URLs.
const received = read("Recommendations_Received.csv").filter(
  (r) => !r["Status"] || r["Status"].toUpperCase() === "VISIBLE",
);
if (received.length) {
  const file = "data/recommendations.json";
  const existing = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : [];
  const known = new Set(existing.map((r) => r.name.toLowerCase()));
  const added = [];
  // LinkedIn lists newest first; reverse so new entries are appended oldest to newest.
  for (const r of received.reverse()) {
    const name = `${r["First Name"]} ${r["Last Name"]}`.trim();
    if (!name || !r["Text"] || known.has(name.toLowerCase())) continue;
    known.add(name.toLowerCase());
    added.push({ name, role: r["Job Title"], company: r["Company"], quote: r["Text"] });
  }
  writeFileSync(file, JSON.stringify([...existing, ...added], null, 2) + "\n");
  console.log(`Wrote ${file}: ${existing.length + added.length} recommendations (${added.length} new)`);
  if (added.length) console.log("New recommenders have no portrait; add `image` in the file to show one:", added.map((a) => a.name).join(", "));
}
