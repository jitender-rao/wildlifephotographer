import { chromium } from "playwright";
const SHOTS = "/Users/jitenderrao/wildlifephotographer/.claude";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

// Screenshot 1: Dark
await page.screenshot({ path: `${SHOTS}/screenshot-01-dark.png` });

// Scroll to footer so it shows in the test
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(300);
await page.screenshot({ path: `${SHOTS}/screenshot-01-dark-footer.png` });

// Scroll back to top and toggle to light
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(200);
await page
  .getByRole("button", { name: /switch to (light|dark) theme/i })
  .first()
  .click();
await page.waitForTimeout(500);

// Screenshot 2: Light — top
await page.screenshot({ path: `${SHOTS}/screenshot-02-light-top.png` });

// Light — scroll to middle (gallery + stats)
await page.evaluate(() => window.scrollTo(0, window.innerHeight));
await page.waitForTimeout(300);
await page.screenshot({ path: `${SHOTS}/screenshot-02-light-mid.png` });

// Light — footer
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(300);
await page.screenshot({ path: `${SHOTS}/screenshot-02-light-footer.png` });

const bgLight = await page.evaluate(
  () => window.getComputedStyle(document.body).backgroundColor,
);
console.log("Light body bg:", bgLight);

// Toggle back to dark
await page.evaluate(() => window.scrollTo(0, 0));
await page
  .getByRole("button", { name: /switch to (light|dark) theme/i })
  .first()
  .click();
await page.waitForTimeout(500);
await page.screenshot({ path: `${SHOTS}/screenshot-03-dark-final.png` });
const bgDark = await page.evaluate(
  () => window.getComputedStyle(document.body).backgroundColor,
);
console.log("Dark body bg:", bgDark);

await browser.close();
console.log("\nScreenshots saved to .claude/ folder");
