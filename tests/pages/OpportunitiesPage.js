class OpportunitiesPage {
  constructor(page) {
    this.page = page;

    // Login selectors
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Log In' });

    // Navigation selectors
    this.opportunitiesTab = page.getByRole('link', { name: 'Opportunities' });
    this.newButton = page.getByRole('button', { name: 'New' });

    // Form selectors (scoped to modal)
    this.modal = page.locator('.slds-modal');
    this.privateCheckbox = this.modal.getByRole('checkbox', { name: 'Private' });
    this.opportunityNameInput = this.modal.getByRole('textbox', { name: '*Opportunity Name' });
    this.amountInput = this.modal.getByRole('textbox', { name: 'Amount' });
    this.closeDateInput = this.modal.getByRole('textbox', { name: '*Close Date' });
    this.nextStepInput = this.modal.getByRole('textbox', { name: 'Next Step' });
    this.stageCombobox = this.modal.getByRole('combobox', { name: 'Stage' });
    this.typeCombobox = this.modal.getByRole('combobox', { name: 'Type' });
    this.leadSourceCombobox = this.modal.getByRole('combobox', { name: 'Lead Source' });
    this.accountNameCombobox = this.modal.getByRole('combobox', { name: 'Account Name' });
    this.primaryCampaignSourceCombobox = this.modal.getByRole('combobox', { name: 'Primary Campaign Source' });
    this.deliveryInstallationStatusCombobox = this.modal.getByRole('combobox', { name: 'Delivery/Installation Status' });
    this.orderNumberInput = this.modal.getByRole('textbox', { name: 'Order Number' });
    this.mainCompetitorsInput = this.modal.getByRole('textbox', { name: 'Main Competitor(s)' });
    this.currentGeneratorsInput = this.modal.getByRole('textbox', { name: 'Current Generator(s)' });
    this.trackingNumberInput = this.modal.getByRole('textbox', { name: 'Tracking Number' });
    this.descriptionInput = this.modal.getByRole('textbox', { name: 'Description' });
    this.saveButton = this.modal.getByRole('button', { name: 'Save', exact: true });

    // Verification selectors
    this.opportunityNameText = page.locator('lightning-formatted-text').filter({ hasText: 'testtest' });
    this.amountText = page.locator('lightning-formatted-text').filter({ hasText: '$' });
    this.closeDateText = page.locator('lightning-formatted-text').filter({ hasText: '7/14/' });

    // Search selectors
    this.searchBox = page.getByRole('searchbox', { name: 'Search this list...' });
    this.noResultsHeading = page.getByRole('heading', { name: 'Nothing to see here' });
  }

  async login(username, password) {
    console.log('Logging in with credentials');
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async goToOpportunitiesTab() {
    console.log('Navigating to Opportunities tab');
    await this.opportunitiesTab.click();
    await this.page.waitForTimeout(5000);
    await this.page.screenshot({ path: 'after_opportunities_tab.png' });
  }

  async clickNewButton() {
    console.log('Clicking New button');
    await this.newButton.click();
    await this.modal.waitFor({ state: 'visible', timeout: 15000 });
    await this.page.screenshot({ path: 'after_new_button_click.png' });
  }

  async fillOpportunityForm(details) {
    console.log('Filling opportunity form with details:', details);
    if (details.private) await this.privateCheckbox.check();
    if (details.name) await this.opportunityNameInput.fill(details.name);
    if (details.amount) await this.amountInput.fill(details.amount.toString());
    if (details.closeDate) {
      await this.closeDateInput.click();
      await this.page.getByRole('button', { name: details.closeDate.split('/')[1] }).click();
    }
    if (details.nextStep) await this.nextStepInput.fill(details.nextStep);
    if (details.stage) {
      await this.stageCombobox.click();
      await this.page.getByRole('option', { name: details.stage }).click();
    }
    if (details.type) {
      await this.typeCombobox.click();
      await this.page.getByRole('option', { name: details.type }).click();
    }
    if (details.leadSource) {
      await this.leadSourceCombobox.click();
      await this.page.getByRole('option', { name: details.leadSource }).locator('span').nth(1).click();
    }
    if (details.accountName) await this.accountNameCombobox.click();
    if (details.primaryCampaignSource) await this.primaryCampaignSourceCombobox.click();
    if (details.deliveryInstallationStatus) {
      await this.deliveryInstallationStatusCombobox.click();
      await this.page.getByText(details.deliveryInstallationStatus).click();
    }
    if (details.orderNumber) await this.orderNumberInput.fill(details.orderNumber);
    if (details.mainCompetitors) await this.mainCompetitorsInput.fill(details.mainCompetitors);
    if (details.currentGenerators) await this.currentGeneratorsInput.fill(details.currentGenerators);
    if (details.trackingNumber) await this.trackingNumberInput.fill(details.trackingNumber);
    if (details.description) await this.descriptionInput.fill(details.description);
  }

  async clickSave() {
    console.log('Clicking Save button');
    await this.saveButton.click();
    // Wait for Opportunities tab or list view to stabilize instead of networkidle
    try {
      await this.opportunitiesTab.waitFor({ state: 'visible', timeout: 30000 });
    } catch (e) {
      console.warn('Opportunities tab not found, taking screenshot for debug');
      await this.page.screenshot({ path: 'after_save_timeout.png' });
    }
    await this.page.screenshot({ path: 'after_save.png' });
  }

  async searchOpportunity(name) {
    console.log(`Searching for opportunity: ${name}`);
    await this.searchBox.click();
    await this.searchBox.fill(name);
    await this.searchBox.press('Enter');
    await this.page.waitForTimeout(2000); // Brief wait for search results
    await this.page.screenshot({ path: 'after_search.png' });
  }

  async verifySearchResult() {
    console.log('Verifying search result');
    const noResults = await this.noResultsHeading.isVisible({ timeout: 5000 }).catch(() => false);
    return !noResults; // True if opportunity is found (no "Nothing to see here"), false otherwise
  }
}

module.exports = OpportunitiesPage;