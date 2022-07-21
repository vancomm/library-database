import Page from '../components/Page';
import PublisherModel from '../models/Publisher.model';
import PublisherService from '../services/Publisher.service';

export default function PublisherPage() {
  return (
    <Page
      service={PublisherService}
      model={PublisherModel}
    />
  );
}
