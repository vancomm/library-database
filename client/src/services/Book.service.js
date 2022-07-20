import { booksRoute } from '../data/routes';
import Service from './Service';

const BookService = new Service(booksRoute);

export default BookService;
