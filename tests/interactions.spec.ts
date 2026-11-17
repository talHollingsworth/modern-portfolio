import { expect, test } from "@playwright/test";

// Interaction tests for the recommendation carousel and the back-to-top button.
// They run once per device project defined in playwright.config.ts.

// The single visible slide (inactive slides are `hidden`)
const activeSlide = '[aria-roledescription="slide"]:not([hidden])';

test.describe("recommendation carousel", () => {
  test("rotates on its own, and Pause stops it", async ({ page }) => {
    // Fake clock so we don't wait 12s of real time per rotation
    await page.clock.install();
    await page.goto("/");
    const slide = page.locator(activeSlide);
    await slide.scrollIntoViewIfNeeded();
    await expect(slide).toHaveAttribute("aria-label", /^1 of /);

    await page.clock.runFor(12500);
    await expect(slide).toHaveAttribute("aria-label", /^2 of /);

    // Pausing keeps the same slide even after more time passes
    // The button is revealed on hover/focus; keyboard activation works at every size
    const pause = page.getByRole("button", { name: "Pause automatic rotation" });
    await pause.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("button", { name: "Play automatic rotation" })).toBeVisible();
    await page.clock.runFor(30000);
    await expect(slide).toHaveAttribute("aria-label", /^2 of /);
  });

  test("next, previous and arrow keys change the slide", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const slide = page.locator(activeSlide);
    await slide.scrollIntoViewIfNeeded();

    // Keyboard activation avoids click coordinates shifting as lazy images load
    await page.getByRole("button", { name: "Next recommendation" }).focus();
    await page.keyboard.press("Enter");
    await expect(slide).toHaveAttribute("aria-label", /^2 of /);

    await page.getByRole("button", { name: "Previous recommendation" }).focus();
    await page.keyboard.press("Enter");
    await expect(slide).toHaveAttribute("aria-label", /^1 of /);

    // Keyboard: focus is inside the carousel after the click, so arrows apply
    await page.keyboard.press("ArrowRight");
    await expect(slide).toHaveAttribute("aria-label", /^2 of /);
    await page.keyboard.press("ArrowLeft");
    await expect(slide).toHaveAttribute("aria-label", /^1 of /);
  });
});

test.describe("back to top", () => {
  test("appears after scrolling and returns to the top", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Back to top" });
    await expect(button).toHaveCount(0);

    await page.evaluate(() => window.scrollTo(0, 1500));
    await expect(button).toBeVisible();

    await button.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
    await expect(button).toHaveCount(0);
  });
});
