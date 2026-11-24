/// <reference lib="dom" />

import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const caseArticles = '#case-results article';
const mobile = (project: string) => project === 'mobile';

test.beforeEach(async ({ page }) => {
  await page.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.abort());
});

test('navigation starts with four featured cases and the complete explorer is reachable', async ({ page }, info) => {
  await page.goto('/?lang=en-MY');
  await expect(page.getByRole('heading', { name: 'IT Operations & Application Support' })).toBeVisible();
  if (mobile(info.project.name)) await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Work', exact: true }).click();
  await expect(page.locator(caseArticles)).toHaveCount(4);
  await expect(page.locator('#case-voucher-configuration')).toBeVisible();
  await expect(page.locator('#case-transaction-recovery')).toBeVisible();
  await page.getByRole('button', { name: 'Explore all 13 cases' }).click();
  await expect(page.locator(caseArticles)).toHaveCount(13);
  await page.getByRole('button', { name: 'Show featured cases' }).click();
  await expect(page.locator(caseArticles)).toHaveCount(4);
});

test('search and filters include cases outside the initial selection', async ({ page }) => {
  await page.goto('/?lang=en-MY');
  await expect(page.getByRole('searchbox', { name: 'Search cases' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Explore all 13 cases' }).click();
  await expect(page.getByRole('searchbox', { name: 'Search cases' })).toBeFocused();
  await page.getByRole('searchbox', { name: 'Search cases' }).fill('ICMP');
  await expect(page.locator(caseArticles)).toHaveCount(1);
  await expect(page.locator('#case-network-connectivity')).toBeVisible();
  await page.getByLabel('Case type').selectOption('project');
  await expect(page.getByText('No cases match your search and filters.')).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.getByRole('searchbox')).toBeFocused();
  await page.getByLabel('Technical domain').selectOption('workplace');
  await page.getByLabel('Case type').selectOption('incident');
  await expect(page.locator(caseArticles)).toHaveCount(1);
  await expect(page.locator('#case-m365-access-sync')).toBeVisible();
});

test('deep links open non-featured cases and collapse removes their detail from navigation', async ({ page }) => {
  await page.goto('/?lang=en-MY#case-api-error-traces');
  const study = page.locator('#case-api-error-traces');
  await expect(study.getByRole('heading', { name: 'Investigating API Transaction Failures' })).toBeVisible();
  await expect(study.getByRole('button', { name: 'Collapse' })).toHaveAttribute('aria-expanded', 'true');
  await study.getByRole('button', { name: 'Collapse' }).press('Enter');
  await expect(study.getByRole('button', { name: 'Technical deep dive' })).toBeFocused();
  await expect(study.locator('[id$="-body"]')).toHaveAttribute('inert', '');
  await page.goto('/?lang=en-MY#case-voucher-configuration');
  const timeline = page.locator('#case-voucher-configuration-body');
  await timeline.getByRole('button', { name: 'Verify' }).press('Enter');
  await expect(timeline.getByRole('button', { name: 'Verify' })).toHaveAttribute('aria-pressed', 'true');
});

test('keyboard opens the résumé, traps focus and restores it on Escape', async ({ page }) => {
  await page.goto('/?lang=en-MY');
  const opener = page.locator('#top').getByRole('button', { name: 'View Résumé' });
  await opener.press('Enter');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: /close/i })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.locator(':focus')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test('language switching keeps the case link and loads the chosen locale', async ({ page }, info) => {
  await page.goto('/?lang=en-MY#case-voucher-configuration');
  await expect(page.locator('#case-voucher-configuration')).toBeVisible();
  if (mobile(info.project.name)) {
    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    await page.getByRole('button', { name: 'Bahasa Melayu' }).click();
  } else {
    await page.getByLabel('Select language').selectOption('ms-MY');
  }
  await expect(page.locator('html')).toHaveAttribute('lang', 'ms-MY');
  await expect(page).toHaveURL(/lang=ms-MY#case-voucher-configuration$/);
  await expect(page.locator('#case-voucher-configuration')).toContainText('Menyelesaikan Kegagalan Konfigurasi');
  for (const locale of ['zh-Hans-MY', 'ta-MY']) {
    await page.goto(`/?lang=${locale}#case-voucher-configuration`);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('#case-voucher-configuration-body')).not.toHaveAttribute('inert', '');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('static case pages and homepage fallback work with scripting disabled', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('noscript a[href^="/cases/case-"]')).toHaveCount(13);
    await page.goto('/cases/case-transaction-recovery.html');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cross-System Transaction Synchronisation Recovery');
    await expect(page.getByText('The originating provider corrected the issue and re-sent the data.', { exact: false }).last()).toBeVisible();
  } finally {
    await context.close();
  }
});

test('sitemap pages and the build manifest match the case inventory', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  const urls = Array.from((await sitemap.text()).matchAll(
    /<loc>https:\/\/aries-razak\.vercel\.app(\/cases\/case-[a-z0-9-]+\.html)<\/loc>/g,
  ), ([, path]) => path);
  expect(new Set(urls).size).toBe(13);
  await Promise.all(urls.map(async (path) => {
    const response = await request.get(path);
    expect(response.ok(), path).toBe(true);
    const html = await response.text();
    expect(html).toContain(`rel="canonical" href="https://aries-razak.vercel.app${path}"`);
    expect(html).toContain('My contribution');
  }));
  const manifest = await request.get('/build-info.json');
  expect(manifest.ok()).toBe(true);
  const revision = await manifest.json();
  expect(revision.caseCount).toBe(13);
  if (process.env.PLAYWRIGHT_EXPECTED_COMMIT) {
    expect(revision.commit).toBe(process.env.PLAYWRIGHT_EXPECTED_COMMIT);
  }
});

test('automated accessibility scan of the homepage, expanded case and résumé', async ({ page }, info) => {
  await page.goto('/?lang=en-MY#case-voucher-configuration');
  await expect(page.locator('#case-voucher-configuration-body')).toBeVisible();
  const inspect = async (name: string) => {
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    await info.attach(name, { body: JSON.stringify(results.violations), contentType: 'application/json' });
    expect(results.violations.map((issue) => ({ id: issue.id, targets: issue.nodes.map((node) => node.target) }))).toEqual([]);
  };
  await inspect('portfolio-axe');
  await page.locator('#top').getByRole('button', { name: 'View Résumé' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await inspect('resume-axe');
});
