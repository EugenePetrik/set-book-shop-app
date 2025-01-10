// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from '../../../../PageHolder';

export class SearchComponent extends PageHolder {
  #root = this.page.locator('.search-form');
  #productIdInput = this.#root.locator('[name=productId]');
  #productNameInput = this.#root.locator('[name=name]');
  #authorInput = this.#root.locator('[name=author]');
  #priceInput = this.#root.locator('[name=price]');
  #searchButton = this.#root.locator('.search-button');

  async expectSearchFormIsDisplayed() {
    await expect(this.#productIdInput, 'Product ID input is not displayed').toBeVisible();
    await expect(
      this.#productNameInput,
      'Product name input is not displayed',
    ).toBeVisible();
    await expect(this.#authorInput, 'Author input is not displayed').toBeVisible();
    await expect(this.#priceInput, 'price input is not displayed').toBeVisible();
    await expect(this.#searchButton, 'Search button is not displayed').toBeVisible();
  }
}
