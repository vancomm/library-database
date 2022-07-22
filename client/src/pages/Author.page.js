import Page from '../components/Page';
import { ModelProvider } from '../contexts/ModelContext';
import { ServiceProvider } from '../contexts/ServiceContext';
import AuthorModel from '../models/Author.model';
import AuthorService from '../services/Author.service';

export default function AuthorPage() {
  return (
    <ModelProvider model={AuthorModel}>
      <ServiceProvider service={AuthorService}>
        <Page />
      </ServiceProvider>
    </ModelProvider>
  );
}
