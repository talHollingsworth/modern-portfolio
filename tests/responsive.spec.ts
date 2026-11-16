import { expect, test } from "@playwright/test";

// These run once per viewport project defined in playwright.config.ts
// (mobile, tablet, desktop).

test("no horizontal scrolling", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("hero heading and call to action are visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: "View my work" })).toBeVisible();
});

test("navigation adapts to screen size", async ({ page }) => {
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: /menu/i });
  const aboutLink = page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "About" });

  // Below the md breakpoint (768px) links hide behind a Menu button.
  const narrow = (page.viewportSize()?.width ?? 0) < 768;
  if (narrow) {
    await expect(aboutLink).toBeHidden();
    await menuButton.click();
    await expect(aboutLink).toBeVisible();
  } else {
    await expect(menuButton).toBeHidden();
    await expect(aboutLink).toBeVisible();
  }
});

test("touch targets are at least 44px tall on interactive controls", async ({ page }) => {
  await page.goto("/");
  const summaries = page.locator("#case-studies summary");
  for (const summary of await summaries.all()) {
    const box = await summary.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  }
});
