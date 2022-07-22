import Page from '../components/Page';
import { ModelProvider } from '../contexts/ModelContext';
import { ServiceProvider } from '../contexts/ServiceContext';
import CopyModel from '../models/Copy.model';
import CopyService from '../services/Copy.service';

export default function CopyPage() {
  return (
    <ModelProvider model={CopyModel}>
      <ServiceProvider service={CopyService}>
        <Page />
      </ServiceProvider>
    </ModelProvider>
  );
}
