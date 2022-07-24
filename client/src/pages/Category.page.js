import RecordPage from '../components/RecordPage';
import { ModelProvider } from '../contexts/ModelContext';
import { ServiceProvider } from '../contexts/ServiceContext';
import CategoryModel from '../models/Category.model';
import CategoryService from '../services/Category.service';

export default function CategoryPage() {
  return (
    <ModelProvider model={CategoryModel}>
      <ServiceProvider service={CategoryService}>
        <RecordPage />
      </ServiceProvider>
    </ModelProvider>
  );
}
