const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const GroupsPage = require('../../stage/tests/pages/GroupsPage');

class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.groupsPage = null;
    this.createdGroupName = null;
  }

  async init() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.groupsPage = new GroupsPage(this.page);
  }

  async close() {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(function () {
  const world = new CustomWorld();
  return world;
});
