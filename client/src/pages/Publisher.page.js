import RecordPage from '../components/RecordPage';
import { ModelProvider } from '../contexts/ModelContext';
import { ServiceProvider } from '../contexts/ServiceContext';
import PublisherModel from '../models/Publisher.model';
import PublisherService from '../services/Publisher.service';

export default function PublisherPage() {
  return (
    <ModelProvider model={PublisherModel}>
      <ServiceProvider service={PublisherService}>
        <RecordPage />
      </ServiceProvider>
    </ModelProvider>
  );
}
