import { test, expect } from '@playwright/test';

test('test email contact form', async ({ page }) => {
  // Catch any console logs or errors
  page.on('console', msg => console.log(`BROWSER CONSOLE: ${msg.type()}: ${msg.text()}`));
  page.on('pageerror', error => console.log(`BROWSER ERROR: ${error.message}`));

  // Listen to network requests to smtp2go or any relevant API
  page.on('response', async response => {
    const url = response.url();
    if (url.includes('smtp2go.com/v3/email/send') || url.includes('supabase.co')) {
      const status = response.status();
      console.log(`NETWORK RESPONSE: ${url} - Status: ${status}`);
      try {
        const body = await response.json();
        console.log(`RESPONSE BODY: ${JSON.stringify(body)}`);
      } catch (e) {
        // Not JSON
      }
    }
  });

  await page.goto('http://localhost:5173/contact');

  // Fill the form
  await page.fill('input#name', 'Test User');
  await page.fill('input#email', 'test@example.com');
  await page.fill('input#phone', '1234567890');
  await page.selectOption('select#service', 'other');
  await page.fill('textarea#message', 'This is a test message.');

  // Click submit
  await page.click('button[type="submit"]');

  // Wait for the form to process, either success or error message
  await page.waitForTimeout(5000); // give it time to wait for API responses

  // Check if there is an error message displayed on UI
  const errorMsg = await page.locator('.submit-status.error').isVisible();
  if (errorMsg) {
      const text = await page.locator('.submit-status.error').textContent();
      console.log('UI ERROR MESSAGE:', text);
  }
  const successMsg = await page.locator('.submit-status.success').isVisible();
  if (successMsg) {
      const text = await page.locator('.submit-status.success').textContent();
      console.log('UI SUCCESS MESSAGE:', text);
  }
});
