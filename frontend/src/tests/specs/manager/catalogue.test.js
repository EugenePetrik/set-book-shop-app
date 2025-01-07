import { loggedManagerFixture as test } from '../../fixtures/base';

test.describe('Catalogue', () => {
  test.beforeEach(
    async (/** @type {{ app: import('../app/Application').Application }} */ { app }) => {
      await app.catalogueManager.navigate();
    },
  );

  test('should open the Catalogue page', async (/** @type {{ app: import('../app/Application').Application }} */ {
    app,
  }) => {
    await app.catalogueManager.searchForm.expectSearchFormIsDisplayed();
    await app.catalogueManager.products.expectProductsAreDisplayed();

    await app.catalogueManager.expectCreateButtonIsDisplayed();
  });

  test('should open the Edit Product modal on the Catalogue page', async (/** @type {{ app: import('../app/Application').Application }} */ {
    app,
  }) => {
    await app.catalogueManager.products.clickOnEditButton();

    await app.catalogueManager.editProductModal.expectEditProductModalIsDisplayed();
  });
});
