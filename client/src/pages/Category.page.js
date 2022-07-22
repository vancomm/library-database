import Page from '../components/Page';
import { ModelProvider } from '../contexts/ModelContext';
import { ServiceProvider } from '../contexts/ServiceContext';
import CategoryModel from '../models/Category.model';
import CategoryService from '../services/Category.service';

export default function CategoryPage() {
  return (
    <ModelProvider model={CategoryModel}>
      <ServiceProvider service={CategoryService}>
        <Page />
      </ServiceProvider>
    </ModelProvider>
  );
}
