// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from '../../../../PageHolder';

export class SearchComponent extends PageHolder {
  #root = this.page.locator('.search-form');
  #userNameInput = this.#root.locator('[name=userName]');
  #productNameInput = this.#root.locator('[name=productName]');
  #dateInput = this.#root.locator('[name=date]');
  #addressInput = this.#root.locator('[name=address]');
  #statusDropdown = this.#root.locator('[name=status]');
  #searchButton = this.#root.locator('.search-button');

  async expectSearchFormIsDisplayed() {
    await expect(this.#userNameInput, 'User name input is not displayed').toBeVisible();
    await expect(
      this.#productNameInput,
      'Product name input is not displayed',
    ).toBeVisible();
    await expect(this.#dateInput, 'Date input is not displayed').toBeVisible();
    await expect(this.#addressInput, 'Address input is not displayed').toBeVisible();
    await expect(this.#statusDropdown, 'Status dropdown is not displayed').toBeVisible();
    await expect(this.#searchButton, 'Search button is not displayed').toBeVisible();
  }
}
