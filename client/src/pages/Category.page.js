import Page from '../components/Page';
import CategoryModel from '../models/Category.model';
import CategoryService from '../services/Category.service';

export default function CategoryPage() {
  return (
    <Page
      service={CategoryService}
      model={CategoryModel}
    />
  );
}
