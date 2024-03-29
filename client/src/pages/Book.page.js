import RecordPage from '../components/RecordPage';
import { ModelProvider } from '../contexts/ModelContext';
import { ServiceProvider } from '../contexts/ServiceContext';
import BookModel from '../models/Book.model';
import BookService from '../services/Book.service';

export default function BookPage() {
  return (
    <ModelProvider model={BookModel}>
      <ServiceProvider service={BookService}>
        <RecordPage />
      </ServiceProvider>
    </ModelProvider>
  );
}
