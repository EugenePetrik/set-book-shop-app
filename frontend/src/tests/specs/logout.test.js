import { loggedInAsNewCustomerUserFixture as test } from '../fixtures/base';

test.describe('Logout', () => {
  test('should log out', async (/** @type {{ app: import('../app/Application').Application }} */ {
    app,
    newCustomerUser,
  }) => {
    await app.profile.navigate();

    await app.profile.expectUserEmail(newCustomerUser.email);

    await app.profile.header.clickLogOutLink();

    await app.login.expectLoginPageIsDisplayed();
  });
});
