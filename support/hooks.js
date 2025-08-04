const { Before, After, setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { Before } = require('@cucumber/cucumber');
const { After } = require('@cucumber/cucumber');


class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.loginPage = null;
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  const isDebug = process.env.DEBUG === 'true';

  this.browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'true',
    slowMo: isDebug ? 200 : 0,
  });

  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  if (isDebug) {
    await this.page.pause(); // 👈 Force Playwright Inspector
  }
});



After({ timeout: 30000 }, async function () {
  console.log('Closing page...');
  if (this.page) await this.page.close();
  console.log('Closing context...');
  if (this.context) await this.context.close();
  console.log('Closing browser...');
  if (this.browser) await this.browser.close();
  console.log('Cleanup done');
});
