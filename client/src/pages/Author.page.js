import Page from '../components/Page';
import AuthorModel from '../models/Author.model';
import AuthorService from '../services/Author.service';

export default function AuthorPage() {
  return (
    <Page
      service={AuthorService}
      model={AuthorModel}
    />
  );
}
