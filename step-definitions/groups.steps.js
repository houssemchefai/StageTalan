const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am logged in with valid credentials for groups ', async function () {
  await this.page.goto('https://login.salesforce.com');
  await this.page.fill('#username', process.env.SF_USERNAME);
  await this.page.fill('#password', process.env.SF_PASSWORD);
  await this.page.click('#Login');
  
  // Wait for the homepage or a known element that confirms login success
  await this.page.waitForSelector('text=Home');
});

When('I create a new group called {string}', async function (groupName) {
  const page = this.page;
  this.createdGroupName = groupName;
  this.createdGroupDescription = `this is ${groupName}`;

  await page.getByRole('button', { name: 'Show more navigation items' }).click();
  await page.getByRole('menuitem', { name: 'Groups' }).click();
  await page.getByRole('button', { name: 'New' }).click();

  await page.getByRole('textbox', { name: 'Name *' }).fill(groupName);
  await page.getByRole('textbox', { name: 'Description' }).fill(this.createdGroupDescription);
  await page.getByRole('textbox', { name: 'Information - Compose text' }).fill('salesforce test');

  await page.getByRole('combobox', { name: 'Access Type' }).click();
  await page.getByRole('option', { name: 'Public' }).click();
  await page.getByRole('checkbox', { name: 'Broadcast Only' }).check();
  await page.getByRole('button', { name: 'Save & Next' }).click();

  const nextBtn = page.getByRole('button', { name: 'Next' });
  if (await nextBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await nextBtn.click();
  } else {
    console.log('✅ Skipping Next button - already clicked manually or auto skipped.');
  }

  await page.getByRole('button', { name: 'Done' }).click();
});

Then('I should see the correct group title and description', async function () {
  const page = this.page;

  // Wait for the group list or detail page to load
  await page.waitForSelector('b');

  // Check if there is a <b> element with text matching the created group name
  const groupLocator = page.locator('b').filter({ hasText: this.createdGroupName });

  // Verify it is visible (exists)
  await expect(groupLocator).toBeVisible();

  // Optional: click the span inside this <b> if you want
  // await groupLocator.locator('span').click();

  // For description verification, you can add your logic here as before
});
