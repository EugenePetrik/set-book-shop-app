import { loggedManagerFixture as test } from '../../fixtures/base';

test.describe('Users', () => {
  test('should open the Users page', async (/** @type {{ app: import('../app/Application').Application }} */ {
    app,
  }) => {
    await app.usersManager.navigate();

    await app.usersManager.searchForm.expectSearchFormIsDisplayed();
    await app.usersManager.usersTable.expectUsersTableIsDisplayed();

    await app.usersManager.expectCreateButtonIsDisplayed();
    await app.usersManager.expectEditButtonIsDisplayed();
    await app.usersManager.expectDeleteButtonIsDisplayed();
  });
});
