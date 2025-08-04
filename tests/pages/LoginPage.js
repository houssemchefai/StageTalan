require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.loginButton = '#Login';
    this.errorMessage = '#error';
  }

  async navigate() {
    if (!process.env.SF_BASE_URL) {
      throw new Error('SF_BASE_URL is not defined in environment variables');
    }
    console.log('Navigating to:', process.env.SF_BASE_URL);
    await this.page.goto(process.env.SF_BASE_URL);
    await this.page.waitForSelector(this.usernameInput, { state: 'visible', timeout: 30000 });
  }

  async enterUsername(username) {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLogin() {
    await this.page.click(this.loginButton);
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage() {
    await this.page.waitForSelector(this.errorMessage, { state: 'visible', timeout: 10000 });
    return await this.page.textContent(this.errorMessage);
  }
}

module.exports = LoginPage;