// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from '../../../../PageHolder';

export class EditProductModal extends PageHolder {
  #root = this.page.locator('.edit-product-modal');
  #title = this.#root.locator('h2').getByText('Edit Product');
  #productIdInput = this.#root.locator('[name=productId]');
  #productNameInput = this.#root.locator('[name=name]');
  #authorInput = this.#root.locator('[name=author]');
  #priceInput = this.#root.locator('[name=price]');
  #descriptionInput = this.#root.locator('[name=description]');
  #imagePathInput = this.#root.locator('[name=image_path]');
  #cancelButton = this.#root.getByRole('button', { name: 'Cancel' });
  #saveButton = this.#root.getByRole('button', { name: 'Save' });

  async expectEditProductModalIsDisplayed() {
    await expect(this.#title, 'Modal title is not displayed').toBeVisible();
    await expect(this.#productIdInput, 'Product ID input is not displayed').toBeVisible();
    await expect(
      this.#productNameInput,
      'Product name input is not displayed',
    ).toBeVisible();
    await expect(this.#authorInput, 'Author input is not displayed').toBeVisible();
    await expect(this.#priceInput, 'Price input is not displayed').toBeVisible();
    await expect(
      this.#descriptionInput,
      'Description input is not displayed',
    ).toBeVisible();
    await expect(this.#imagePathInput, 'Image path input is not displayed').toBeVisible();
    await expect(this.#cancelButton, 'Cancel button is not displayed').toBeVisible();
    await expect(this.#saveButton, 'Save button is not displayed').toBeVisible();
  }
}
