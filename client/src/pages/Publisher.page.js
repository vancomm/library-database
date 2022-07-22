import Page from '../components/Page';
import { ModelProvider } from '../contexts/ModelContext';
import { ServiceProvider } from '../contexts/ServiceContext';
import PublisherModel from '../models/Publisher.model';
import PublisherService from '../services/Publisher.service';

export default function PublisherPage() {
  return (
    <ModelProvider model={PublisherModel}>
      <ServiceProvider service={PublisherService}>
        <Page />
      </ServiceProvider>
    </ModelProvider>
  );
}
