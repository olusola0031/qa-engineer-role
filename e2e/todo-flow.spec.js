const { test, expect } = require('@playwright/test');

test.describe('Todo app E2E flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto('/login');
  });

  test('login, create todos, delete one, verify, logout', async ({ page }) => {
    // Login using fake form
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');

    // Wait for redirect or app page to load
    await expect(page).toHaveURL(/\/todos|\/$/);

    // Create 3 todos
    for (const todoText of ['Todo 1', 'Todo 2', 'Todo 3']) {
      await page.fill('input[placeholder="Add a todo"]', todoText);
      await page.keyboard.press('Enter');
      // Wait for new todo to appear
      await expect(page.locator('li')).toContainText(todoText);
    }

    // Verify 3 todos present
    await expect(page.locator('li')).toHaveCount(3);

    // Delete one todo (delete 'Todo 2')
    const todo2 = page.locator('li', { hasText: 'Todo 2' });
    await todo2.locator('button', { hasText: 'Delete' }).click();

    // Verify 'Todo 2' no longer appears
    await expect(page.locator('li')).toHaveCount(2);
    await expect(page.locator('li')).not.toContainText('Todo 2');

    // Verify filter still shows correct items (assuming default 'all')
    await expect(page.locator('li')).toContainText('Todo 1');
    await expect(page.locator('li')).toContainText('Todo 3');

    // Logout (assume logout button exists)
    await page.click('button:has-text("Logout")');

    // Verify redirected to login page
    await expect(page).toHaveURL('/login');
  });
});
