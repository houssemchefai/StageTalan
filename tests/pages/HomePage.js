class HomePage {
  constructor(page) {
    this.page = page;
    this.greetingSelector = '.sellerHomeSubtitle.slds-text-body_regular.slds-m-left_large';
  }

  async getGreetingMessage() {
    const text = await this.page.textContent(this.greetingSelector);
    return text.trim();
  }
}

module.exports = HomePage;
