// Converts a LinkedIn "Get a copy of your data" export into data/linkedin.json.
// Usage: npm run sync:linkedin -- path/to/unzipped-export
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2];
if (!dir || !existsSync(dir)) {
  console.error("Usage: npm run sync:linkedin -- <path-to-unzipped-linkedin-export>");
  process.exit(1);
}

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

const read = (name) => {
  const file = join(dir, name);
  return existsSync(file) ? parseCsv(readFileSync(file, "utf8").replace(/^\uFEFF/, "")) : [];
};

// LinkedIn dates look like "Jan 2018" or "2012"; empty end means current.
const end = (v) => v || "present";
const bullets = (text) =>
  text.split(/\r?\n|•|\u2022/).map((s) => s.replace(/^[-*\s]+/, "").trim()).filter(Boolean);

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
