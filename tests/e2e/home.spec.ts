import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

test("Turkish and English navigation remains localized", async ({ page }) => {
  await page.goto("/tr");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Her sofranın");
  await page.getByRole("button", { name: /Change language/ }).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Every table");
  await page.getByRole("link", { name: "Explore recipes" }).click();
  await expect(page.getByRole("heading", { name: "All recipes" })).toBeVisible();
});

test("search, empty state and recipe detail work", async ({ page }) => {
  await page.goto("/tr/recipes");
  await page.getByRole("textbox", { name: "Tarif veya malzeme ara" }).fill("mercimek");
  await expect(page.getByRole("heading", { name: "İpeksi Mercimek Çorbası" })).toBeVisible();
  await page.getByRole("textbox", { name: "Tarif veya malzeme ara" }).fill("bulunmayan tarif");
  await expect(page.getByRole("status")).toContainText("Aramana uygun tarif bulamadık");
  await page.goto("/en/recipes/firinda-akdeniz-sebzeleri");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Mediterranean Roasted Vegetables");
  await expect(page.getByText("Main · Mediterranean", { exact: true })).toBeVisible();
});

test("metadata, canonical, hreflang and Recipe JSON-LD are valid", async ({ page }) => {
  await page.goto("/tr/recipes/firinda-akdeniz-sebzeleri");
  await expect(page).toHaveTitle(/Fırında Akdeniz Sebzeleri/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/tr\/recipes\/firinda-akdeniz-sebzeleri$/);
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", /\/en\/recipes\/firinda-akdeniz-sebzeleri$/);
  const structuredData = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? "{}");
  expect(structuredData["@type"]).toBe("Recipe");
  expect(structuredData.recipeIngredient.length).toBeGreaterThan(0);
  expect(structuredData.recipeInstructions.length).toBeGreaterThan(0);
});

test("unauthenticated visitors cannot open admin recipe creation", async ({ page }) => {
  await page.goto("/tr/admin/recipes/new");
  await expect(page).toHaveURL(/\/tr\/login$/);
});

test("regular users cannot view the admin recipe form", async ({ page }) => {
  test.skip(!process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD, "Test user credentials are required");
  await page.goto("/tr/login");
  await page.getByLabel("E-mail").fill(process.env.TEST_USER_EMAIL!);
  await page.getByLabel("Şifre").fill(process.env.TEST_USER_PASSWORD!);
  await page.getByRole("button", { name: "Giriş yap" }).click();
  await expect(page).toHaveURL(/\/tr$/);
  await page.goto("/tr/admin/recipes/new");
  await expect(page).toHaveURL(/\/tr$/);
});

test("admin creates a validated draft with an audit log", async ({ page }) => {
  test.skip(!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD, "Admin credentials are required");
  const title = `Kalite Test Taslağı ${Date.now()}`;
  await page.goto("/tr/login");
  await page.getByLabel("E-mail").fill(process.env.ADMIN_EMAIL!);
  await page.getByLabel("Şifre").fill(process.env.ADMIN_PASSWORD!);
  await page.getByRole("button", { name: "Giriş yap" }).click();
  await expect(page).toHaveURL(/\/tr\/admin\/recipes\/new$/);
  await page.getByLabel("Başlık").fill(title);
  await page.getByLabel("Açıklama").fill("Gerçek PostgreSQL üzerinde doğrulanan kapsamlı kalite kontrol taslağı.");
  await page.getByRole("button", { name: "Taslak oluştur" }).click();
  await expect(page).toHaveURL(/\/tr\/recipes$/);
  const created = await prisma.recipe.findFirst({ where: { translations: { some: { title } } } });
  expect(created?.status).toBe("DRAFT");
  const audit = await prisma.auditLog.findFirst({ where: { entity: "Recipe", entityId: created?.id, action: "RECIPE_CREATED" } });
  expect(audit).not.toBeNull();
  if (created) {
    await prisma.auditLog.deleteMany({ where: { entity: "Recipe", entityId: created.id } });
    await prisma.recipe.delete({ where: { id: created.id } });
  }
});

test("homepage has no serious axe violations", async ({ page }) => {
  await page.goto("/tr");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);
});

for (const viewport of [{ name: "mobile", width: 390, height: 844 }, { name: "tablet", width: 768, height: 1024 }, { name: "desktop", width: 1440, height: 1000 }]) {
  test(`visual smoke: ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/tr");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.screenshot({ path: `test-results/visual/home-${viewport.name}.png`, fullPage: true });
  });
}
