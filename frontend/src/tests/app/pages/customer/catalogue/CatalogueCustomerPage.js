// @ts-check
import { expect } from '@playwright/test';
import { BookingRequestModal } from './components/BookingRequestModal';
import { NotificationComponent } from '../../../components/NotificationComponent';
import { AppPage } from '../../AppPage';

export class CatalogueCustomerPage extends AppPage {
  url = '/products';

  #root = this.page.locator('.product-catalogue-customer-page');

  products = this.#root.locator('.product-card');

  productTitle = this.#root.locator('.product-title');

  bookButton = this.#root.locator('.book-button');

  bookingRequestModal = new BookingRequestModal(this.page);

  notification = new NotificationComponent(this.page);

  async getProductTitle(index = 0) {
    return this.productTitle.nth(index).innerText();
  }

  async clickOnBookButton(index = 0) {
    await this.bookButton.nth(index).click();
  }

  async expectProductsAreDisplayed() {
    await expect(
      this.products,
      'Catalogue page should contain at least one product',
    ).not.toHaveCount(0);
  }
}
