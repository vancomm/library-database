import Page from '../components/Page';
import PatronModel from '../models/Patron.model';
import PatronService from '../services/Patron.service';

export default function PatronPage() {
  return (
    <Page
      service={PatronService}
      model={PatronModel}
    />
  );
}
