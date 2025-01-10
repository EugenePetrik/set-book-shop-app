// @ts-check
import { expect } from '@playwright/test';
import { SearchComponent } from './components/SearchComponent';
import { ProductsComponent } from './components/ProductsComponent';
import { EditProductModal } from './components/EditProductModal';
import { AppPage } from '../../AppPage';

export class CatalogueManagerPage extends AppPage {
  url = '/products';

  #root = this.page.locator('.product-catalogue-manager-page');

  createButton = this.#root.getByRole('button', { name: 'Create' });

  searchForm = new SearchComponent(this.page);

  products = new ProductsComponent(this.page);

  editProductModal = new EditProductModal(this.page);

  async expectCreateButtonIsDisplayed() {
    await expect(this.createButton, 'Create button is not displayed').toBeVisible();
  }
}
