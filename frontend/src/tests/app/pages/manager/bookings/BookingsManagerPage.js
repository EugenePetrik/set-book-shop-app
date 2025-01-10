// @ts-check
import { SearchComponent } from './components/SearchComponent';
import { BookingsComponent } from './components/BookingsComponent';
import { AppPage } from '../../AppPage';

export class BookingsManagerPage extends AppPage {
  url = '/bookings';

  searchForm = new SearchComponent(this.page);

  bookings = new BookingsComponent(this.page);
}
