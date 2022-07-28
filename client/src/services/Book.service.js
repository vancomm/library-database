import { availableCopyRoute, booksRoute } from '../data/routes';
import Service from './Service';

const BookService = new Service(booksRoute);

BookService.getAvailableCopy = async (id, token) => fetch(
  `${availableCopyRoute}/${id}`,
  {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${token}`,
    },
  },
);

export default BookService;
