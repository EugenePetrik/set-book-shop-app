// @ts-check
import { test } from '@playwright/test';
import { PageHolder } from './PageHolder';
import { API } from '../api/api';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { UsersPage } from './pages/manager/users/UsersPage';
import { StorePage } from './pages/manager/store/StorePage';
import { CatalogueManagerPage } from './pages/manager/catalogue/CatalogueManagerPage';
import { BookingsManagerPage } from './pages/manager/bookings/BookingsManagerPage';
import { CatalogueCustomerPage } from './pages/customer/catalogue/CatalogueCustomerPage';
import { BookingsCustomerPage } from './pages/customer/bookings/BookingsCustomerPage';

export class Pages extends PageHolder {
  /**
   * @type {API}
   */
  api = new API(this.page.request);

  /**
   * @type {LoginPage}
   */
  login = new LoginPage(this.page);

  /**
   * @type {ProfilePage}
   */
  profile = new ProfilePage(this.page);

  /**
   * @type {UsersPage}
   */
  usersManager = new UsersPage(this.page);

  /**
   * @type {StorePage}
   */
  storeManager = new StorePage(this.page);

  /**
   * @type {CatalogueManagerPage}
   */
  catalogueManager = new CatalogueManagerPage(this.page);

  /**
   * @type {BookingsManagerPage}
   */
  bookingsManager = new BookingsManagerPage(this.page);

  /**
   * @type {CatalogueCustomerPage}
   */
  catalogueCustomer = new CatalogueCustomerPage(this.page);

  /**
   * @type {BookingsCustomerPage}
   */
  bookingsCustomer = new BookingsCustomerPage(this.page);

  /**
   * @param {string} email
   * @param {string} password
   */
  async headlessLogin(email, password) {
    const { token } = await this.api.auth.login(email, password);
    const { data } = await this.api.auth.getUser(token);

    await this.setTokenAndRoleToLocalStorage(token, data.role.name);

    await test.info().attach('Credentials used for headless login', {
      body: JSON.stringify({ email, password }, null, 2),
      contentType: 'application/json',
    });
  }

  /**
   * @param {string} token
   * @param {string} role
   */
  async setTokenAndRoleToLocalStorage(token, role) {
    await this.page.goto('/', { waitUntil: 'commit' });
    await this.page.evaluate(
      _token => window.localStorage.setItem('token', _token),
      token,
    );
    await this.page.evaluate(_role => window.localStorage.setItem('role', _role), role);
  }
}
