import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// ADA / WCAG compliance: axe-core scans the page for WCAG 2.0/2.1 A and AA
// violations (plus common best practices). Any violation fails the test.
// Automated scans catch roughly a third of issues, so keep doing manual
// keyboard and screen-reader checks too.
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

test("home page has no WCAG A/AA violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  expect(results.violations).toEqual([]);
});

test("case study details expanded has no violations", async ({ page }) => {
  await page.goto("/");
  // Open every collapsible so its hidden content is scanned too.
  for (const summary of await page.locator("#case-studies summary").all()) {
    await summary.click();
  }
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  expect(results.violations).toEqual([]);
});

test("page has a single h1 and a skip link", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Skip to main content" })).toHaveAttribute("href", "#main");
});

// Every Unsplash background photo must be credited in the footer.
test("footer credits each Unsplash photographer", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  for (const name of ["Pete Alexopoulos", "Mitchell Luo", "Roberta Guillen"]) {
    await expect(footer.getByRole("link", { name: new RegExp(name) })).toBeVisible();
  }
});

test("keyboard focus is visible on interactive elements", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
  expect(outline).not.toBe("none");
});
