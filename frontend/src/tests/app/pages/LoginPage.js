// @ts-check
import { expect } from '@playwright/test';
import { AppPage } from './AppPage';

export class LoginPage extends AppPage {
  url = '/login';

  emailInput = this.page.locator('[name=email]');

  passwordInput = this.page.locator('[name=password]');

  loginButton = this.page.locator('.login-button');

  /**
   * @param {string} email
   * @param {string} password
   */
  async performLogin(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginPageIsDisplayed() {
    await expect(this.emailInput, 'Email input is not displayed').toBeVisible();
    await expect(this.passwordInput, 'Password input is not displayed').toBeVisible();
    await expect(this.loginButton, 'Login button is not displayed').toBeVisible();
  }
}
