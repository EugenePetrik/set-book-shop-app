// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from '../../../../PageHolder';

export class BookingsComponent extends PageHolder {
  #title = this.page.locator('h3').getByText('Search Results');
  #root = this.page.locator('.booking-grid');
  #bookings = this.#root.locator('.booking-card');

  async expectBookingsAreDisplayed() {
    await expect(this.#title, 'Page title is not displayed').toBeVisible();
    await expect(
      this.#bookings,
      'Bookings page should contain at least one booking',
    ).not.toHaveCount(0);
  }
}
