import { loggedInAsNewCustomerUserFixture as test } from '../../fixtures/base';
import { bookingData } from '../../test_data/bookings';

test.describe('Bookings', () => {
  test('should book a product', async (/** @type {{ app: import('../app/Application').Application }} */ {
    app,
    newCustomerUser,
  }) => {
    await app.catalogueCustomer.navigate();

    await app.catalogueCustomer.expectProductsAreDisplayed();

    const productTitle = await app.catalogueCustomer.getProductTitle();

    await app.catalogueCustomer.clickOnBookButton();

    await app.catalogueCustomer.bookingRequestModal.bookProduct(bookingData);

    await app.catalogueCustomer.notification.expectSuccessMessage(
      'Booking created successfully',
    );

    await app.bookingsCustomer.navigate();

    await app.bookingsCustomer.bookings.expectBookingsAreDisplayed();

    await app.bookingsCustomer.bookings.expectBookingCreated({
      ...bookingData,
      title: productTitle,
    });
  });
});
