// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from '../../../../PageHolder';

export class BookingRequestModal extends PageHolder {
  #root = this.page.locator('.create-booking-modal');
  #title = this.#root.locator('h2').getByText('Booking Request');
  #productInput = this.#root.locator('[name=product]');
  #priceInput = this.#root.locator('[name=price]');
  #dateInput = this.#root.locator('[name=date]');
  #timeInput = this.#root.locator('[name=time]');
  #addressInput = this.#root.locator('[name=address]');
  #quantityInput = this.#root.locator('[name=quantity]');
  #cancelButton = this.#root.getByRole('button', { name: 'Cancel' });
  #saveButton = this.#root.getByRole('button', { name: 'Save changes' });

  async expectBookingRequestModalIsDisplayed() {
    await expect(this.#title, 'Modal title is not displayed').toBeVisible();
    await expect(this.#productInput, 'Product input is not displayed').toBeVisible();
    await expect(this.#priceInput, 'Price input is not displayed').toBeVisible();
    await expect(this.#dateInput, 'Date input is not displayed').toBeVisible();
    await expect(this.#timeInput, 'Time input is not displayed').toBeVisible();
    await expect(this.#addressInput, 'Address input is not displayed').toBeVisible();
    await expect(this.#quantityInput, 'Quantity input is not displayed').toBeVisible();
    await expect(this.#cancelButton, 'Cancel button is not displayed').toBeVisible();
    await expect(this.#saveButton, 'Save button is not displayed').toBeVisible();
  }

  async bookProduct(bookingData) {
    const { date, time, address, quantity } = bookingData;

    await this.#dateInput.fill(date);
    await this.#timeInput.fill(time);
    await this.#addressInput.fill(address);
    await this.#quantityInput.fill(quantity);

    await this.#saveButton.scrollIntoViewIfNeeded();
    await this.#saveButton.click({ delay: 1000 });
  }
}
