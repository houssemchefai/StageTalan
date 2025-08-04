const { When, Then } = require('@cucumber/cucumber');
const OpportunitiesPage = require('../tests/pages/OpportunitiesPage');
const { expect } = require('@playwright/test');

When('I go to the Opportunities tab', async function () {
  console.log('Starting step: Go to Opportunities tab');
  this.opportunitiesPage = new OpportunitiesPage(this.page);
  await this.page.goto('https://orgfarm-e0d5eaefb6-dev-ed.develop.lightning.force.com/lightning/page/home');
  await this.opportunitiesPage.goToOpportunitiesTab();
});

When('I create a new opportunity with full details', async function () {
  console.log('Starting step: Create new opportunity with full details');
  const details = {
    private: true,
    name: 'testtest',
    amount: '100',
    closeDate: '7/14/2025',
    nextStep: 'steplearn',
    stage: 'Value Proposition',
    type: 'Existing Customer - Downgrade',
    leadSource: 'Purchased List',
    deliveryInstallationStatus: 'Yet to begin',
    orderNumber: '1558',
    mainCompetitors: 'houssem',
    currentGenerators: 'Generator2',
    trackingNumber: '258',
    description: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  };

  await this.opportunitiesPage.clickNewButton();
  await this.opportunitiesPage.fillOpportunityForm(details);
  await this.opportunitiesPage.clickSave();
});

When('I search for the created opportunity', async function () {
  console.log('Starting step: Search for the created opportunity');
  await this.opportunitiesPage.searchOpportunity('testtest');
});

Then('I should see the new opportunity details displayed', async function () {
  console.log('Starting step: Verify opportunity details');
  const expected = {
    name: 'testtest',
    closeDate: '7/14/2025',
    amount: '$100.00',
  };

  const result = await this.opportunitiesPage.verifySearchResult();
  expect(result).toBe(true, 'Opportunity "testtest" not found in search results');
});