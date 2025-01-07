// @ts-check
import { HeaderComponent } from '../components/HeaderComponent';
import { AppPage } from './AppPage';
import { expect } from '@playwright/test';

export class ProfilePage extends AppPage {
  url = '/profile';

  userIdInput = this.page.locator('[name=userId]');

  userNameInput = this.page.locator('[name=name]');

  emailInput = this.page.locator('[name=email]');

  phoneNumberInput = this.page.locator('[name=phone]');

  addressInput = this.page.locator('[name=address]');

  loginInput = this.page.locator('[name=login]');

  saveButton = this.page.locator('.save-button');

  header = new HeaderComponent(this.page);

  /**
   * @param {string | RegExp} userName
   */
  async expectUserName(userName) {
    await expect(this.userNameInput).toHaveValue(userName);
  }

  /**
   * @param {string | RegExp} userEmail
   */
  async expectUserEmail(userEmail) {
    await expect(this.emailInput).toHaveValue(userEmail);
  }

  /**
   * @param {string | RegExp} userPhoneNumber
   */
  async expectUserPhoneNumber(userPhoneNumber) {
    await expect(this.phoneNumberInput).toHaveValue(userPhoneNumber);
  }

  /**
   * @param {string | RegExp} userAddress
   */
  async expectUserAddress(userAddress) {
    await expect(this.addressInput).toHaveValue(userAddress);
  }

  /**
   * @param {string | RegExp} userLogin
   */
  async expectUserLogin(userLogin) {
    await expect(this.loginInput).toHaveValue(userLogin);
  }

  async expectSaveButtonIsDisplayed() {
    await expect(this.saveButton).toBeVisible();
  }
}
