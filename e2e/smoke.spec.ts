import { test, expect } from '@playwright/test'
test('public landing can open the mock workspace', async ({ page }) => { await page.goto('/'); await expect(page.getByText('Remember')).toBeVisible(); await page.getByRole('link', { name: /start remembering/i }).click(); await page.getByRole('button', { name: /create my nest/i }).click(); await expect(page).toHaveURL(/\/app$/) })
