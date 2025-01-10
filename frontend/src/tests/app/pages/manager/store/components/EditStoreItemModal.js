// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from '../../../../PageHolder';

export class EditStoreItemModal extends PageHolder {
  #root = this.page.locator('.edit-store-item-modal');
  #title = this.#root.locator('h2').getByText('Edit Store Item');
  #productIdInput = this.#root.locator('[name=productId]');
  #availableInput = this.#root.locator('[name=available]');
  #bookedInput = this.#root.locator('[name=booked]');
  #deliveredInput = this.#root.locator('[name=delivered]');
  #cancelButton = this.#root.getByRole('button', { name: 'Cancel' });
  #saveButton = this.#root.getByRole('button', { name: 'Save' });

  async expectEditStoreItemModalIsDisplayed() {
    await expect(this.#title, 'Modal title is not displayed').not.toHaveCount(0);
    await expect(this.#productIdInput, 'Product ID input is not displayed').toBeVisible();
    await expect(this.#availableInput, 'Available input is not displayed').toBeVisible();
    await expect(this.#bookedInput, 'Booked input is not displayed').toBeVisible();
    await expect(this.#deliveredInput, 'Delivered input is not displayed').toBeVisible();
    await expect(this.#cancelButton, 'Cancel button is not displayed').toBeVisible();
    await expect(this.#saveButton, 'Save button is not displayed').toBeVisible();
  }
}
