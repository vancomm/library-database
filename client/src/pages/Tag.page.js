import RecordPage from '../components/RecordPage';
import { ModelProvider } from '../contexts/ModelContext';
import { ServiceProvider } from '../contexts/ServiceContext';
import TagModel from '../models/Tag.model';
import TagService from '../services/Tag.service';

export default function TagPage() {
  return (
    <ModelProvider model={TagModel}>
      <ServiceProvider service={TagService}>
        <RecordPage />
      </ServiceProvider>
    </ModelProvider>
  );
}
