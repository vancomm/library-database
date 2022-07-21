import Page from '../components/Page';
import BookModel from '../models/Book.model';
import BookService from '../services/Book.service';

export default function BookPage() {
  return (
    <Page
      service={BookService}
      model={BookModel}
    />
  );
}
