// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from '../../../../PageHolder';

export class SearchComponent extends PageHolder {
  #root = this.page.locator('.search-form');
  #userNameInput = this.#root.locator('[name=userName]');
  #loginInput = this.#root.locator('[name=login]');
  #emailInput = this.#root.locator('[name=email]');
  #addressInput = this.#root.locator('[name=address]');
  #userIdInput = this.#root.locator('[name=userId]');
  #searchButton = this.#root.locator('.search-button');

  async expectSearchFormIsDisplayed() {
    await expect(this.#userNameInput, 'User name input is not displayed').toBeVisible();
    await expect(this.#loginInput, 'Login input is not displayed').toBeVisible();
    await expect(this.#emailInput, 'Email input is not displayed').toBeVisible();
    await expect(this.#addressInput, 'Address input is not displayed').toBeVisible();
    await expect(this.#userIdInput, 'User ID input is not displayed').toBeVisible();
    await expect(this.#searchButton, 'Search button is not displayed').toBeVisible();
  }
}
