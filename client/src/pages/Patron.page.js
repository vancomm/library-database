import Page from '../components/Page';
import { ModelProvider } from '../contexts/ModelContext';
import { ServiceProvider } from '../contexts/ServiceContext';
import PatronModel from '../models/Patron.model';
import PatronService from '../services/Patron.service';

export default function PatronPage() {
  return (
    <ModelProvider model={PatronModel}>
      <ServiceProvider service={PatronService}>
        <Page />
      </ServiceProvider>
    </ModelProvider>
  );
}
