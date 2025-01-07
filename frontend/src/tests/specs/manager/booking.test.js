import { loggedManagerFixture as test } from '../../fixtures/base';

test.describe('Bookings', () => {
  test('should open the Bookings page', async (/** @type {{ app: import('../app/Application').Application }} */ {
    app,
  }) => {
    await app.bookingsManager.navigate();

    await app.bookingsManager.searchForm.expectSearchFormIsDisplayed();
    await app.bookingsManager.bookings.expectBookingsAreDisplayed();
  });
});
