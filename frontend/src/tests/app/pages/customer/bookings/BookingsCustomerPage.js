// @ts-check
import { BookingsComponent } from './components/BookingsComponent';
import { AppPage } from '../../AppPage';

export class BookingsCustomerPage extends AppPage {
  url = '/bookings';

  bookings = new BookingsComponent(this.page);
}
