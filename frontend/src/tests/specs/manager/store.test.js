import { loggedManagerFixture as test } from '../../fixtures/base';

test.describe('Store', () => {
  test.beforeEach(
    async (/** @type {{ app: import('../app/Application').Application }} */ { app }) => {
      await app.storeManager.navigate();
    },
  );

  test('should open the Store page', async (/** @type {{ app: import('../app/Application').Application }} */ {
    app,
  }) => {
    await app.storeManager.searchForm.expectSearchFormIsDisplayed();
    await app.storeManager.storeTable.expectStoreTableIsDisplayed();

    await app.storeManager.expectCreateButtonIsDisplayed();
    await app.storeManager.expectEditButtonIsDisplayed();
    await app.storeManager.expectDeleteButtonIsDisplayed();
  });

  test('should open the Edit Store Item modal on the Store page', async (/** @type {{ app: import('../app/Application').Application }} */ {
    app,
  }) => {
    await app.storeManager.clickOnEditButton();

    await app.storeManager.editStoreItemModal.expectEditStoreItemModalIsDisplayed();
  });
});
