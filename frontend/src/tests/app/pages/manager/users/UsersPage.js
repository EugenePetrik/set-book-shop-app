// @ts-check
import { expect } from '@playwright/test';
import { SearchComponent } from './components/SearchComponent';
import { UsersTableComponent } from './components/UsersTableComponent';
import { AppPage } from '../../AppPage';

export class UsersPage extends AppPage {
  url = '/users';

  #root = this.page.locator('.users-page');

  createButton = this.#root.getByRole('button', { name: 'Create' });

  editButton = this.#root.getByRole('button', { name: 'Edit' });

  deleteButton = this.#root.getByRole('button', { name: 'Delete' });

  searchForm = new SearchComponent(this.page);

  usersTable = new UsersTableComponent(this.page);

  async expectCreateButtonIsDisplayed() {
    await expect(this.createButton, 'Create button is not displayed').toBeVisible();
  }

  async expectEditButtonIsDisplayed() {
    await expect(this.editButton, 'Edit button is not displayed').toBeVisible();
  }

  async expectDeleteButtonIsDisplayed() {
    await expect(this.deleteButton, 'Delete button is not displayed').toBeVisible();
  }
}
