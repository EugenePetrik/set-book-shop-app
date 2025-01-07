import { loggedInAsNewCustomerUserFixture as test } from '../../fixtures/base';

test.describe('Catalogue', () => {
  test.beforeEach(
    async (
      /** @type {{ app: import('../app/Application').Application }} */ {
        app,
        newCustomerUser,
      },
    ) => {
      await app.catalogueCustomer.navigate();
    },
  );

  test('should open the Catalogue page', async (/** @type {{ app: import('../app/Application').Application }} */ {
    app,
  }) => {
    await app.catalogueCustomer.expectProductsAreDisplayed();
  });

  test('should open the Booking Request modal on the Catalogue page', async (/** @type {{ app: import('../app/Application').Application }} */ {
    app,
  }) => {
    await app.catalogueCustomer.clickOnBookButton();

    await app.catalogueCustomer.bookingRequestModal.expectBookingRequestModalIsDisplayed();
  });
});
