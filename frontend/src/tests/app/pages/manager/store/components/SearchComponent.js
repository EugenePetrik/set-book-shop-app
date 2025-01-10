// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from '../../../../PageHolder';

export class SearchComponent extends PageHolder {
  #root = this.page.locator('.search-form');
  #productNameInput = this.#root.locator('[name=productName]');
  #authorInput = this.#root.locator('[name=author]');
  #productIdInput = this.#root.locator('[name=productId]');
  #bookedQuantityInput = this.#root.locator('[name=bookedQuantity]');
  #deliveredQuantityInput = this.#root.locator('[name=deliveredQuantity]');
  #searchButton = this.#root.locator('.search-button');

  async expectSearchFormIsDisplayed() {
    await expect(
      this.#productNameInput,
      'Product name input is not displayed',
    ).toBeVisible();
    await expect(this.#authorInput, 'Author input is not displayed').toBeVisible();
    await expect(this.#productIdInput, 'Product ID input is not displayed').toBeVisible();
    await expect(
      this.#bookedQuantityInput,
      'Booked quantity input is not displayed',
    ).toBeVisible();
    await expect(
      this.#deliveredQuantityInput,
      'Delivered quantity input is not displayed',
    ).toBeVisible();
    await expect(this.#searchButton, 'Search button is not displayed').toBeVisible();
  }
}
