const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const HomePage = require('../tests/pages/HomePage'); 

setDefaultTimeout(60 * 1000); 

Given('I am logged in with valid credentials', async function () {
  await this.page.goto('https://login.salesforce.com');
  await this.page.fill('#username', process.env.SF_USERNAME);
  await this.page.fill('#password', process.env.SF_PASSWORD);
  await this.page.click('#Login');
  await this.page.waitForURL('**/home');

  this.homePage = new HomePage(this.page); 
});

When('I navigate to the home page', async function () {
  await this.page.waitForSelector(this.homePage.greetingSelector); 
});

Then('I should see my username {string}', async function (username) {
  const actualGreeting = await this.homePage.getGreetingMessage(); 
  expect(actualGreeting).toBe(username);
});
