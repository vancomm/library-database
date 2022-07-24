import RecordPage from '../components/RecordPage';
import { ModelProvider } from '../contexts/ModelContext';
import { ServiceProvider } from '../contexts/ServiceContext';
import CopyModel from '../models/Copy.model';
import CopyService from '../services/Copy.service';

export default function CopyPage() {
  return (
    <ModelProvider model={CopyModel}>
      <ServiceProvider service={CopyService}>
        <RecordPage />
      </ServiceProvider>
    </ModelProvider>
  );
}
