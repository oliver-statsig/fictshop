import type { Page } from '@playwright/test';
import { test } from '@playwright/test';

async function maybeClickRandomProduct(page: Page): Promise<void> {
  const products = await page.locator('main a').all();
  if (products.length > 0) {
    if (process.env.HAPPY_PATH) {
      console.log('Happy path: clicking first product');
      await products[0].click();
      await maybeAddToCart(page);
    } else {
      // Base probability increases with more products
      // Start with 0.35 probability and decrease by 0.05 for each product
      const firstProbability = 0.4;
      const decreaseAmount = 0.05;

      // Try each product with decreasing probability
      for (let i = 0; i < products.length; i++) {
        const probability = Math.max(0, firstProbability - i * decreaseAmount);
        if (Math.random() < probability) {
          console.log(`Clicking product at index ${i}`);
          await products[i].click();
          await maybeAddToCart(page);
          return;
        }
      }
      console.log('No product selected based on probabilities');
    }
  }
}

async function maybeAddToCart(page: Page): Promise<void> {
  const addToCartButton = page.getByRole('button', { name: /Add to cart/i });
  console.log('Adding product to cart');
  await addToCartButton.click();
  await maybeViewCart(page);
}

async function maybeViewCart(page: Page): Promise<void> {
  const viewCartButton = page.getByRole('link', { name: /View cart/i });
  console.log('Viewing cart');
  await viewCartButton.click();
  await maybeProceedToCheckout(page);
}

async function maybeProceedToCheckout(page: Page): Promise<void> {
  const checkoutButton = page.getByRole('button', {
    name: /Proceed to checkout/i,
  });
  console.log('Proceeding to checkout');
  await checkoutButton.click();
  await maybeCompletePurchase(page);
}

async function maybeCompletePurchase(page: Page): Promise<void> {
  console.log('Completing purchase');
  await page.getByRole('link', { name: /Complete purchase/i }).click();
  console.log('Clicking Continue Shopping');
  await page.getByRole('link', { name: /Continue Shopping/i }).click();
}

async function startNavigation(page: Page): Promise<void> {
  const random = Math.random();

  if (process.env.HAPPY_PATH || random < 0.5) {
    console.log('Clicking Time Travel Now link');
    await page.getByRole('link', { name: /Time Travel Now/i }).click();
    await maybeAddToCart(page);
  } else {
    console.log('Clicking View All Products link');
    await page.getByRole('link', { name: /View All Products/i }).click();
    await page.waitForTimeout(500);
    await maybeClickRandomProduct(page);
  }
}

test('navigation decision tree', async ({ page }) => {
  const baseUrl = process.env.USE_PRODUCTION
    ? 'https://fictshop.vercel.app'
    : 'http://localhost:3000';

  if (!process.env.USE_PRODUCTION) {
    page.on('console', (msg) => {
      console.log(`[Page Console] ${msg.text()}`);
    });
  }

  await page.goto(baseUrl);
  await startNavigation(page);

  // Wait for the page_view_end event
  await page.waitForTimeout(500);

  // Close the page to ensure logs are flushed
  await page.close({
    runBeforeUnload: true,
  });
});
