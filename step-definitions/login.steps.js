const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../tests/pages/LoginPage');  // Fixed path

Given('I am on the login page', { timeout: 60 * 1000 }, async function () {
  this.loginPage = new LoginPage(this.page);
  
  await this.loginPage.navigate();
});

When('I enter valid username and password', async function () {
  await this.loginPage.login(
    process.env.SF_USERNAME,
    process.env.SF_PASSWORD
  );
});

When('I enter username {string} and password {string}', async function (user, pass) {
  await this.loginPage.enterUsername(user);
  await this.loginPage.enterPassword(pass);
});

When('I click the login button', async function () {
  await this.loginPage.clickLogin();
});

Then('I should see the home page or dashboard', { timeout: 60 * 1000 }, async function () {
  await this.page.waitForURL('**/lightning/page/home', { timeout: 30000 });
  await expect(this.page).toHaveURL(/lightning\/page\/home/);
});

Then('I should see an error message {string}', async function (expectedError) {
  const actualError = await this.loginPage.getErrorMessage();
  console.log('Actual error message:', actualError);
  expect(actualError).toContain(expectedError);
});
