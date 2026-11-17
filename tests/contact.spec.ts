import { expect, test } from "@playwright/test";

// The address must never appear in the delivered HTML/JS-visible text; it is only decoded on click.
test("email is hidden from the page source until requested", async ({ page, request }) => {
  const html = await (await request.get("/")).text();
  expect(html).not.toContain("passmail");
  expect(html).not.toContain("portfolio.2e0i8");
  expect(html).not.toContain("mailto:");

  await page.goto("/");
  await expect(page.locator("body")).not.toContainText("passmail");
  await page.getByRole("button", { name: "Email me" }).last().click();
  await expect(page.getByRole("status").filter({ hasText: "Or copy:" })).toContainText("@passmail.net");
});
