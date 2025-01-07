import type { Page } from '@playwright/test';
import { test } from '@playwright/test';

async function maybeClickRandomProduct(page: Page): Promise<void> {
  if (process.env.HAPPY_PATH || Math.random() < 0.7) {
    const products = await page
      .locator('main')
      .getByRole('link', { name: /\$\d+/ })
      .all();
    if (products.length > 0) {
      const randomProduct = process.env.HAPPY_PATH
        ? products[0] // Always pick first product in happy path
        : products[Math.floor(Math.random() * products.length)];
      console.log('Clicking a random product');
      await randomProduct.click();
      await maybeAddToCart(page);
    }
  } else {
    console.log('Dropping off from products page');
  }
}

async function maybeAddToCart(page: Page): Promise<void> {
  if (process.env.HAPPY_PATH || Math.random() < 0.2) {
    const addToCartButton = page.getByRole('button', { name: /Add to cart/i });
    console.log('Adding product to cart');
    await addToCartButton.click();
    await maybeViewCart(page);
  } else {
    console.log('Not adding to cart');
  }
}

async function maybeViewCart(page: Page): Promise<void> {
  if (process.env.HAPPY_PATH || Math.random() < 0.5) {
    const viewCartButton = page.getByRole('link', { name: /View cart/i });
    console.log('Viewing cart');
    await viewCartButton.click();
    await maybeProceedToCheckout(page);
  } else {
    console.log('Not viewing cart');
  }
}

async function maybeProceedToCheckout(page: Page): Promise<void> {
  if (process.env.HAPPY_PATH || Math.random() < 0.5) {
    const checkoutButton = page.getByRole('button', {
      name: /Proceed to checkout/i,
    });
    console.log('Proceeding to checkout');
    await checkoutButton.click();
    await maybeCompletePurchase(page);
  } else {
    console.log('Not proceeding to checkout');
  }
}

async function maybeCompletePurchase(page: Page): Promise<void> {
  if (process.env.HAPPY_PATH || Math.random() < 0.5) {
    console.log('Completing purchase');
    await page.getByRole('link', { name: /Complete purchase/i }).click();
  } else {
    console.log('Not completing purchase');
  }
}

async function startNavigation(page: Page): Promise<void> {
  const random = Math.random();

  if (process.env.HAPPY_PATH || random < 0.5) {
    console.log('Clicking Time Travel Now link');
    await page.getByRole('link', { name: /Time Travel Now/i }).click();
    await maybeAddToCart(page);
  } else if (random < 0.75) {
    console.log('Clicking View All Products link');
    await page.getByRole('link', { name: /View All Products/i }).click();
    await maybeClickRandomProduct(page);
  } else {
    console.log('Dropping off from home page');
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
  await page.waitForTimeout(30);

  // Close the page to ensure logs are flushed
  await page.close({
    runBeforeUnload: true,
  });
});
