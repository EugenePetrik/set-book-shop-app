// @ts-check
import { test } from '@playwright/test';
import { manager, customer } from '../test_data/users';
import { Pages } from '../app/Pages';

export const baseFixture = test.extend({
  app: async ({ browser, page }, use) => {
    test.info().annotations.push({
      type: 'Browser',
      description: `${browser.browserType().name()} ${browser.version()}`,
    });

    const app = new Pages(page);

    await use(app);
  },
});

export const loggedManagerFixture = baseFixture.extend({
  managerUser: [
    {
      email: manager.email,
      password: manager.password,
    },
    // @ts-ignore
    { option: true },
  ],

  // @ts-ignore
  app: async ({ app, managerUser }, use) => {
    await app.headlessLogin(managerUser.email, managerUser.password);
    await app.profile.navigate();

    await use(app);
  },
});

export const loggedInAsNewCustomerUserFixture = baseFixture.extend({
  // @ts-ignore
  newCustomerUser: async ({ app }, use) => {
    const { email, password } = customer;

    await test
      .info()
      .attach('New customer user data', { body: JSON.stringify(customer, null, 4) });

    await app.api.auth.registerUser(customer);

    await app.headlessLogin(email, password);
    await app.profile.navigate();

    await use(customer);
  },
});
