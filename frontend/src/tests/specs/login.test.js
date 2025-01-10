import { baseFixture as test } from '../fixtures/base';
import { manager, customer } from '../test_data/users';

test.describe('Login', () => {
  test('should login as a manager', async (/** @type {{ app: import('../app/Application').Application }} */ {
    app,
  }) => {
    const { email, password, name, phone, address, login } = manager;

    await app.login.navigate();
    await app.login.performLogin(email, password);

    await app.profile.expectUrl('/profile');
    await app.profile.header.expectNavLinks([
      'Catalogue',
      'Bookings',
      'Store',
      'Users',
      'User Profile',
    ]);

    await app.profile.expectUserName(name);
    await app.profile.expectUserEmail(email);
    await app.profile.expectUserPhoneNumber(phone);
    await app.profile.expectUserAddress(address);
    await app.profile.expectUserLogin(login);
    await app.profile.expectSaveButtonIsDisplayed();
  });

  test('should login as a customer', async (/** @type {{ app: import('../app/Application').Application }} */ {
    app,
  }) => {
    const { email, password, name, phone, address, login } = customer;

    await app.api.auth.registerUser(customer);

    await app.login.navigate();
    await app.login.performLogin(email, password);

    await app.profile.expectUrl('/profile');
    await app.profile.header.expectNavLinks(['Catalogue', 'Bookings', 'User Profile']);

    await app.profile.expectUserName(name);
    await app.profile.expectUserEmail(email);
    await app.profile.expectUserPhoneNumber(phone);
    await app.profile.expectUserAddress(address);
    await app.profile.expectUserLogin(login);
    await app.profile.expectSaveButtonIsDisplayed();
  });
});
