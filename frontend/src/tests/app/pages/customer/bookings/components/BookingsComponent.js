// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from '../../../../PageHolder';

export class BookingsComponent extends PageHolder {
  #title = this.page.locator('h2').getByText('My Bookings');
  #root = this.page.locator('.booking-grid');
  #bookings = this.#root.locator('.booking-card');

  async expectBookingsAreDisplayed() {
    await expect(
      this.#bookings,
      'Bookings page should contain at least one booking',
    ).not.toHaveCount(0);
  }

  /**
   * @param {{ title: string; date: string; time: string; address: string; }} bookingData
   */
  async expectBookingCreated(bookingData, index = 0) {
    const { title, date, time, address } = bookingData;

    await expect(this.#title, 'Page title is not displayed').toBeVisible();
    await expect(
      this.#root.locator('.booking-image').nth(index),
      'Product image is not displayed',
    ).toBeVisible();
    await expect(
      this.#root.locator('.booking-title').nth(index),
      'Booking title is not correct',
    ).toHaveText(title);
    await expect(
      this.#root.locator('.booking-link').nth(index),
      'Booking link is not displayed',
    ).toBeVisible();
    await expect(
      this.#root.locator('.booking-date').nth(index),
      'Booking date is not correct',
    ).toHaveText(`Date: ${date}`);
    await expect(
      this.#root.locator('.booking-time').nth(index),
      'Booking time is not correct',
    ).toHaveText(`Preferred Time: ${time}`);
    await expect(
      this.#root.locator('.booking-address').nth(index),
      'Booking address is not correct',
    ).toHaveText(`Delivery Address: ${address}`);
    await expect(
      this.#root.locator('.booking-status').nth(index),
      'Booking status is not correct',
    ).toHaveText('Status: SUBMITTED');
    await expect(
      this.#root.locator('.edit-button').nth(index),
      'Booking Edit button is not displayed',
    ).toBeVisible();
    await expect(
      this.#root.locator('.cancel-button').nth(index),
      'Booking Cancel button is not displayed',
    ).toBeVisible();
  }
}
