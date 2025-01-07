// @ts-check
import { expect } from '@playwright/test';
import { SearchComponent } from './components/SearchComponent';
import { StoreTableComponent } from './components/StoreTableComponent';
import { EditStoreItemModal } from './components/EditStoreItemModal';
import { AppPage } from '../../AppPage';

export class StorePage extends AppPage {
  url = '/store';

  #root = this.page.locator('.store-page');

  createButton = this.#root.getByRole('button', { name: 'Create' });

  editButton = this.#root.getByRole('button', { name: 'Edit' });

  deleteButton = this.#root.getByRole('button', { name: 'Delete' });

  searchForm = new SearchComponent(this.page);

  storeTable = new StoreTableComponent(this.page);

  editStoreItemModal = new EditStoreItemModal(this.page);

  async expectCreateButtonIsDisplayed() {
    await expect(this.createButton, 'Create button is not displayed').toBeVisible();
  }

  async expectEditButtonIsDisplayed() {
    await expect(this.editButton, 'Edit button is not displayed').toBeVisible();
  }

  async expectDeleteButtonIsDisplayed() {
    await expect(this.deleteButton, 'Delete button is not displayed').toBeVisible();
  }

  async clickOnEditButton() {
    await this.editButton.click();
  }
}
