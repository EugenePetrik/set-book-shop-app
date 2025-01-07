// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from '../../../../PageHolder';

export class UsersTableComponent extends PageHolder {
  #title = this.page.locator('h3').getByText('Search Results');
  #root = this.page.locator('.users-table');
  #tableHeader = this.#root.locator('thead tr th');
  #tableBody = this.#root.locator('tbody tr');

  async expectUsersTableIsDisplayed() {
    await expect(this.#title, 'Page title is not displayed').toBeVisible();
    await expect(this.#tableHeader, 'Users table headers are not correct').toHaveText([
      'User ID',
      'User Name',
      'Login',
      'Email',
      'Address',
    ]);
    await expect(
      this.#tableBody,
      'Users table should contain at least one user',
    ).not.toHaveCount(0);
  }
}
